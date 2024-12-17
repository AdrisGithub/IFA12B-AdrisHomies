package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.Article;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.util.InfoMapper;

import java.math.BigDecimal;

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
}
