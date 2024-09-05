package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.dto.PlaygroundDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlaygroundService {

    Long savePlayground(final PlaygroundDto playground, final String authToken);
    PlaygroundDto getById(final Long id);
    Playground findById(final Long id);
    List<PlaygroundDto> findAllApproved();
    Integer getApprovedCount();
    List<PlaygroundDto> findAllToApprove();
    PlaygroundDto updatePlayground(Long id, PlaygroundDto playground);
    PlaygroundDto uploadImages(List<MultipartFile> file, Long id);
    PlaygroundDto approve(Long id, Boolean isApproved);
    List<PlaygroundDto> getByAuthToken(String authToken);
    void deleteById(Long id);
}
