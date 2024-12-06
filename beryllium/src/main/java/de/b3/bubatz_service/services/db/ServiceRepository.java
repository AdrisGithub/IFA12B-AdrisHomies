package de.b3.bubatz_service.services.db;

import de.b3.bubatz_service.services.db.entity.Service;
import org.springframework.data.repository.ListCrudRepository;

public interface ServiceRepository extends ListCrudRepository<Service, Integer> {
}
