package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesPersistException;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesReadException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
@Slf4j
public class ExceptionHandlerAdvice {

    public static final String INVALID_READ_ADD_VALUES_ERROR = "Beim Einlesen der Entität ist ein Fehler entstanden";
    public static final String INVALID_WRITE_ADD_VALUES_ERROR = "Beim Persistieren der Entität ist ein Fehler entstanden";

    @ExceptionHandler(value = {InvalidAdditionalValuesPersistException.class})
    public ResponseEntity<Error> resourceNotFoundException(InvalidAdditionalValuesPersistException ex) {

        final Error error = createError(INVALID_WRITE_ADD_VALUES_ERROR);

        log.error("{}", INVALID_WRITE_ADD_VALUES_ERROR);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }

    @ExceptionHandler(value = {InvalidAdditionalValuesReadException.class})
    public ResponseEntity<Error> resourceNotFoundException(InvalidAdditionalValuesReadException ex) {

        final Error error = createError(INVALID_READ_ADD_VALUES_ERROR);

        log.error("{}", INVALID_READ_ADD_VALUES_ERROR);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }

    private Error createError(String message) {
        final Error error = new Error();

        error.setTimestamp(LocalDateTime.now());
        error.setMessage("Invalide Entität");
        error.setDetail(message);

        return error;
    }
}
