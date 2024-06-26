package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.dto.PlaygroundDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlaygroundService {

    void savePlayground(final PlaygroundDto playground);

    PlaygroundDto getById(final Long id);


    List<PlaygroundDto> getAll();

    Integer getCount();

    PlaygroundDto updatePlayground(Long id, PlaygroundDto playground);
    PlaygroundDto uploadImage(MultipartFile file, Long id);

    void deleteById(Long id);
}
