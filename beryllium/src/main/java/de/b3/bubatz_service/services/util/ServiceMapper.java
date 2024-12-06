package de.b3.bubatz_service.services.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import de.b3.bubatz_service.generated.models.GetService;
import de.b3.bubatz_service.services.db.entity.Service;
import de.b3.bubatz_service.services.exceptions.InvalidAdditionalValuesException;

import java.util.HashMap;
import java.util.Map;

public class ServiceMapper {

    private final static ObjectMapper mapper = new ObjectMapper();
    private static final MapType mapType;

    static {
        TypeFactory typeFactory = mapper.getTypeFactory();
        mapType = typeFactory.constructMapType(HashMap.class, String.class, String.class);
    }

    public static GetService map(Service service) {

        final GetService getService = new GetService();

        getService.setAvailable(service.isAvailable());
        getService.setDescription(service.getDescription());
        getService.setId(service.getId());
        getService.setName(service.getName());
        getService.setPrice(service.getPrice().floatValue());

        final Map<String, String> addInfos;

        try {
            addInfos = mapper.readValue(service.getAdditionalValues(), mapType);
        } catch (JsonProcessingException e) {
            // should never fail
            throw new InvalidAdditionalValuesException(service.getId());
        }

        getService.setInfos(addInfos);

        return getService;
    }
}
