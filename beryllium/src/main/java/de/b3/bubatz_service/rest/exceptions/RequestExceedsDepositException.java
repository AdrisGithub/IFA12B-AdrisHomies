package de.b3.bubatz_service.rest.exceptions;

public class RequestExceedsDepositException extends RuntimeException {
    public RequestExceedsDepositException(String message) {
        super(message);
    }
}
