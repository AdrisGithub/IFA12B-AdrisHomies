package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.models.Error;
import de.b3.bubatz_service.services.exceptions.InvalidAdditionalValuesException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
@Slf4j
public class ExceptionHandlerAdvice {

    public static final String INVALID_READ_ADD_VALUES_ERROR = "Beim Einlesen der Entität mit der Id %s ist ein Fehler entstanden";
    public static final String INVALID_WRITE_ADD_VALUES_ERROR = "Beim Schreiben der Entität ist ein Fehler entstanden";

    @ExceptionHandler(value = {InvalidAdditionalValuesException.class})
    public ResponseEntity<Error> resourceNotFoundException(InvalidAdditionalValuesException ex) {
        String message;

        if (null != ex.getId()){
            message = String.format(INVALID_READ_ADD_VALUES_ERROR, ex.getId());
        }else {
            message = INVALID_WRITE_ADD_VALUES_ERROR;
        }


        final Error error = createError(message);

        log.error("{}", message);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error);
    }

    private Error createError(String message){
        final Error error = new Error();

        error.setTimestamp(LocalDateTime.now());
        error.setMessage("Invalide Entität");
        error.setDetail(message);

        return error;
    }
}
