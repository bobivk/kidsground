package bg.kidsground.service;

import bg.kidsground.domain.dto.PlaygroundDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlaygroundService {

    Long savePlayground(final PlaygroundDto playground);
    PlaygroundDto getById(final Long id);
    List<PlaygroundDto> findAllApproved();
    Integer getCount();
    List<PlaygroundDto> findAllToApprove();
    PlaygroundDto updatePlayground(Long id, PlaygroundDto playground);
    PlaygroundDto uploadImages(List<MultipartFile> file, Long id);
    PlaygroundDto approve(Long id, Boolean isApproved);
    void deleteById(Long id);
}
