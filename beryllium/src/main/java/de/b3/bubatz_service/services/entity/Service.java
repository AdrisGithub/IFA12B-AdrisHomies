package de.b3.bubatz_service.services.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(name = "SERVICES")
@Data
public class Service {

    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    @Column(precision = 4, scale = 2)
    private BigDecimal price;

    private String description;

    private boolean available;

    private String additionalValues;

    public BigDecimal getPrice() {
        return price.setScale(2, RoundingMode.CEILING);
    }
}
