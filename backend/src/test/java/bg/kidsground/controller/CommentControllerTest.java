package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();
    }

    @Test
    public void testSaveComment() throws Exception {

        when(commentService.saveComment(any(CommentDto.class), any(String.class))).thenReturn(1L);

        mockMvc.perform(post(AppRestEndpoints.V1.Comments.ADD)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"text\":\"Sample Comment\",\"rating\":5,\"username\":\"Sample Username\",\"createdAt\":\"2024-06-27T14:00:00.000Z\"}")
                        .header("Authorization", "Bearer <Test Token>"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

    @Test
    public void testGetCommentsByUserId() throws Exception {
        CommentDto commentDto = CommentDto.builder()
                .text("Sample Comment")
                .rating(3.5)
                .username("Sample Username")
                .createdAt(new Date())
                .build();
        List<CommentDto> comments = List.of(commentDto);

        when(commentService.getByUserId(1L)).thenReturn(comments);

        mockMvc.perform(get(AppRestEndpoints.V1.Comments.COMMENTS_ROOT)
                        .param("userId", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].text").value("Sample Comment"))
                .andExpect(jsonPath("$[0].rating").value(3.5))
                .andExpect(jsonPath("$[0].username").value("Sample Username"));
    }

    @Test
    public void testGetComment() throws Exception {
        CommentDto commentDto = CommentDto.builder()
                .text("Sample Comment")
                .rating(3.5)
                .username("Sample Username")
                .createdAt(new Date())
                .build();

        when(commentService.getById(1L)).thenReturn(commentDto);

        mockMvc.perform(get(AppRestEndpoints.V1.Comments.BY_ID, 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text").value("Sample Comment"))
                .andExpect(jsonPath("$.rating").value(3.5))
                .andExpect(jsonPath("$.username").value("Sample Username"));
    }

    @Test
    public void testDeleteComment() throws Exception {
        mockMvc.perform(delete(AppRestEndpoints.V1.Comments.BY_ID, 1L))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteCommentNotFound() throws Exception {
        doThrow(new RuntimeException()).when(commentService).deleteById(anyLong());

        mockMvc.perform(delete(AppRestEndpoints.V1.Comments.BY_ID, 1L))
                .andExpect(status().isNotFound());
    }
}
