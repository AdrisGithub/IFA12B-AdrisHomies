package de.b3.bubatz_service.articles.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Table(name = "ARTICLE_ITEMS")
@Data
public class ArticleItem {

    @Id
    @GeneratedValue
    private Integer articleItemId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "spotId", referencedColumnName = "spotId")
    private DepositorySpot spot;

    @ManyToOne
    @JoinColumn(name = "articleId", nullable = false,insertable = false, updatable = false)
    private Article article;

    @Column(precision = 4, scale = 2)
    private BigDecimal buyPrice;

    @Column(precision = 4, scale = 2)
    private BigDecimal sellPrice;

    @Column(precision = 3)
    private BigDecimal amount;

    public BigDecimal getBuyPrice() {
        return buyPrice.setScale(2, RoundingMode.CEILING);
    }

    public BigDecimal getSellPrice() {
        return sellPrice.setScale(2, RoundingMode.CEILING);
    }

    public BigDecimal getAmount() {
        return amount.setScale(0, RoundingMode.CEILING);
    }
}
