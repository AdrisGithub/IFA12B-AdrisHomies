package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "ARTICLE_ITEMS")
@Data
public class ArticleItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer articleItemId;

    private Integer rowNr;

    private Integer columnNr;

    private Integer amount;

    @Override
    public String toString() {
        return "ArticleItemEntity{" +
                "articleItemId=" + articleItemId +
                ", rowNr=" + rowNr +
                ", columnNr=" + columnNr +
                ", amount=" + amount +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ArticleItemEntity that)) return false;
        return Objects.equals(articleItemId, that.articleItemId) && Objects.equals(rowNr, that.rowNr) && Objects.equals(columnNr, that.columnNr) && Objects.equals(amount, that.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(articleItemId, rowNr, columnNr, amount);
    }
}
