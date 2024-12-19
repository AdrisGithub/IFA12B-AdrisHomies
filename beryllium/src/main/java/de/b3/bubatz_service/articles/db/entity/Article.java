package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ARTICLES")
@Data
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String additionalValues;

    @Column(precision = 5, scale = 2)
    private BigDecimal buyPrice;

    @Column(precision = 5, scale = 2)
    private BigDecimal sellPrice;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "articleId")
    private Set<ArticleItemEntity> items;

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", buyPrice=" + buyPrice +
                ", sellPrice=" + sellPrice +
                ", additionalValues='" + additionalValues + '\'' +
                ", items=" + items + '}';
    }

    public BigDecimal getBuyPrice() {
        if (buyPrice == null) return null;
        return buyPrice.setScale(2, RoundingMode.CEILING);
    }

    public BigDecimal getSellPrice() {
        if (sellPrice == null) return null;
        return sellPrice.setScale(2, RoundingMode.CEILING);
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Article article)) return false;
        return Objects.equals(id, article.id) &&
                Objects.equals(name, article.name) &&
                Objects.equals(description, article.description) &&
                Objects.equals(buyPrice, article.buyPrice) &&
                Objects.equals(sellPrice, article.sellPrice) &&
                Objects.equals(additionalValues, article.additionalValues) &&
                Objects.equals(items, article.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, sellPrice, buyPrice, additionalValues, items);
    }
}
