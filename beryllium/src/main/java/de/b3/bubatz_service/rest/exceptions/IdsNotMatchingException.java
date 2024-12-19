package de.b3.bubatz_service.rest.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class IdsNotMatchingException extends RuntimeException {
    private final Integer first;
    private final Integer second;
}
