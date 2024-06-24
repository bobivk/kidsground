package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.response.LoginMessage;
import bg.kidsground.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "https://kidsground.bg")
@RequestMapping("/api/v1/user")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping(path = AppRestEndpoints.V1.Users.REGISTER)
  public User registerUser(@RequestBody UserDto userDto) {
    return userService.save(userDto);
  }

  @PostMapping(path = AppRestEndpoints.V1.Users.LOGIN)
  public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
    LoginMessage loginMessage = userService.loginUser(loginDto);
    return ResponseEntity.ok(loginMessage);
  }
}
