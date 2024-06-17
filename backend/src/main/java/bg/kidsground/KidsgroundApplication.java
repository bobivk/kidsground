package bg.kidsground;

import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Coordinates;
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
            playgroundRepository.deleteAll();

            Playground playground = new Playground();
            playground.setName("Ploshtadka");
            playground.setCoordinates(Coordinates.builder().latitude(42.141080).longitude(24.752345).build());
            playground.setAgeGroup(AgeGroup.THREE_TO_SIX);
            playgroundRepository.save(playground);
            Playground saved = playgroundRepository.findById(playground.getId()).orElseThrow(
                    NoSuchElementException::new);
            System.out.println(saved.getName());
            System.out.println(saved.getId());
        };
    }
}
