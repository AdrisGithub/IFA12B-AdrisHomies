package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.articles.db.entity.ArticleItemEntity;
import de.b3.bubatz_service.articles.db.entity.DepositorySpot;
import de.b3.bubatz_service.generated.models.ArticleItem;

import java.util.List;
import java.util.Set;

public class ArticleItemMapper {

    public static List<ArticleItem> map(Set<ArticleItemEntity> entities) {
        return entities.stream()
                .map(ArticleItemMapper::map)
                .toList();
    }

    public static ArticleItem map(ArticleItemEntity entity) {
        final ArticleItem item = new ArticleItem();

        item.setAmount(entity.getAmount().intValue());
        item.setId(entity.getArticleItemId());
        item.setBuyPrice(entity.getBuyPrice().floatValue());
        item.setSellPrice(entity.getSellPrice().floatValue());

        final DepositorySpot spot = entity.getSpot();

        if (spot == null)
            // Item in Transit
            return item;

        item.setSpaltenNr(spot.getColumnNr().intValue());
        item.setReihenNr(spot.getRowNr().intValue());

        return item;

    }
}