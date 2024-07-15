package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Comment;
import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.service.S3Service;
import bg.kidsground.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring", uses = CommentMapper.class)
public abstract class PlaygroundMapper {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserService userService;

    @Mapping(target = "createdByUser", source = "username", qualifiedByName = "dtoToUser")
    @Mapping(target = "comments", ignore = true)  // To avoid cyclic mapping issues
    public abstract Playground toEntity(PlaygroundDto playgroundDto);

    @Mapping(target = "imageLinks", source = "imageS3Keys", qualifiedByName = "s3KeysToPresignedUrls")
    @Mapping(target = "comments", source = "comments")
    @Mapping(target = "username", source = "createdByUser.username")
    public abstract PlaygroundDto toDto(Playground playground);


    @Named("s3KeysToPresignedUrls")
    protected List<String> s3KeysToPresignedUrls(List<String> keys) {
        return keys.stream()
                .map(key -> s3Service.getImageUrl(key))
                .toList();
    }

    @Named("dtoToUser")
    protected User dtoToUser(String username) {
        try {
            return userService.findByUsername(username);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    @AfterMapping
    protected void calculateRating(@MappingTarget PlaygroundDto playgroundDto, Playground playground) {
        playground.setNew(true);
        if (playground.getComments() != null && !playground.getComments().isEmpty()) {
            double averageRating = playground.getComments().stream()
                    .mapToDouble(Comment::getRating)
                    .average()
                    .orElse(0.0);
            playgroundDto.setRating(averageRating);
        } else {
            playgroundDto.setRating(0.0);
        }
    }

}
