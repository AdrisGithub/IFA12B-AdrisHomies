package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesPersistException;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesReadException;
import de.b3.bubatz_service.rest.exceptions.RequestExceedsDepositException;
import jakarta.persistence.EntityNotFoundException;
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
    public static final String INVALID_ARTICLE_ID = "Es existiert kein Artikel mit dieser ID";

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

    @ExceptionHandler(value = {EntityNotFoundException.class})
    public ResponseEntity<Error> entityNotFoundException(EntityNotFoundException ex) {

        final Error error = createError(ex.getMessage());

        log.error("{}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }

    @ExceptionHandler(value = {RequestExceedsDepositException.class})
    public ResponseEntity<Error> arithmeticException(ArithmeticException ex) {

        final Error error = createError(ex.getMessage());

        log.error("{}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
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
