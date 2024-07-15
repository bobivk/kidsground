package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "playgroundId", source = "playground.id")
    CommentDto toDto(Comment comment);

    Comment toEntity(CommentDto commentDto);
}
