package bg.kidsground.controller;

import bg.kidsground.config.JWTUtil;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.RegisterDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.UserService;
import jakarta.persistence.EntityExistsException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"}, allowCredentials = "true")
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
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        try {
            UserDto userDto = userService.login(loginDto);
            String token = jwtUtil.generateToken(userDto.getUsername(), userDto.getRole().getValue());

            Cookie jwtCookie = new Cookie("jwt", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(3 * 24 * 60 * 60); // 3 days
            response.addCookie(jwtCookie);

            // Don't send the token in the body — it's in the httpOnly cookie
            return ResponseEntity.ok(new UserDto(userDto.getUsername(), userDto.getEmail(), userDto.getRole()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping(path = AppRestEndpoints.V1.Users.ME)
    public ResponseEntity<UserDto> me(HttpServletRequest request) {
        if (request.getCookies() == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        String token = Arrays.stream(request.getCookies())
                .filter(c -> "jwt".equals(c.getName()))
                .map(jakarta.servlet.http.Cookie::getValue)
                .findFirst().orElse(null);
        if (token == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        try {
            String username = jwtUtil.validateTokenAndRetrieveSubject(token);
            bg.kidsground.domain.User user = userService.findByUsername(username);
            return ResponseEntity.ok(new UserDto(user.getUsername(), user.getEmail(), user.getRole()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping(path = AppRestEndpoints.V1.Users.LOGOUT)
    public ResponseEntity<Void> logoutUser(HttpServletResponse response) {
        Cookie jwtCookie = new Cookie("jwt", "");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(true);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0);
        response.addCookie(jwtCookie);
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
