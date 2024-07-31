package bg.kidsground;

import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Comment;
import bg.kidsground.domain.Coordinates;
import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.repository.CommentRepository;
import bg.kidsground.repository.PlaygroundRepository;
import bg.kidsground.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootApplication
public class KidsgroundApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidsgroundApplication.class, args);
    }
    @Bean
    CommandLineRunner runner(PlaygroundRepository playgroundRepository, UserRepository userRepository, CommentRepository commentRepository) {
        return args -> {
            playgroundRepository.deleteAll();
            commentRepository.deleteAll();
            userRepository.deleteAll();
        };
    }
}
