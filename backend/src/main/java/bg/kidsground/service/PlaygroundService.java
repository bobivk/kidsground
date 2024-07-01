package bg.kidsground.service;

import bg.kidsground.domain.dto.PlaygroundDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlaygroundService {

    Long savePlayground(final PlaygroundDto playground);

    PlaygroundDto getById(final Long id);


    List<PlaygroundDto> getAll();

    Integer getCount();

    List<PlaygroundDto> toApprove();

    PlaygroundDto updatePlayground(Long id, PlaygroundDto playground);
    PlaygroundDto uploadImages(List<MultipartFile> file, Long id);

    PlaygroundDto approve(Long id, Boolean isApproved);

    void deleteById(Long id);
}
