package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserRole {

    ADMIN("admin"),
    USER("user");

    public final String value;
    UserRole(final String value){
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
