package de.b3.bubatz_service.articles.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ARTICLE_ITEMS")
@Data
public class ArticleItem {

    @Id
    @GeneratedValue
    private Integer articleId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "articleId", referencedColumnName = "spotId")
    private DepositorySpot spot;

    @ManyToOne
    @JoinColumn(name = "articleId", nullable = false,insertable = false, updatable = false)
    private Article article;
}
