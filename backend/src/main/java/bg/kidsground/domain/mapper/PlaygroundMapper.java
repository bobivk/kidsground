package bg.kidsground.domain.mapper;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.S3Service;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class PlaygroundMapper {

    @Autowired
    private S3Service s3Service;

    @Mapping(target = "creator", source = "creator", qualifiedByName = "dtoToUser")
    public abstract Playground toEntity(PlaygroundDto playgroundDto);

    @Mapping(target = "creator", source = "creator", qualifiedByName = "userToDto")
    @Mapping(target = "imageLinks", source = "imageS3Keys", qualifiedByName = "s3KeysToPresignedUrls")
    public abstract PlaygroundDto toDto(Playground playground);


    @Named("s3KeysToPresignedUrls")
    protected List<String> s3KeysToPresignedUrls(List<String> keys) {
        return keys.stream()
                .map(key -> s3Service.getImageUrl(key))
                .toList();
    }

    @Named("dtoToUser")
    protected User dtoToUser(UserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        return user;
    }

    @Named("userToDto")
    protected UserDto userToDto(User user) {
        return new UserDto(user.getUsername(), user.getEmail(), user.getRole());
    }

}
