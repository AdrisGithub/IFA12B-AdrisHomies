package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import de.b3.bubatz_service.services.exceptions.InvalidAdditionalValuesException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    public static final String INVALID_ADD_VALUES_ERROR = "Bei der Speicherung der Entität mit der Id %s ist ein Fehler entstanden";

    @ExceptionHandler(value = {InvalidAdditionalValuesException.class})
    public ResponseEntity<Error> resourceNotFoundException(InvalidAdditionalValuesException ex) {
        final Error error = new Error();

        error.setTimestamp(LocalDateTime.now());
        error.setMessage("Invalide Entität");
        error.setDetail(String.format(INVALID_ADD_VALUES_ERROR, ex.getId()));

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }
}