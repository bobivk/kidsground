package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.response.LoginMessage;

public interface UserService {

  User findByUsername(String username);

  User save(UserDto userDto);

  LoginMessage loginUser(LoginDto loginDto);


}
