package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController("/error")
@RequiredArgsConstructor
@CrossOrigin(
        originPatterns = {"*"},
        maxAge = 1209600L,
        allowedHeaders = {"origin","content-type","accept","authorization"}
)
public class ErrorController {

    @GetMapping
    public ResponseEntity<Error> error(){
        final Error error = new Error();

        error.setTimestamp(LocalDateTime.now());
        error.setMessage("Wrong Path");
        error.setDetail("Hier gibt es keinen Endpoint :) \n Sicher das du nicht zu /article, /services oder /actuator willst?");

        return ResponseEntity.badRequest().body(error);
    }
}
