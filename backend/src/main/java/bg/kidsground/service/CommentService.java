package bg.kidsground.service;

import bg.kidsground.domain.dto.CommentDto;

import java.util.List;

public interface CommentService {

    Long saveComment(CommentDto commentDto, String authToken);
    CommentDto getById(Long id);
    List<CommentDto> getByAuthToken(String username);
    void deleteById(Long id);
}
