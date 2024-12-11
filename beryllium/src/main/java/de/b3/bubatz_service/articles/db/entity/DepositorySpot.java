package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

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
        if(rowNr == null) return null;
        return rowNr.setScale(0, RoundingMode.CEILING);
    }

    public BigDecimal getColumnNr() {
        if(columnNr == null) return null;
        return columnNr.setScale(0, RoundingMode.CEILING);
    }

    @Override
    public String toString() {
        return "DepositorySpot{" +
                "columnNr=" + columnNr +
                ", rowNr=" + rowNr +
                ", spotId=" + spotId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof DepositorySpot that)) return false;
        return Objects.equals(spotId, that.spotId) &&
                Objects.equals(rowNr, that.rowNr) &&
                Objects.equals(columnNr, that.columnNr);
    }

    @Override
    public int hashCode() {
        return Objects.hash(spotId, rowNr, columnNr);
    }
}
