package de.b3.bubatz_service.articles.control;

import de.b3.bubatz_service.articles.db.ArticleItemRepository;
import de.b3.bubatz_service.articles.db.ArticleRepository;
import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.util.ArticleItemMapper;
import de.b3.bubatz_service.articles.util.ArticleMapper;
import de.b3.bubatz_service.generated.models.ArticleItem;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PatchArticle;
import de.b3.bubatz_service.generated.models.StoreArticle;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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
                .orElseThrow(() -> new EntityNotFoundException("TEST"));

        final ArticleItem item = ArticleItemMapper.map(itemEntity);

        item.setReihenNr(storeArticle.getReihenNr());
        item.setSpaltenNr(storeArticle.getSpaltenNr());

        final ArticleItemEntity entity = ArticleItemMapper.map(item);

        this.itemRepository.save(entity);

        return this.repository.findArticleByItemsContains(entity)
                .map(ArticleMapper::map)
                .orElseThrow(() -> new EntityNotFoundException(""));
    }

    public GetArticle patchArticle(PatchArticle patchArticle) {

        Article article = repository.findById(patchArticle.getId()).orElseThrow(
                () -> new EntityNotFoundException("Article with id " + patchArticle.getId() + " not found")
        );

        BigDecimal sellPrice = article.getItems().stream().findFirst().get().getSellPrice();
        ArticleItemEntity item = ArticleItemMapper.map(patchArticle, sellPrice);
        itemRepository.save(item);
        article.getItems().add(item);
        return ArticleMapper.map(repository.save(article));
    }
}
