package bg.kidsground.service;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.domain.mapper.CommentMapper;
import bg.kidsground.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;
    private final PlaygroundService playgroundService;
    private final UserService userService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,
                              CommentMapper commentMapper,
                              PlaygroundService playgroundService,
                              UserService userService) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
        this.playgroundService = playgroundService;
        this.userService = userService;
    }

    @Override
    public Long saveComment(CommentDto commentDto, String authHeader) {
        Comment comment = commentMapper.toEntity(commentDto);
        comment.setPlayground(playgroundService.findById(commentDto.getPlaygroundId()));
        comment.setCreatedByUser(userService.findUserByToken(authHeader));
        comment = commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public CommentDto getById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Comment not found"));
        return commentMapper.toDto(comment);
    }

    @Override
    public List<CommentDto> getByAuthToken(String authToken) {
        User user = this.userService.findUserByToken(authToken);
        List<Comment> comments = commentRepository.findByCreatedByUser(user);
        return comments.stream()
                .map(commentMapper::toDto)
                .toList();
    }

    @Override
    public List<CommentDto> getByPlaygroundId(Long id) {
        return this.commentRepository.findByPlaygroundId(id)
                .stream().map(commentMapper::toDto)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        commentRepository.deleteById(id);
    }
}
