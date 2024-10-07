package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AgeGroup {

    ZERO_TO_THREE("ZERO_TO_THREE"),
    THREE_TO_SIX("THREE_TO_SIX"),
    THREE_TO_TWELVE("THREE_TO_TWELVE"),
    SIX_TO_TWELVE("SIX_TO_TWELVE");

    public final String value;

    AgeGroup(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
