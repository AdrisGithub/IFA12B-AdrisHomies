package de.b3.bubatz_service.articles.db.entity;

import jakarta.persistence.*;
import lombok.Data;

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

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "articleId")
    private Set<ArticleItemEntity> items;

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", additionalValues='" + additionalValues + '\'' +
                ", items=" + items + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Article article)) return false;
        return Objects.equals(id, article.id) &&
                Objects.equals(name, article.name) &&
                Objects.equals(description, article.description) &&
                Objects.equals(additionalValues, article.additionalValues) &&
                Objects.equals(items, article.items);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, additionalValues, items);
    }
}
