package bg.kidsground.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDto {

    private String username;
    private String password;
    private String email;

}

