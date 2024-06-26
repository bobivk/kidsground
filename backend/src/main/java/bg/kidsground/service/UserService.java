package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.response.LoginMessage;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

  User findByUsername(String username);

  User save(LoginDto loginDto);

  LoginMessage loginUser(LoginDto loginDto);

  UserDetails loadUserDetails(String username);
}
