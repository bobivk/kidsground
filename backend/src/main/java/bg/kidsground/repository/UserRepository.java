package bg.kidsground.repository;

import bg.kidsground.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByUsername(String username);
  Optional<User> findUserByEmailAndPassword(String email, String password);
  Optional<User> findByEmail(String email);

  boolean existsByEmail(String email);
  User save(User user);
}
