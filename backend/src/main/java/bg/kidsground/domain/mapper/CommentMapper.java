package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "playgroundId", source = "playground.id")
    @Mapping(source = "creator.id", target = "creatorId")
    CommentDto toDto(Comment comment);

    @Mapping(source = "creatorId", target = "creator.id")
    @Mapping(target = "playground.id", source = "playgroundId")
    Comment toEntity(CommentDto commentDto);
}
