package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum FloorType {
    ASPHALT("asphalt"),
    GRASS("Тревна настилка"),
    RUBBER("rubber"),
    MULCH("mulch"),
    DIRT("dirt");

    public final String value;

    FloorType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
