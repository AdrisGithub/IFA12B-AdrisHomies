package de.b3.bubatz_service.rest;

import de.b3.bubatz_service.articles.control.ArticleControl;
import de.b3.bubatz_service.generated.models.GetArticle;
import de.b3.bubatz_service.generated.models.PatchArticle;
import de.b3.bubatz_service.generated.models.PostArticle;
import de.b3.bubatz_service.generated.api.ArticleApi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ArticleController implements ArticleApi{

    private final ArticleControl control;

    @Override
    public ResponseEntity<GetArticle> createArticle(PostArticle postArticle) {
        return null;
    }

    @Override
    public ResponseEntity<GetArticle> reorderArticle(PatchArticle patchArticle) {
        return ResponseEntity.ok(this.control.patchArticle(patchArticle));
    }
}
