package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AgeGroup {

    ZERO_TO_THREE("zero_to_three"),
    THREE_TO_SIX("three_to_six"),
    THREE_TO_TWELVE("three_to_twelve"),
    SIX_TO_TWELVE("six_to_twelve");

    public final String value;

    AgeGroup(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
