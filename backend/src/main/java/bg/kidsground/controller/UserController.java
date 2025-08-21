package bg.kidsground.controller;

import bg.kidsground.config.JWTUtil;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.PasswordResetDto;
import bg.kidsground.domain.dto.RegisterDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.UserService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(path = AppRestEndpoints.V1.Users.REGISTER)
    public ResponseEntity<UserDto> registerUser(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(userService.save(registerDto));
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

    @PostMapping(path = AppRestEndpoints.V1.Users.REQUEST_PASSWORD_RESET)
    public ResponseEntity<Void> requestPasswordReset(@RequestBody Map<String, String> body) {
        userService.requestPasswordReset(body.get("email"));
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = AppRestEndpoints.V1.Users.RESET_PASSWORD)
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        userService.resetPassword(passwordResetDto.getToken(), passwordResetDto.getPassword());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/health")
    public ResponseEntity<Void> healthCheck() {
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @ExceptionHandler(EntityExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String alreadyExistsHandler(final EntityExistsException ex) {
        return ex.getMessage();
    }
}