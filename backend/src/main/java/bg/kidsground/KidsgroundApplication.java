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
import java.util.List;

@SpringBootApplication
public class KidsgroundApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidsgroundApplication.class, args);
    }
    @Bean
    CommandLineRunner runner(PlaygroundRepository playgroundRepository, UserRepository userRepository, CommentRepository commentRepository, PasswordEncoder passwordEncoder) {
        return args -> {
//            playgroundRepository.deleteAll();
//            commentRepository.deleteAll();
//            userRepository.deleteAll();
            User admin = User.builder().username("admin")
                    .password(passwordEncoder.encode("admin"))
                    .email("admin@gmail.com")
                    .role(UserRole.ADMIN)
                    .build();
            userRepository.save(admin);
            playgroundRepository.save(Playground.builder()
                    .ageGroup(AgeGroup.THREE_TO_TWELVE)
                    .createdAt(new Date())
                    .coordinates(Coordinates.builder()
                            .longitude(42)
                            .latitude(38)
                            .build())
                    .createdByUser(admin)
                    .floorType(List.of("rubber"))
                    .description("Яка площадка")
                    .rating(4.0)
                    .isNew(true)
                    .shadeType("fake")
                    .hasFence(true)
                    .build());
        };
    }
}
