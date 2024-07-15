package bg.kidsground.service;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.domain.mapper.CommentMapper;
import bg.kidsground.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private CommentMapper commentMapper;

    @Mock
    private PlaygroundService playgroundService;

    @Mock
    private UserService userService;

    @InjectMocks
    private CommentServiceImpl commentService;

    private CommentDto commentDto;
    private Comment comment;
    private Playground playground;
    private User user;

    @BeforeEach
    void setUp() {
        commentDto = CommentDto.builder()
                .text("Test Comment")
                .rating(3.5)
                .username("Sample Username")
                .playgroundId(1L)
                .build();

        user = User.builder()
                .username("Sample Username")
                .email("test@example.com")
                .build();

        playground = Playground.builder()
                .id(1L)
                .name("Test Playground")
                .build();

        comment = Comment.builder()
                .id(1L)
                .text("Test Comment")
                .rating(3.5)
                .createdByUser(user)
                .playground(playground)
                .build();

    }

    @Test
    void saveComment() {
        when(commentMapper.toEntity(any(CommentDto.class))).thenReturn(comment);
        when(playgroundService.findById(anyLong())).thenReturn(playground);
        when(userService.findUserByToken("Bearer <Test token>")).thenReturn(user);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        Long commentId = commentService.saveComment(commentDto, "Bearer <Test token>");

        assertNotNull(commentId);
        assertEquals(comment.getId(), commentId);

        verify(commentMapper).toEntity(commentDto);
        verify(playgroundService).findById(commentDto.getPlaygroundId());
        verify(userService).findUserByToken("Bearer <Test token>");
        verify(commentRepository).save(comment);
    }

    @Test
    void getById() {
        when(commentRepository.findById(anyLong())).thenReturn(Optional.of(comment));
        when(commentMapper.toDto(any(Comment.class))).thenReturn(commentDto);

        CommentDto result = commentService.getById(1L);

        assertNotNull(result);
        assertEquals(commentDto.getText(), result.getText());

        verify(commentRepository).findById(1L);
        verify(commentMapper).toDto(comment);
    }

    @Test
    void getById_NotFound() {
        when(commentRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> commentService.getById(1L));
    }

    @Test
    void getByUserId() {
        when(commentRepository.findByCreatedByUser(any(User.class))).thenReturn(List.of(comment));
        when(commentMapper.toDto(any(Comment.class))).thenReturn(commentDto);
        when(userService.findUserByToken("Bearer <Test Token>")).thenReturn(user);

        List<CommentDto> result = commentService.getByAuthToken("Bearer <Test Token>");

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(commentDto.getText(), result.get(0).getText());

        verify(commentRepository).findByCreatedByUser(user);
        verify(commentMapper).toDto(comment);
    }

    @Test
    void deleteById() {
        doNothing().when(commentRepository).deleteById(anyLong());

        commentService.deleteById(1L);

        verify(commentRepository).deleteById(1L);
    }
}
