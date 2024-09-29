package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class CommentMapper {

    @Autowired
    private UserService userService;

    @Mapping(target = "playgroundId", source = "playground.id")
    @Mapping(target = "username", source = "createdByUser.username")
    public abstract CommentDto toDto(Comment comment);

    @Mapping(target = "createdByUser", source = "username", qualifiedByName = "commentDtoToUser")
    @Mapping(target = "playground.id", source = "playgroundId")
    public abstract Comment toEntity(CommentDto commentDto);

    @Named("commentDtoToUser")
    public User commentDtoToUser(String username) {
        try {
            return userService.findByUsername(username);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }
}
