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

    @JsonProperty("role")
    private UserRole role;

    @JsonProperty("token")
    private String token;

    public UserDto(String username, String email, UserRole role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }

}
