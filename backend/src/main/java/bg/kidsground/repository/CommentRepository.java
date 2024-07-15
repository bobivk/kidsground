package bg.kidsground.repository;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Derived query method
    List<Comment> findByCreatedByUser(User user);
    List<Comment> findByPlaygroundId(Long playgroundId);
    void deleteByPlaygroundId(Long playgroundId);
}
