package de.b3.bubatz_service.articles.control;

import de.b3.bubatz_service.articles.db.ArticleRepository;
import de.b3.bubatz_service.articles.util.ArticleMapper;
import de.b3.bubatz_service.generated.models.GetArticle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ArticleControl {

    private final ArticleRepository repository;

    public List<GetArticle> getAllArticles() {
        return this.repository.findAll()
                .stream()
                .map(ArticleMapper::map)
                .toList();
    }
}
