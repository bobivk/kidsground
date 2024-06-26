package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.S3Service;
import bg.kidsground.service.UserService;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class PlaygroundMapper {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserService userService;

    @Mapping(target = "creator", source = "userId", qualifiedByName = "dtoToUser")
    public abstract Playground toEntity(PlaygroundDto playgroundDto);

    @Mapping(target = "userId", source = "creator.id")
    @Mapping(target = "imageLinks", source = "imageS3Keys", qualifiedByName = "s3KeysToPresignedUrls")
    public abstract PlaygroundDto toDto(Playground playground);


    @Named("s3KeysToPresignedUrls")
    protected List<String> s3KeysToPresignedUrls(List<String> keys) {
        return keys.stream()
                .map(key -> s3Service.getImageUrl(key))
                .toList();
    }

    @Named("dtoToUser")
    protected User dtoToUser(Long userId) {
        return userService.findUserById(userId);
    }

    @AfterMapping
    protected void setDefaultValues(@MappingTarget Playground playground) {
        playground.setNew(true);
    }

}
