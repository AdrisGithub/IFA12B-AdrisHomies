package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

@Entity
@Table(name = "ARTICLE_ITEMS")
@Data
public class ArticleItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer articleItemId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spotId", referencedColumnName = "spotId")
    private DepositorySpot spot;

    @Column(precision = 5, scale = 2)
    private BigDecimal buyPrice;

    @Column(precision = 5, scale = 2)
    private BigDecimal sellPrice;

    private Integer amount;

    public BigDecimal getBuyPrice() {
        if (buyPrice == null) return null;
        return buyPrice.setScale(2, RoundingMode.CEILING);
    }

    public BigDecimal getSellPrice() {
        if (sellPrice == null) return null;
        return sellPrice.setScale(2, RoundingMode.CEILING);
    }

    @Override
    public String toString() {
        return "ArticleItem{" +
                "articleItemId=" + articleItemId +
                ", spot=" + spot +
                ", buyPrice=" + buyPrice +
                ", sellPrice=" + sellPrice +
                ", amount=" + amount +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ArticleItemEntity that)) return false;
        return Objects.equals(articleItemId, that.articleItemId) &&
                Objects.equals(spot, that.spot) &&
                Objects.equals(buyPrice, that.buyPrice) &&
                Objects.equals(sellPrice, that.sellPrice) &&
                Objects.equals(amount, that.amount);
    }

    @Override
    public int hashCode() {
        return Objects.hash(articleItemId, spot, buyPrice, sellPrice, amount);
    }
}
