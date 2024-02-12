package bg.kidsground.repository;

import bg.kidsground.domain.Playground;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PlaygroundRepository extends CrudRepository<Playground, Long> {

    Playground save(Playground playground);
    Optional<Playground> findById(Long id);

}
