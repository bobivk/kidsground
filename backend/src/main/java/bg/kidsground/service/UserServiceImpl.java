package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    public static final String INCORRECT_CREDENTIALS_MESSAGE = "Incorrect credentials";
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        super();
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserDetails(String username) throws UsernameNotFoundException
    {
        User user = userRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException("Could not find user with username"));

        return org.springframework.security.core.userdetails.User.builder()
                .roles(user.getRole().getValue())
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public User findUserByToken(String authHeader) {
        final String token = authHeader.substring(7);
        DecodedJWT jwt = JWT.decode(token);
        return userRepository.findByUsername(jwt.getClaim("username").asString())
                .orElseThrow(() -> new UsernameNotFoundException("Could not find user with username"));

    }

    @Override
    public UserDto save(LoginDto loginDto) {
        if (userRepository.existsByEmail(loginDto.getEmail())) {
            throw new EntityExistsException("A user with that email already exists.");
        }
        User user = new User(loginDto.getUsername(),
                            passwordEncoder.encode(loginDto.getPassword()),
                            loginDto.getEmail(),
                            UserRole.USER);

        userRepository.save(user);
        return new UserDto(user.getUsername(), user.getEmail(), user.getRole());
    }

    @Override
    public UserDto login(LoginDto loginDto) throws UsernameNotFoundException {
        User user;
        if (loginDto.getUsername() == null) {
            user = userRepository.findByEmail(loginDto.getEmail())
                    .orElseThrow(() -> new BadCredentialsException(INCORRECT_CREDENTIALS_MESSAGE));
        } else {
            user = userRepository.findByUsername(loginDto.getUsername())
                    .orElseThrow(() -> new BadCredentialsException(INCORRECT_CREDENTIALS_MESSAGE));
        }
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException(INCORRECT_CREDENTIALS_MESSAGE);
        }
        return new UserDto(user.getUsername(), user.getEmail(), user.getRole());
    }
}
