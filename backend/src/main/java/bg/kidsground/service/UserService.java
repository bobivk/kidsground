package bg.kidsground.service;

import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

  UserDto save(LoginDto loginDto);

  UserDto login(LoginDto loginDto);

  UserDetails loadUserDetails(String username);
}
