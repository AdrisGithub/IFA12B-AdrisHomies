package de.b3.bubatz_service.articles.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "ARTICLES")
@Data
public class Article {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;

    private String description;

    private String additionalValues;

    @OneToMany()
    @JoinColumn(name = "articleId")
    private Set<ArticleItem> items;
}
