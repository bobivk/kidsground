package bg.kidsground.repository;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlaygroundRepository extends JpaRepository<Playground, Long> {

    Playground save(Playground playground);
    Optional<Playground> findById(Long id);

    List<Playground> findByIsNewFalse();

    List<Playground> findByIsNewTrue();

    List<Playground> findByCreatedByUser(User user);
    long countByIsNewFalse();
}
