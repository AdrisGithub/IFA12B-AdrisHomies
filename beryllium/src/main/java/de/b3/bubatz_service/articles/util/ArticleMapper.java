package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PostArticle;
import de.b3.bubatz_service.util.InfoMapper;

import java.util.Set;


public class ArticleMapper {

    public static GetArticle map(Article article) {
        final GetArticle getArticle = new GetArticle();

        getArticle.setName(article.getName());
        getArticle.setId(article.getId());
        getArticle.setDescription(article.getDescription());
        getArticle.setInfos(InfoMapper.map(article.getAdditionalValues()));
        getArticle.setItems(ArticleItemMapper.map(article.getItems()));

        return getArticle;
    }

    public static Article map(PostArticle postArticle, ArticleItemEntity itemEntity) {
        Article article = new Article();

        article.setName(postArticle.getName());
        article.setDescription(postArticle.getDescription());
        article.setAdditionalValues(InfoMapper.map(postArticle.getInfos()));
        article.setItems(Set.of(itemEntity));

        return article;
    }
}
