package bg.kidsground.domain.dto;

import bg.kidsground.domain.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {

    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email;

    private UserRole role;

}
