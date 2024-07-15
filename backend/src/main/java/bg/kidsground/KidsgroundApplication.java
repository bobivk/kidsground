package bg.kidsground;

import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Coordinates;
import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.repository.PlaygroundRepository;
import bg.kidsground.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.NoSuchElementException;

@SpringBootApplication
public class KidsgroundApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidsgroundApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(PlaygroundRepository playgroundRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            playgroundRepository.deleteAll();
            User user = new User("testUser", "randomPass", "user@test.com", UserRole.USER);
            User admin = new User("admin", passwordEncoder.encode("admin"), "admin@test.com", UserRole.ADMIN);
            userRepository.save(user);
            userRepository.save(admin);
            Playground playground = new Playground();
            playground.setName("Ploshtadka");
            playground.setCoordinates(Coordinates.builder().latitude(42.141080).longitude(24.752345).build());
            playground.setAgeGroup(AgeGroup.THREE_TO_SIX);
            playground.setCreatedByUser(user);
            playground.setNew(false);
            playgroundRepository.save(playground);
            Playground saved = playgroundRepository.findById(playground.getId()).orElseThrow(
                    NoSuchElementException::new);
            System.out.println(saved.getName());
            System.out.println(saved.getId());
        };
    }
}
