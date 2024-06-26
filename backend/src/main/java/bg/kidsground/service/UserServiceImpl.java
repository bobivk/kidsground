package bg.kidsground.service;

import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.repository.UserRepository;
import bg.kidsground.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

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
  public UserDetails loadUserDetails(String username) throws UsernameNotFoundException
  {
    User user = userRepository.findByUsername(username);
    if (user == null)
    {
      throw new UsernameNotFoundException("Could not find user with username");
    }
    return new org.springframework.security.core.userdetails.User
            (
                    username,
                    user.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
            );
  }

  @Override
  public User save(LoginDto loginDto) {
    User user = new User(loginDto.getUsername(),
                         passwordEncoder.encode(loginDto.getPassword()),
                         loginDto.getEmail());

    return userRepository.save(user);
  }

  @Override
  public LoginMessage loginUser(LoginDto loginDto) {
    return new LoginMessage("");
  }
}
