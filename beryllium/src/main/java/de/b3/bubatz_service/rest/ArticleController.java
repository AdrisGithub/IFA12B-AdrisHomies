package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.generated.api.ArticleApi;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PatchArticle;
import de.b3.bubatz_service.generated.models.PostArticle;
import org.springframework.http.ResponseEntity;

public class ArticleController implements ArticleApi {

    @Override
    public ResponseEntity<GetArticle> createArticle(PostArticle postArticle) {
        return null;
    }

    @Override
    public ResponseEntity<GetArticle> reorderArticle(PatchArticle patchArticle) {
        return null;
    }
}
