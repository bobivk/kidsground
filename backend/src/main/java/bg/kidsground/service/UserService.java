package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.RegisterDto;
import bg.kidsground.domain.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

  UserDto save(RegisterDto loginDto);

  UserDto login(LoginDto loginDto);

  UserDetails loadUserDetails(String username);

  User findByUsername(String username);

  User findUserByToken(String authHeader);
}
