package de.b3.bubatz_service.services.control;

import de.b3.bubatz_service.generated.models.GetService;
import de.b3.bubatz_service.generated.models.PostService;
import de.b3.bubatz_service.services.db.ServiceRepository;
import de.b3.bubatz_service.services.db.entity.Service;
import de.b3.bubatz_service.services.util.ServiceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ServiceControl {

    private final ServiceRepository repository;


    public List<GetService> getAllServices() {
        return this.repository.findAll()
                .stream()
                .map(ServiceMapper::map)
                .toList();
    }

    public GetService createService(PostService postService) {
        final Service service = ServiceMapper.map(postService);

        final Service saved = this.repository.save(service);

        return ServiceMapper.map(saved);
    }
}
