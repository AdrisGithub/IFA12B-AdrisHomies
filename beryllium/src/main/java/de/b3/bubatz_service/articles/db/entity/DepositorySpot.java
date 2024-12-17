package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "DEPOSITORY_SPOTS")
@Data
public class DepositorySpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer spotId;

    private Integer rowNr;

    private Integer columnNr;

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
