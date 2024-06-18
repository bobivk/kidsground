package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Environment {

    BOULEVARD("boulevard"),
    PARK("park"),
    APARTMENTS("apartments"),
    OTHER("other");

    public final String value;
    Environment(final String value){
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
