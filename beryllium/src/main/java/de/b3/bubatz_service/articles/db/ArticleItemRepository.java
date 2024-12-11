package de.b3.bubatz_service.articles.db;

import de.b3.bubatz_service.articles.db.entity.ArticleItem;
import org.springframework.data.repository.ListCrudRepository;

public interface ArticleItemRepository extends ListCrudRepository<ArticleItem, Integer> {
}
