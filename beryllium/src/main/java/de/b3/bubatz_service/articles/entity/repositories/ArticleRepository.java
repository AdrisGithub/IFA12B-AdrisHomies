package de.b3.bubatz_service.articles.entity.repositories;

import de.b3.bubatz_service.articles.entity.Article;
import org.springframework.data.repository.ListCrudRepository;

public interface ArticleRepository extends ListCrudRepository<Article, Integer> {
}
