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
        user = new User("username", "password", "pesho@mail.bg", UserRole.USER);
        when(userService.findByUsername("username")).thenReturn(user);
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
        Playground playground = new Playground();
        playground.setId(id);
        playground.setName("New Playground");
        playground.setCreatedByUser(user);
        when(playgroundRepository.save(any())).thenReturn(playground);
        when(userService.findUserByToken("token")).thenReturn(user);

        // When
        playgroundService.savePlayground(playgroundDto, "token");

        // Then
        verify(playgroundRepository, times(1)).save(playgroundCaptor.capture());
        Playground capturedPlayground = playgroundCaptor.getValue();
        assertEquals("New Playground", capturedPlayground.getName());
        assertEquals("username", capturedPlayground.getCreatedByUser().getUsername());

    }

    @Test
    public void testGetById_Success() {
        // Given
        Long id = 1L;
        Playground playground = new Playground();
        playground.setId(id);
        playground.setCreatedByUser(user);
        playground.setAgeGroups(List.of("SIX_TO_TWELVE"));
        playground.setFloorType(List.of("floor"));
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setRating(0.0);
        playgroundDto.setFloorType(List.of("floor"));
        playgroundDto.setUsername(user.getUsername());
        playgroundDto.setAgeGroups(List.of("SIX_TO_TWELVE"));

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
        playground.setAgeGroups(List.of("SIX_TO_TWELVE"));
        playground.setCreatedByUser(user);
        playground.setNew(false);
        when(playgroundRepository.findByIsNewFalse()).thenReturn(Collections.singletonList(playground));

        // When
        List<PlaygroundDto> result = playgroundService.findAllApproved();

        // Then
        assertEquals(1, result.size());
        assertEquals(result.get(0).getAgeGroups(), List.of("SIX_TO_TWELVE"));
        verify(playgroundRepository, times(1)).findByIsNewFalse();
    }

    @Test
    public void testFindAllToApprove() {
        // Given
        Playground playground = new Playground();
        playground.setCreatedByUser(user);
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
        when(playgroundRepository.countByIsNewFalse()).thenReturn(10L);

        // When
        Integer result = playgroundService.getApprovedCount();

        // Then
        assertEquals(10, result);
        verify(playgroundRepository, times(1)).countByIsNewFalse();
    }

    @Test
    public void testUpdatePlayground_Success() {
        // Given
        Long id = 1L;
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setName("Updated Playground");
        playgroundDto.setImageLinks(List.of("image_url"));
        playgroundDto.setRating(0.0);
        playgroundDto.setFloorType(List.of("floor"));
        playgroundDto.setUsername(user.getUsername());
        playgroundDto.setAgeGroups(List.of("SIX_TO_TWELVE"));

        Playground existingPlayground = new Playground();
        existingPlayground.setId(id);
        existingPlayground.setCreatedByUser(user);
        List<String> imageS3Keys = List.of("s3Key");
        existingPlayground.setImageS3Keys(imageS3Keys);
        existingPlayground.setFloorType(List.of("floor"));

        Playground updatedPlayground = new Playground();
        updatedPlayground.setId(id);
        updatedPlayground.setName("Updated Playground");
        updatedPlayground.setCreatedByUser(user);
        updatedPlayground.setImageS3Keys(imageS3Keys);
        updatedPlayground.setFloorType(List.of("floor"));
        updatedPlayground.setAgeGroups(List.of("SIX_TO_TWELVE"));

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
        assertEquals(user.getUsername(), capturedPlayground.getCreatedByUser().getUsername());
        assertEquals(imageS3Keys, capturedPlayground.getImageS3Keys());
    }

    @Test
    public void testGetByAuthToken() {
        // Prepare test data
        String authToken = "test-token";
        User user = new User();
        user.setUsername("testUser");

        Playground playground = new Playground();
        playground.setId(1L);
        playground.setName("Test Playground");
        playground.setCreatedByUser(user);
        playground.setFloorType(List.of("rubber"));
        playground.setAgeGroups(List.of("SIX_TO_TWELVE"));

        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setName("Test Playground");
        playgroundDto.setFloorType(List.of("rubber"));
        playgroundDto.setRating(0.0);
        playgroundDto.setUsername("testUser");
        playgroundDto.setAgeGroups(List.of("SIX_TO_TWELVE"));

        List<Playground> playgrounds = Collections.singletonList(playground);
        List<PlaygroundDto> playgroundDtos = Collections.singletonList(playgroundDto);

        // Mock the service and repository calls
        when(userService.findUserByToken(authToken)).thenReturn(user);
        when(playgroundRepository.findByCreatedByUser(user)).thenReturn(playgrounds);

        // Call the method under test
        List<PlaygroundDto> result = playgroundService.getByAuthToken(authToken);

        // Verify the results
        assertEquals(playgroundDtos, result);
        verify(userService).findUserByToken(authToken);
        verify(playgroundRepository).findByCreatedByUser(user);
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
        playground.setCreatedByUser(user);
        playground.setFloorType(List.of("floor"));
        playground.setAgeGroups(List.of("SIX_TO_TWELVE"));
        when(playgroundRepository.findById(id)).thenReturn(Optional.of(playground));
        when(s3Service.uploadFile(file)).thenReturn(s3Key);
        when(s3Service.getImageUrl(s3Key)).thenReturn(imageUrl);
        when(playgroundRepository.save(playground)).thenReturn(playground);
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setImageLinks(List.of(imageUrl));
        playgroundDto.setRating(0.0);
        playgroundDto.setFloorType(List.of("floor"));
        playgroundDto.setAgeGroups(List.of("SIX_TO_TWELVE"));
        playgroundDto.setUsername(user.getUsername());

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