package de.b3.bubatz_service.articles.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(name = "DEPOSITORY_SPOTS")
@Data
public class DepositorySpot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer spotId;

    @Column(precision = 2)
    private BigDecimal rowNr;

    @Column(precision = 2)
    private BigDecimal columnNr;

    @OneToOne(mappedBy = "spot")
    private ArticleItem articleItem;

    public BigDecimal getRowNr() {
        return rowNr.setScale(0, RoundingMode.CEILING);
    }

    public BigDecimal getColumnNr() {
        return columnNr.setScale(0, RoundingMode.CEILING);
    }
}
