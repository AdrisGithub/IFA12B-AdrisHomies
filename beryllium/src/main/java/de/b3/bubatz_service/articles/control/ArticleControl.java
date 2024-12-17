package de.b3.bubatz_service.articles.control;

import de.b3.bubatz_service.articles.db.ArticleItemRepository;
import de.b3.bubatz_service.articles.db.ArticleRepository;
import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.util.ArticleItemMapper;
import de.b3.bubatz_service.articles.util.ArticleMapper;
import de.b3.bubatz_service.articles.util.PickupSpotMapper;
import de.b3.bubatz_service.generated.models.*;
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

    public List<GetArticle> getAllArticles() {
        return this.repository.findAll()
                .stream()
                .map(ArticleMapper::map)
                .toList();
    }

    public GetArticle storeArticle(StoreArticle storeArticle) {
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

    public GetArticle patchArticle(PatchArticle patchArticle) {
        final Article article = findArticleById(patchArticle.getId());

        ArticleItemEntity item = ArticleItemMapper.map(patchArticle);
        itemRepository.save(item);
        article.getItems().add(item);

        return ArticleMapper.map(repository.save(article));
    }

    public GetArticleWithSellPrice sellArticle(Integer id, Integer amount) {
        final GetArticle getArticle = ArticleMapper.map(findArticleById(id));

        final List<PickupSpot> spots = new ArrayList<>();
        final List<ArticleItem> items = new ArrayList<>();


        for (ArticleItem item : getArticle.getItems()) {
            if (item.getAmount() >= amount) {
                amount -= item.getAmount();
                spots.add(PickupSpotMapper.map(item));
            } else {
                items.add(item);
            }
        }

        double totalPrice = spots.size() * getArticle.getSellPrice();

        getArticle.setItems(items);
        final Article article = ArticleMapper.map(getArticle);
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
}
