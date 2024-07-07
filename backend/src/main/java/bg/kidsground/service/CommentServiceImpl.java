package bg.kidsground.service;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.domain.mapper.CommentMapper;
import bg.kidsground.repository.CommentRepository;
import bg.kidsground.repository.PlaygroundRepository;
import bg.kidsground.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    private final PlaygroundRepository playgroundRepository;

    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, CommentMapper commentMapper, PlaygroundRepository playgroundRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.playgroundRepository = playgroundRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Long saveComment(CommentDto commentDto) {
        Comment comment = commentMapper.toEntity(commentDto);
        comment.setPlayground(playgroundRepository.findById(commentDto.getPlaygroundId())
                .orElseThrow(() -> new NoSuchElementException("Playground not found")));
        comment.setCreator(userRepository.findById(commentDto.getCreatorId())
                .orElseThrow(() -> new NoSuchElementException("User not found")));
        comment = commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public CommentDto getById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
        return commentMapper.toDto(comment);
    }

    @Override
    public List<CommentDto> getByUserId(Long userId) {
        List<Comment> comments = commentRepository.findByCreatorId(userId);
        return comments.stream()
                .map(commentMapper::toDto)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }
}
