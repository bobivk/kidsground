package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import bg.kidsground.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    super();
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public User findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public User save(UserDto userDto) {
    User user = new User(userDto.getId(),
                         userDto.getUsername(),
                         passwordEncoder.encode(userDto.getPassword()),
                         userDto.getEmail());

    return userRepository.save(user);
  }

  @Override
  public LoginMessage loginUser(LoginDto loginDto) {
    return new LoginMessage("");
  }
}
