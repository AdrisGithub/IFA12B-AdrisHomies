package de.b3.bubatz_service.articles.db;

import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface ArticleItemRepository extends ListCrudRepository<ArticleItemEntity, Integer> {
    boolean findDepositorySpotByColumnNrAndRowNr(Integer spaltenNr, Integer reihenNr);
}
