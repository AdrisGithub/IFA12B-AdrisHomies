package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.articles.control.ArticleControl;
import de.b3.bubatz_service.generated.api.DepositoryApi;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.GetArticleWithSellPrice;
import de.b3.bubatz_service.generated.models.StoreArticle;
import de.b3.bubatz_service.generated.models.SellArticle;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(
        origins = "*",
        maxAge = 1209600L,
        allowedHeaders = {"origin","content-type","accept","authorization"}
)
@RestController
public class DepositoryController implements DepositoryApi {

    private final ArticleControl articleControl;

    @Override
    public ResponseEntity<List<GetArticle>> getArticles() {
        return ResponseEntity.ok(this.articleControl.getAllArticles());
    }

    @Override
    public ResponseEntity<GetArticleWithSellPrice> sellArticle(Integer id, SellArticle sellArticle) {
        return ResponseEntity.ok(this.articleControl.sellArticle(id, sellArticle.getAmount()));
    }

    @Override
    public ResponseEntity<GetArticle> storeArticle(StoreArticle storeArticle) {
        return ResponseEntity.ok(this.articleControl.storeArticle(storeArticle));
    }
}