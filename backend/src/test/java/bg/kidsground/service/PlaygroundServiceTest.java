package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.domain.mapper.PlaygroundMapper;
import bg.kidsground.repository.PlaygroundRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class PlaygroundServiceTest {

    @Mock
    private PlaygroundRepository playgroundRepository;

    @Mock
    private S3Service s3Service;

    @Mock
    private UserService userService;

    @Captor
    private ArgumentCaptor<Playground> playgroundCaptor;

    @InjectMocks
    private PlaygroundServiceImpl playgroundService;

    private PlaygroundMapper playgroundMapper;

    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User(1L, "username", "password", "pesho@mail.bg", UserRole.USER);
        when(userService.findUserById(1L)).thenReturn(user);
        this.playgroundMapper = Mappers.getMapper(PlaygroundMapper.class);
        ReflectionTestUtils.setField(playgroundMapper, "userService", userService);
        ReflectionTestUtils.setField(playgroundMapper, "s3Service", s3Service);
        ReflectionTestUtils.setField(playgroundService, "playgroundMapper", playgroundMapper);
    }

    @Test
    public void testSavePlayground() {
        // Given
        Long id = 1L;
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setName("New Playground");
        playgroundDto.setUserId(1L);
        Playground playground = new Playground();
        playground.setId(id);
        playground.setName("New Playground");
        playground.setCreator(user);
        when(playgroundRepository.save(any())).thenReturn(playground);

        // When
        playgroundService.savePlayground(playgroundDto);

        // Then
        verify(playgroundRepository, times(1)).save(playgroundCaptor.capture());
        Playground capturedPlayground = playgroundCaptor.getValue();
        assertEquals("New Playground", capturedPlayground.getName());
        assertEquals("username", capturedPlayground.getCreator().getUsername());

    }

    @Test
    public void testGetById_Success() {
        // Given
        Long id = 1L;
        Playground playground = new Playground();
        playground.setId(id);
        playground.setCreator(user);
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setUserId(1L);

        when(playgroundRepository.findById(id)).thenReturn(Optional.of(playground));

        // When
        PlaygroundDto result = playgroundService.getById(id);

        // Then
        assertEquals(playgroundDto, result);
        verify(playgroundRepository, times(1)).findById(id);
    }

    @Test
    public void testGetById_NotFound() {
        // Given
        Long id = 1L;
        when(playgroundRepository.findById(id)).thenReturn(Optional.empty());

        // When / Then
        assertThrows(RuntimeException.class, () -> playgroundService.getById(id));
        verify(playgroundRepository, times(1)).findById(id);
    }

    @Test
    public void testFindAllApproved() {
        // Given
        Playground playground = new Playground();
        playground.setCreator(user);
        playground.setNew(false);
        when(playgroundRepository.findByIsNewFalse()).thenReturn(Collections.singletonList(playground));

        // When
        List<PlaygroundDto> result = playgroundService.findAllApproved();

        // Then
        assertEquals(1, result.size());
        verify(playgroundRepository, times(1)).findByIsNewFalse();
    }

    @Test
    public void testFindAllToApprove() {
        // Given
        Playground playground = new Playground();
        playground.setCreator(user);
        playground.setNew(true);
        when(playgroundRepository.findByIsNewTrue()).thenReturn(Collections.singletonList(playground));

        // When
        List<PlaygroundDto> result = playgroundService.findAllToApprove();

        // Then
        assertEquals(1, result.size());
        verify(playgroundRepository, times(1)).findByIsNewTrue();
    }

    @Test
    public void testGetCount() {
        // Given
        when(playgroundRepository.count()).thenReturn(10L);

        // When
        Integer result = playgroundService.getCount();

        // Then
        assertEquals(10, result);
        verify(playgroundRepository, times(1)).count();
    }

    @Test
    public void testUpdatePlayground_Success() {
        // Given
        Long id = 1L;
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setName("Updated Playground");
        playgroundDto.setUserId(1L);
        playgroundDto.setImageLinks(List.of("image_url"));

        Playground existingPlayground = new Playground();
        existingPlayground.setId(id);
        existingPlayground.setCreator(user);
        List<String> imageS3Keys = List.of("s3Key");
        existingPlayground.setImageS3Keys(imageS3Keys);

        Playground updatedPlayground = new Playground();
        updatedPlayground.setId(id);
        updatedPlayground.setName("Updated Playground");
        updatedPlayground.setCreator(user);
        updatedPlayground.setImageS3Keys(imageS3Keys);

        when(playgroundRepository.findById(id)).thenReturn(Optional.of(existingPlayground));
        when(playgroundRepository.save(any())).thenReturn(updatedPlayground);
        when(s3Service.getImageUrl("s3Key")).thenReturn("image_url");

        // When
        PlaygroundDto result = playgroundService.updatePlayground(id, playgroundDto);

        // Then
        assertEquals(playgroundDto, result);
        verify(playgroundRepository, times(1)).findById(id);
        verify(playgroundRepository, times(1)).save(playgroundCaptor.capture());

        Playground capturedPlayground = playgroundCaptor.getValue();
        assertEquals(id, capturedPlayground.getId());
        assertEquals("Updated Playground", capturedPlayground.getName());
        assertEquals(user.getUsername(), capturedPlayground.getCreator().getUsername());
        assertEquals(imageS3Keys, capturedPlayground.getImageS3Keys());
    }

    @Test
    public void testUpdatePlayground_NotFound() {
        // Given
        Long id = 1L;
        PlaygroundDto playgroundDto = new PlaygroundDto();
        when(playgroundRepository.findById(id)).thenReturn(Optional.empty());

        // When / Then
        assertThrows(RuntimeException.class, () -> playgroundService.updatePlayground(id, playgroundDto));
        verify(playgroundRepository, times(1)).findById(id);
        verify(playgroundRepository, never()).save(any(Playground.class));
    }

    @Test
    public void testUploadImage() throws IOException {
        // Given
        Long id = 1L;
        String s3Key = "s3://bucket/key";
        String imageUrl = "https://s3-url";
        MultipartFile file = mock(MultipartFile.class);
        Playground playground = new Playground();
        playground.setId(id);
        playground.setCreator(user);
        when(playgroundRepository.findById(id)).thenReturn(Optional.of(playground));
        when(s3Service.uploadFile(file)).thenReturn(s3Key);
        when(s3Service.getImageUrl(s3Key)).thenReturn(imageUrl);
        when(playgroundRepository.save(playground)).thenReturn(playground);
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setUserId(1L);
        playgroundDto.setId(1L);
        playgroundDto.setImageLinks(List.of(imageUrl));

        // When
        PlaygroundDto result = playgroundService.uploadImages(List.of(file), id);

        // Then
        assertEquals(playgroundDto, result);
        verify(playgroundRepository, times(1)).findById(id);
        verify(playgroundRepository, times(1)).save(playground);
        verify(s3Service, times(1)).uploadFile(file);
    }

    @Test
    public void testApprove_WhenPlaygroundIsApproved() {
        // Arrange
        Playground playground = new Playground();
        playground.setId(1L);
        playground.setNew(true);

        when(playgroundRepository.findById(1L)).thenReturn(Optional.of(playground));
        when(playgroundRepository.save(any(Playground.class))).thenReturn(playground);

        // Act
        PlaygroundDto result = playgroundService.approve(1L, true);

        // Assert
        verify(playgroundRepository, times(1)).findById(1L);
        verify(playgroundRepository, times(1)).save(playground);

        assertNotNull(result);
        assertFalse(playground.isNew());
    }

    @Test
    public void testApprove_WhenPlaygroundIsNotApproved() {
        // Arrange
        Playground playground = new Playground();
        playground.setId(1L);

        when(playgroundRepository.findById(1L)).thenReturn(Optional.of(playground));

        // Act
        PlaygroundDto result = playgroundService.approve(1L, false);

        // Assert
        verify(playgroundRepository, times(1)).findById(1L);
        verify(playgroundRepository, times(1)).deleteById(1L);

        assertNull(result);
    }


    @Test
    public void testDeleteById_Success() {
        // Given
        Long id = 1L;
        Playground playground = new Playground();
        playground.setId(id);
        List<String> imageS3Keys = List.of("s3Key1", "s3Key2");
        playground.setImageS3Keys(imageS3Keys);

        when(playgroundRepository.findById(id)).thenReturn(Optional.of(playground));

        // When
        playgroundService.deleteById(id);

        // Then
        verify(playgroundRepository, times(1)).findById(id);
        verify(s3Service, times(1)).deleteImages(imageS3Keys);
        verify(playgroundRepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteById_PlaygroundNotFound() {
        // Given
        Long id = 1L;
        when(playgroundRepository.findById(id)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(NoSuchElementException.class, () -> playgroundService.deleteById(id));
        verify(playgroundRepository, times(1)).findById(id);
        verify(s3Service, times(0)).deleteImages(any());
        verify(playgroundRepository, times(0)).deleteById(id);
    }
}