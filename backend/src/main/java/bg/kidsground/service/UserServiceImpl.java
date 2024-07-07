package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

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

        return new org.springframework.security.core.userdetails.User
                (
                        username,
                        user.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getValue()))
                );
    }

    @Override
    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public UserDto save(LoginDto loginDto) {
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
