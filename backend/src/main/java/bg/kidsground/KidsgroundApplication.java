package bg.kidsground;

import bg.kidsground.domain.Playground;
import bg.kidsground.repository.PlaygroundRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.NoSuchElementException;

@SpringBootApplication
public class KidsgroundApplication {
    public static void main(String[] args) {
        SpringApplication.run(KidsgroundApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(PlaygroundRepository playgroundRepository) {
        return args -> {

            Playground playground = new Playground();
            playground.setName("John");

            playgroundRepository.save(playground);
            Playground saved = playgroundRepository.findById(playground.getId()).orElseThrow(
                    NoSuchElementException::new);
            System.out.println(saved.getName());
            System.out.println(saved.getId());
        };
    }
}