package de.b3.bubatz_service.services.exceptions;

import lombok.Getter;

@Getter
public class InvalidAdditionalValuesException extends RuntimeException {

    private final Integer id;

    public InvalidAdditionalValuesException(Integer id) {
        this.id = id;
    }
}
