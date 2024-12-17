package de.b3.bubatz_service.rest.exceptions;

public class NegativeSalesPriceException extends RuntimeException {

    private static final String NEGATIVE_SALES_PRICE = "Sales-price can never be negative";

    public NegativeSalesPriceException() {
        super(NEGATIVE_SALES_PRICE);
    }
}
