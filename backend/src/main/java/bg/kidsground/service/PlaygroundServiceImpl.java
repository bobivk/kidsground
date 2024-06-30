package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.domain.mapper.PlaygroundMapper;
import bg.kidsground.repository.PlaygroundRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Slf4j
public class PlaygroundServiceImpl implements PlaygroundService {

    @Autowired
    private S3Service s3Service;
    @Autowired
    private PlaygroundRepository playgroundRepository;
    @Autowired
    private PlaygroundMapper playgroundMapper;

    @Override
    public Long savePlayground(final PlaygroundDto playgroundDto) {
        Playground playground = this.playgroundMapper.toEntity(playgroundDto);
        playground.setNew(true);
        return this.playgroundRepository.save(playground).getId();
    }

    @Override
    public PlaygroundDto getById(final Long id) {
        final Playground playground = this.playgroundRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Playground with ID " + id + " not found"));

        return this.playgroundMapper.toDto(playground);
    }

    @Override
    public List<PlaygroundDto> getAll() {
        return this.playgroundRepository.findAll()
                .stream()
                .map(playgroundMapper::toDto)
                .toList();
    }

    @Override
    public Integer getCount() {
        return Math.toIntExact(this.playgroundRepository.count());
    }

    @Override
    public PlaygroundDto updatePlayground(final Long id, final PlaygroundDto playgroundDto) {
        Playground existingPlayground = playgroundRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Playground with ID " + id + " not found"));
        Playground updatedPlayground = playgroundMapper.toEntity(playgroundDto);

        updatedPlayground.setId(existingPlayground.getId());
        updatedPlayground.setImageS3Keys(existingPlayground.getImageS3Keys());

        Playground savedPlayground = playgroundRepository.save(updatedPlayground);

        return playgroundMapper.toDto(savedPlayground);
    }

    @Override
    public PlaygroundDto uploadImages(List<MultipartFile> files, Long id) {

        Playground playground = this.playgroundRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Playground with ID " + id + " not found"));
            files.forEach(file -> {
                try {
                    String s3Key = this.s3Service.uploadFile(file);
                    playground.getImageS3Keys().add(s3Key);
                } catch (IOException e) {
                    log.error("Error while uploading file for playground id {}", id);
                }
            });
        this.playgroundRepository.save(playground);
        return this.playgroundMapper.toDto(playground);
    }

    @Override
    public void deleteById(Long id) {
        Playground playground = playgroundRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Playground with ID " + id + " not found"));

        // Retrieve the list of image keys from the playground entity
        List<String> imageKeys = playground.getImageS3Keys();

        // Delete images from S3
        s3Service.deleteImages(imageKeys);

        // Delete the playground entity from the database
        playgroundRepository.deleteById(id);
    }
}