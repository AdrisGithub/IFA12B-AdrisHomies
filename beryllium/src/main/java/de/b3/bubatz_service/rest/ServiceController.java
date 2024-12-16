package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.api.ServiceApi;
import de.b3.bubatz_service.generated.models.GetService;
import de.b3.bubatz_service.generated.models.PatchService;
import de.b3.bubatz_service.generated.models.PostService;
import de.b3.bubatz_service.services.control.ServiceControl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ServiceController implements ServiceApi {

    private final ServiceControl control;

    @Override
    public ResponseEntity<Void> bookService(Integer id, PatchService patchService) {
        return null;
    }

    @Override
    public ResponseEntity<GetService> createService(PostService postService) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.control.createService(postService));
    }

    @Override
    public ResponseEntity<List<GetService>> getServices() {
        return ResponseEntity.ok(this.control.getAllServices());
    }
}
