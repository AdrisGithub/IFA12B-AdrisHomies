package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "ARTICLE_ITEMS")
@Data
public class ArticleItemEntity {

    @Id
    @GeneratedValue
    private Integer articleItemId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spotId", referencedColumnName = "spotId")
    private DepositorySpot spot;

    private Integer amount;

    @Override
    public String toString() {
        return "ArticleItem{" +
                "articleItemId=" + articleItemId +
                ", spot=" + spot +
                ", amount=" + amount +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ArticleItemEntity that)) return false;
        return Objects.equals(articleItemId, that.articleItemId) &&
                Objects.equals(spot, that.spot) &&
                Objects.equals(amount, that.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(articleItemId, spot, amount);
    }
}
