package de.b3.bubatz_service.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesPersistException;
import de.b3.bubatz_service.rest.exceptions.InvalidAdditionalValuesReadException;

import java.util.HashMap;
import java.util.Map;

public class InfoMapper {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final MapType mapType;

    static {
        TypeFactory typeFactory = mapper.getTypeFactory();
        mapType = typeFactory.constructMapType(HashMap.class, String.class, String.class);
    }

    public static Map<String, String> map(String raw) {
        try {
            return mapper.readValue(raw, mapType);
        } catch (JsonProcessingException e) {
            // should never fail
            throw new InvalidAdditionalValuesReadException();
        }
    }

    public static String map(Map<String, String> addInfos) {
        try {
            return mapper.writeValueAsString(addInfos);
        } catch (JsonProcessingException e) {
            // tbf don't know if this can fail, hopefully not
            throw new InvalidAdditionalValuesPersistException();
        }
    }
}
