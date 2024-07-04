package bg.kidsground.controller;

import bg.kidsground.config.JWTUtil;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(path = AppRestEndpoints.V1.Users.REGISTER)
    public ResponseEntity<UserDto> registerUser(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(userService.save(loginDto));
    }

    @PostMapping(path = AppRestEndpoints.V1.Users.LOGIN)
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto) {
        try {
            UserDto userDto = userService.login(loginDto);
            String token = jwtUtil.generateToken(userDto.getUsername(), userDto.getRole().getValue());
            userDto.setToken(token);
            return ResponseEntity.ok(userDto);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
