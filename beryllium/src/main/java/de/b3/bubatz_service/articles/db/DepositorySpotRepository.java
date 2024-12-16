package de.b3.bubatz_service.articles.db;


import de.b3.bubatz_service.articles.db.entity.DepositorySpot;
import org.springframework.data.repository.ListCrudRepository;

public interface DepositorySpotRepository extends ListCrudRepository<DepositorySpot, Integer> {
}
