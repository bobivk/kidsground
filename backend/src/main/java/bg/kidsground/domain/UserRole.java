package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {

    ADMIN("ADMIN"),
    USER("USER");

    public final String value;
    UserRole(final String value){
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
