package de.b3.bubatz_service.articles.db;

import de.b3.bubatz_service.articles.db.entity.Article;
import org.springframework.data.repository.ListCrudRepository;

public interface ArticleRepository extends ListCrudRepository<Article, Integer> {



}
