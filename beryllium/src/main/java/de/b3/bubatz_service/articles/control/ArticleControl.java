package de.b3.bubatz_service.articles.control;

import de.b3.bubatz_service.articles.db.ArticleItemRepository;
import de.b3.bubatz_service.articles.db.ArticleRepository;
import de.b3.bubatz_service.articles.db.DepositorySpotRepository;
import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.util.ArticleItemMapper;
import de.b3.bubatz_service.articles.util.ArticleMapper;
import de.b3.bubatz_service.generated.models.ArticleItem;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PatchArticle;
import de.b3.bubatz_service.generated.models.PostArticle;
import de.b3.bubatz_service.generated.models.StoreArticle;
import de.b3.bubatz_service.articles.util.PickupSpotMapper;
import de.b3.bubatz_service.generated.models.GetArticleWithSellPrice;
import de.b3.bubatz_service.generated.models.PickupSpot;
import de.b3.bubatz_service.rest.exceptions.DepositorySpotAlreadyOccupiedException;
import de.b3.bubatz_service.rest.exceptions.RequestExceedsDepositException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ArticleControl {

    private final ArticleRepository repository;
    private final ArticleItemRepository itemRepository;
    private final DepositorySpotRepository spotRepository;

    public List<GetArticle> getAllArticles() {
        return this.repository.findAll()
                .stream()
                .map(ArticleMapper::map)
                .toList();
    }

    public GetArticle storeArticle(StoreArticle storeArticle) {
        if (depositSpotAlreadyOccupied(storeArticle.getReihenNr(), storeArticle.getSpaltenNr()))
            throw new DepositorySpotAlreadyOccupiedException(storeArticle.getReihenNr(),storeArticle.getSpaltenNr());

        final ArticleItemEntity itemEntity = this.itemRepository.findById(storeArticle.getId())
                .orElseThrow(() -> new EntityNotFoundException("ArticleItem with id " + storeArticle.getId() + " not found"));

        final ArticleItem item = ArticleItemMapper.map(itemEntity);

        item.setReihenNr(storeArticle.getReihenNr());
        item.setSpaltenNr(storeArticle.getSpaltenNr());

        final ArticleItemEntity entity = ArticleItemMapper.map(item);

        this.itemRepository.save(entity);

        return this.repository.findArticleByItemsContains(entity)
                .map(ArticleMapper::map)
                .get();
    }

    private boolean depositSpotAlreadyOccupied(Integer reihenNr, Integer spaltenNr) {
        return this.spotRepository.findDepositorySpotByColumnNrAndRowNr(spaltenNr,reihenNr) != null;
    }

    public GetArticle patchArticle(PatchArticle patchArticle) {
        final Article article = findArticleById(patchArticle.getId());

        ArticleItemEntity item = ArticleItemMapper.map(patchArticle);
        itemRepository.save(item);
        article.getItems().add(item);

        return ArticleMapper.map(repository.save(article));
    }

    public GetArticle createArticle(PostArticle postArticle) {
        ArticleItem item = ArticleItemMapper.map(postArticle);
        ArticleItemEntity itemEntity = this.itemRepository.save(ArticleItemMapper.map(item));

        Article article = ArticleMapper.map(postArticle, itemEntity);

        return ArticleMapper.map(repository.save(article));
    }

    public GetArticleWithSellPrice sellArticle(Integer id, Integer amount) {
        Article article = findArticleById(id);

        if (amount > totalAvailableItemAmount(id))
            throw new RequestExceedsDepositException("Amount exceeds total available item amount");

        final GetArticle getArticle = ArticleMapper.map(article);

        final List<PickupSpot> spots = new ArrayList<>();
        final List<ArticleItem> items = new ArrayList<>();

        double totalPrice = amount * getArticle.getSellPrice();

        for (ArticleItem item : getArticle.getItems()) {
            if (!isDeposited(item)){
                items.add(item);
                continue;
            }
            if (amount >= item.getAmount()) {
                amount -= item.getAmount();
                spots.add(PickupSpotMapper.map(item));
            } else if (amount != 0){
                item.setAmount(item.getAmount() - amount);
                items.add(item);

                spots.add(PickupSpotMapper.map(item, amount));

                amount = 0;
            }
        }

        getArticle.setItems(items);
        article = ArticleMapper.map(getArticle);

        final Article saved = this.repository.save(article);
        final GetArticle savedArticle = ArticleMapper.map(saved);

        final GetArticleWithSellPrice articleWithSellPrice = new GetArticleWithSellPrice();
        articleWithSellPrice.setArticle(savedArticle);
        articleWithSellPrice.setTotalPrice(totalPrice);
        articleWithSellPrice.setSpots(spots);

        return articleWithSellPrice;
    }


    private Article findArticleById(Integer id){
        return repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Article with id " + id + " not found")
        );
    }

    private int totalAvailableItemAmount(Integer Id) {
        return repository.totalAmountOfArticleItemsByItemId(Id);
    }

    private boolean isDeposited(ArticleItem item){
        return item.getReihenNr() != null && item.getSpaltenNr() != null;
    }
}
