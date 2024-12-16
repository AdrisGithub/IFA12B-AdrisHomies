package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.articles.control.ArticleControl;
import de.b3.bubatz_service.generated.api.DepositoryApi;
import de.b3.bubatz_service.generated.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RestController
public class DepositoryController implements DepositoryApi {

    private final ArticleControl articleControl;

    @Override
    public ResponseEntity<List<GetArticle>> getArticles() {
        return ResponseEntity.ok(this.articleControl.getAllArticles());
    }

    @Override
    public ResponseEntity<GetArticleWithSellPrice> sellArticle(Integer id, SellArticle sellArticle) {
        return null;
    }

    @Override
    public ResponseEntity<GetArticle> storeArticle(StoreArticle storeArticle) {
        return ResponseEntity.ok(this.articleControl.storeArticle(storeArticle));
    }
}