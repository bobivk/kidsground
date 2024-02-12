package bg.kidsground.repository;

import bg.kidsground.domain.Playground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PlaygroundRepository extends JpaRepository<Playground, Long> {

    Playground save(Playground playground);
    Optional<Playground> findById(Long id);

}
