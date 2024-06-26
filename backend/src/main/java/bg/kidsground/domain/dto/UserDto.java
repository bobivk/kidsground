package bg.kidsground.domain.dto;

import bg.kidsground.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {

  private String username;
  private String email;
  private UserRole role;

}
