package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.db.entity.DepositorySpot;
import de.b3.bubatz_service.generated.models.ArticleItem;
import de.b3.bubatz_service.generated.models.PostArticle;
import de.b3.bubatz_service.generated.models.PatchArticle;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ArticleItemMapper {

    public static List<ArticleItem> map(Set<ArticleItemEntity> entities) {
        return entities.stream()
                .map(ArticleItemMapper::map)
                .toList();
    }

    public static Set<ArticleItemEntity> map(List<ArticleItem> items){
        return items.stream()
                .map(ArticleItemMapper::map)
                .collect(Collectors.toSet());
    }

    public static ArticleItem map(ArticleItemEntity entity) {
        final ArticleItem item = new ArticleItem();

        item.setAmount(entity.getAmount());
        item.setId(entity.getArticleItemId());

        final DepositorySpot spot = entity.getSpot();

        if (spot == null)
            // Item in Transit
            return item;

        item.setSpaltenNr(spot.getColumnNr());
        item.setReihenNr(spot.getRowNr());

        return item;
    }

    public static ArticleItemEntity map(PatchArticle patchArticle) {
        ArticleItemEntity entity = new ArticleItemEntity();

        entity.setAmount(patchArticle.getAmount());
        entity.setSpot(null);

        return entity;
    }

    public static ArticleItemEntity map(ArticleItem item){
        final ArticleItemEntity entity = new ArticleItemEntity();

        entity.setArticleItemId(item.getId());
        entity.setAmount(item.getAmount());

        final DepositorySpot spot = new DepositorySpot();
        spot.setColumnNr(item.getSpaltenNr());
        spot.setRowNr(item.getReihenNr());

        entity.setSpot(spot);

        return entity;
    }

    public static ArticleItem map(PostArticle postArticle) {
        final ArticleItem item = new ArticleItem();

        item.setAmount(postArticle.getAmount());

        return item;
    }
}