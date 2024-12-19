package de.b3.bubatz_service.articles.util;

import de.b3.bubatz_service.generated.models.ArticleItem;
import de.b3.bubatz_service.generated.models.PickupSpot;

public class PickupSpotMapper {

    public static PickupSpot map(ArticleItem item){
        final PickupSpot spot = new PickupSpot();

        spot.setAmount(item.getAmount());
        spot.setReihenNr(item.getReihenNr());
        spot.setSpaltenNr(item.getSpaltenNr());

        return spot;
    }

    public static PickupSpot map(ArticleItem item, Integer amount){
        final PickupSpot spot = PickupSpotMapper.map(item);

        spot.setAmount(amount);

        return spot;
    }
}
