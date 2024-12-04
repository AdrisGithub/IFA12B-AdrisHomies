package de.b3.bubatz_service.articles.entity.repositories;

import de.b3.bubatz_service.articles.entity.ArticleItem;
import org.springframework.data.repository.ListCrudRepository;

public interface ArticleItemRepository extends ListCrudRepository<ArticleItem, Integer> {
}
