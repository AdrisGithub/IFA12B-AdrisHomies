package de.b3.bubatz_service.services.util;

import de.b3.bubatz_service.generated.models.GetService;
import de.b3.bubatz_service.generated.models.PostService;
import de.b3.bubatz_service.services.db.entity.Service;
import de.b3.bubatz_service.util.InfoMapper;

import java.math.BigDecimal;

public class ServiceMapper {

    public static GetService map(Service service) {

        final GetService getService = new GetService();

        getService.setAvailable(service.isAvailable());
        getService.setDescription(service.getDescription());
        getService.setId(service.getId());
        getService.setName(service.getName());
        getService.setPrice(service.getPrice().floatValue());
        getService.setInfos(InfoMapper.map(service.getAdditionalValues()));

        return getService;
    }

    public static Service map(PostService postService) {
        final Service service = new Service();

        service.setAvailable(true);
        service.setName(postService.getName());
        service.setDescription(postService.getDescription());
        service.setPrice(BigDecimal.valueOf(postService.getPrice()));
        service.setAdditionalValues(InfoMapper.map(postService.getInfos()));

        return service;
    }
}
