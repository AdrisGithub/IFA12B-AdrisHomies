package de.b3.bubatz_service.rest.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class DepositorySpotAlreadyOccupiedException extends RuntimeException {
    private final Integer rowNr;
    private final Integer columnNr;
}
