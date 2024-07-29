package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.RegisterDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
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
import static org.mockito.ArgumentMatchers.anyString;
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
    public void findUserByUsername_UserFound() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        User foundUser = userService.findByUsername(user.getUsername());

        assertEquals(user.getUsername(), foundUser.getUsername());
    }

    @Test
    public void findUserByUsername_UserNotFound() {
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            userService.findByUsername(user.getUsername());
        });
    }

    @Test

    public void save_UserSaved() {
        RegisterDto registerDto = RegisterDto.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password")
                .build();

        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);

        UserDto userDto = userService.save(registerDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void save_alreadyExists() {
        RegisterDto registerDto = RegisterDto.builder()
                .username("testuser")
                .email("test@example.com")
                .password("password")
                .build();

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(EntityExistsException.class, () -> userService.save(registerDto));
    }

    @Test
    public void login_UserFound() {
        LoginDto loginDto = LoginDto.builder()
                .usernameOrEmail("testuser")
                .password("password")
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(true);

        UserDto userDto = userService.login(loginDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void login_UserFoundByEmail() {
        LoginDto loginDto = LoginDto.builder()
                .usernameOrEmail("test@example.com")
                .password("password")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(true);

        UserDto userDto = userService.login(loginDto);

        assertEquals("testuser", userDto.getUsername());
        assertEquals("test@example.com", userDto.getEmail());
        assertEquals(UserRole.USER, userDto.getRole());
    }

    @Test
    public void login_UserNotFound() {
        LoginDto loginDto = LoginDto.builder()
                .usernameOrEmail("testuser")
                .password("password")
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            userService.login(loginDto);
        });
    }

    @Test
    public void login_IncorrectPassword() {
        LoginDto loginDto = LoginDto.builder()
                .usernameOrEmail("testuser")
                .password("wrongpassword")
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(any(String.class), any(String.class))).thenReturn(false);

        assertThrows(BadCredentialsException.class, () -> {
            userService.login(loginDto);
        });
    }
}
