package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PostArticle;
import de.b3.bubatz_service.util.InfoMapper;

import java.math.BigDecimal;
import java.util.Set;


public class ArticleMapper {

    public static GetArticle map(Article article) {
        final GetArticle getArticle = new GetArticle();

        getArticle.setName(article.getName());
        getArticle.setId(article.getId());
        getArticle.setDescription(article.getDescription());
        getArticle.setInfos(InfoMapper.map(article.getAdditionalValues()));
        getArticle.setItems(ArticleItemMapper.map(article.getItems()));
        getArticle.setSellPrice(article.getSellPrice().floatValue());
        getArticle.setBuyPrice(article.getBuyPrice().floatValue());

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

    public static Article map(PostArticle postArticle, ArticleItemEntity itemEntity) {
        Article article = new Article();

        article.setName(postArticle.getName());
        article.setBuyPrice(BigDecimal.valueOf(postArticle.getBuyPrice()));
        article.setSellPrice(BigDecimal.valueOf(postArticle.getSellPrice()));
        article.setDescription(postArticle.getDescription());
        article.setAdditionalValues(InfoMapper.map(postArticle.getInfos()));
        article.setItems(Set.of(itemEntity));

        return article;
    }
}
