package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.util.InfoMapper;

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

    public static Article map(GetArticle getArticle){
        final Article article = new Article();

        article.setDescription(getArticle.getDescription());
        article.setName(getArticle.getName());
        article.setId(getArticle.getId());
        article.setItems(ArticleItemMapper.map(getArticle.getItems()));
        article.setAdditionalValues(InfoMapper.map(getArticle.getInfos()));

        return article;
    }
}
