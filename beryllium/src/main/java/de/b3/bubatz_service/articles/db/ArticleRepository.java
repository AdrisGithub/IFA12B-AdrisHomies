package de.b3.bubatz_service.articles.db;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;


public interface ArticleRepository extends ListCrudRepository<Article, Integer> {

    Optional<Article> findArticleByItemsContains(ArticleItemEntity items);
}
