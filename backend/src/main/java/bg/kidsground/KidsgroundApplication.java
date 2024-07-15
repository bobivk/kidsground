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
import java.util.NoSuchElementException;

@SpringBootApplication
public class KidsgroundApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidsgroundApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(PlaygroundRepository playgroundRepository,
                             UserRepository userRepository,
                             CommentRepository commentRepository,
                             PasswordEncoder passwordEncoder) {
        return args -> {
            playgroundRepository.deleteAll();
            User user = new User("user", passwordEncoder.encode("pass"), "user@test.com", UserRole.USER);
            User admin = new User("admin", passwordEncoder.encode("admin"), "admin@test.com", UserRole.ADMIN);
            userRepository.save(user);
            userRepository.save(admin);
            Playground playground = new Playground();
            playground.setName("The playground");
            playground.setCoordinates(Coordinates.builder().latitude(42.141080).longitude(24.752345).build());
            playground.setAgeGroup(AgeGroup.THREE_TO_SIX);
            playground.setCreatedByUser(user);
            playground.setNew(false);
            Comment comment = Comment.builder()
                    .createdAt(new Date())
                    .id(1L)
                    .text("This is an example comment attached to a playground")
                    .rating(3.5)
                    .createdByUser(user)
                    .playground(playground)
                    .build();
            commentRepository.save(comment);
            playgroundRepository.save(playground);
        };
    }
}
