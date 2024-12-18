package de.b3.bubatz_service.articles.db;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface ArticleRepository extends ListCrudRepository<Article, Integer> {

    Optional<Article> findArticleByItemsContains(ArticleItemEntity items);

    @Query(value = "SELECT SUM(i.amount) FROM ARTICLE_ITEMS i " +
            "JOIN ARTICLES a ON a.id=i.article_Id WHERE a.Id=:Id",
            nativeQuery = true)
    Integer totalAmountOfArticleItemsByItemId(@Param("Id")Integer Id);
}
