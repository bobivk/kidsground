package bg.kidsground.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PasswordResetDto {

    @JsonProperty("token")
    private String token;

    @JsonProperty("password")
    private String password;
}
