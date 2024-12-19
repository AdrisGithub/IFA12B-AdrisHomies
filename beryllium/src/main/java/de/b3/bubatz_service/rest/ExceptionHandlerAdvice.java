package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import de.b3.bubatz_service.rest.exceptions.*;
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
    public static final String DEPOSITORY_SPOT_ALREADY_OCCUPIED = "Der Lagerplatz mit der ReihenNr: %s und SpaltenNr: %s ist schon belegt";
    public static final String IDS_DO_NOT_MATCH = "Die IDs stimmen nicht überein: %s != %s";

    @ExceptionHandler(value = {InvalidAdditionalValuesPersistException.class})
    public ResponseEntity<Error> invalidAdditionalValuesPersist(InvalidAdditionalValuesPersistException ex) {

        final Error error = createError(INVALID_WRITE_ADD_VALUES_ERROR);

        log.error("{}", INVALID_WRITE_ADD_VALUES_ERROR);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }

    @ExceptionHandler(value = {DepositorySpotAlreadyOccupiedException.class})
    public ResponseEntity<Error> depositorySpotAlreadyOccupied(DepositorySpotAlreadyOccupiedException ex) {

        final Error error = createError(String.format(DEPOSITORY_SPOT_ALREADY_OCCUPIED, ex.getRowNr(), ex.getColumnNr()));

        log.error("{}", error.getDetail());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }

    @ExceptionHandler(value = {InvalidAdditionalValuesReadException.class})
    public ResponseEntity<Error> invalidAdditionalValuesRead(InvalidAdditionalValuesReadException ex) {

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
    public ResponseEntity<Error> requestExceedsDepositException(RequestExceedsDepositException ex) {

        final Error error = createError(ex.getMessage());

        log.error("{}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(error);
    }

    @ExceptionHandler(value = {IdsNotMatchingException.class})
    public ResponseEntity<Error> idsNotMatchingException(IdsNotMatchingException ex) {

        final Error error = createError(String.format(IDS_DO_NOT_MATCH, ex.getFirst(), ex.getSecond()));

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
