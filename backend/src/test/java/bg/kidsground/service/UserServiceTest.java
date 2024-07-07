package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        user = new User("testuser", "password", "test@example.com", UserRole.USER);
    }

    @Test
    public void loadUserDetails_UserFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        UserDetails userDetails = userService.loadUserDetails("testuser");

        assertEquals("testuser", userDetails.getUsername());
        assertEquals(user.getPassword(), userDetails.getPassword());
    }

    @Test
    public void loadUserDetails_UserNotFound() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserDetails("testuser");
        });
    }

    @Test
    public void findUserById_UserFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User foundUser = userService.findUserById(1L);

        assertEquals(user.getUsername(), foundUser.getUsername());
    }

    @Test
    public void findUserById_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            userService.findUserById(1L);
        });
    }

    @Test
    public void save_UserSaved() {
        LoginDto loginDto = new LoginDto("testuser", "password", "test@example.com");

        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserDto userDto = userService.save(loginDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void login_UserFound() {
        LoginDto loginDto = new LoginDto("testuser", "password", null);


        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(true);

        UserDto userDto = userService.login(loginDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void login_UserFoundByEmail() {
        LoginDto loginDto = new LoginDto(null, "password", "test@example.com");


        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(true);

        UserDto userDto = userService.login(loginDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void login_UserNotFound() {
        LoginDto loginDto = new LoginDto("testuser", "password", null);
        loginDto.setUsername("testuser");
        loginDto.setPassword("password");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            userService.login(loginDto);
        });
    }

    @Test
    public void login_IncorrectPassword() {
        LoginDto loginDto = new LoginDto("testuser", "wrongpassword", null);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(false);

        assertThrows(BadCredentialsException.class, () -> {
            userService.login(loginDto);
        });
    }
}
