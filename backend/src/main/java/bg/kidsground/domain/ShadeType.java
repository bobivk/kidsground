package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ShadeType {

    TREES("trees"),
    FAKE("fake"),
    NONE("none");

    public final String value;

    ShadeType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
