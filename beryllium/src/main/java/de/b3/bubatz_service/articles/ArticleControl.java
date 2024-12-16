package de.b3.bubatz_service.articles;

import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.ArticleRepository;
import de.b3.bubatz_service.articles.util.ArticleItemMapper;
import de.b3.bubatz_service.articles.util.ArticleMapper;
import de.b3.bubatz_service.generated.models.PatchArticle;
import de.b3.bubatz_service.generated.models.GetArticle;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class ArticleControl {

    private final ArticleRepository articleRepository;

    public GetArticle patchArticle(PatchArticle patchArticle) {

        Article article = articleRepository.findById(patchArticle.getId()).orElseThrow(
                () -> new EntityNotFoundException("Article with id " + patchArticle.getId() + " not found")
        );

        BigDecimal sellPrice = article.getItems().stream().findFirst().get().getSellPrice();
        ArticleItemEntity item = ArticleItemMapper.map(patchArticle, sellPrice);
        article.getItems().add(item);
        return ArticleMapper.map(articleRepository.save(article));
    }
}
