package bg.kidsground.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDto {

    @JsonProperty("password")
    private String password;

    @JsonProperty("usernameOrEmail")
    private String usernameOrEmail;

}

