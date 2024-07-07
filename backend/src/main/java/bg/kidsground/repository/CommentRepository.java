package bg.kidsground.repository;

import bg.kidsground.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCreatorId(Long creatorId);
    List<Comment> findByPlaygroundId(Long playgroundId);
    void deleteByPlaygroundId(Long playgroundId);
}
