package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Coordinates;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.service.PlaygroundService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.NoSuchElementException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class PlaygroundControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PlaygroundService playgroundService;

    @InjectMocks
    private PlaygroundController playgroundController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(playgroundController).build();
    }

    @Test
    public void testSavePlayground() throws Exception {
        PlaygroundDto playground = new PlaygroundDto();
        playground.setName("Test Playground");
        playground.setAgeGroup(AgeGroup.THREE_TO_SIX);
        playground.setUsername("username");
        playground.setFloorType(List.of("rubber"));
        ObjectMapper objectMapper = new ObjectMapper();
        String playgroundJson = objectMapper.writeValueAsString(playground);

        mockMvc.perform(post(AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer <Test Token>")
                        .content(playgroundJson))
                .andExpect(status().isOk())
                .andExpect(content().json("0"));

        verify(playgroundService).savePlayground(any(PlaygroundDto.class), any());
    }

    @Test
    public void testGetPlaygroundById() throws Exception {
        Long id = 1L;
        String name = "TestPlayground";
        PlaygroundDto playground = new PlaygroundDto();
        playground.setId(1L);
        playground.setName(name);
        playground.setAgeGroup(AgeGroup.THREE_TO_SIX);
        playground.setCoordinates(Coordinates.builder().latitude(10.2).longitude(20.1).build());
        playground.setFacilities(List.of("пързалка", "люлка"));
        playground.setFloorType(List.of("rubber"));
        playground.setEnvironment("apartments");
        playground.setHasFence(true);
        playground.setToys(List.of("конче"));
        playground.setImageLinks(List.of("https://example.com/image"));
        playground.setShadeType("trees");

        when(playgroundService.getById(id)).thenReturn(playground);

        mockMvc.perform(get(AppRestEndpoints.V1.Playground.By.ID, id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(name))
                .andExpect(jsonPath("$.age_group").value("three_to_six"))
                .andExpect(jsonPath("$.coordinates.lat").value(10.2))
                .andExpect(jsonPath("$.coordinates.lng").value(20.1))
                .andExpect(jsonPath("$.facilities[0]").value("пързалка"))
                .andExpect(jsonPath("$.facilities[1]").value("люлка"))
                .andExpect(jsonPath("$.toys[0]").value("конче"))
                .andExpect(jsonPath("$.image_links").value("https://example.com/image"))
                .andExpect(jsonPath("$.floor_type").value("rubber"))
                .andExpect(jsonPath("$.shade_type").value("trees"))
                .andExpect(jsonPath("$.has_fence").value(true))
                .andExpect(jsonPath("$.environment").value("apartments"));

        verify(playgroundService).getById(id);
    }

    @Test
    public void testGetPlaygroundsByUserId() throws Exception {
        // Prepare test data
        PlaygroundDto playgroundDto = new PlaygroundDto();
        playgroundDto.setId(1L);
        playgroundDto.setName("Test Playground");
        List<PlaygroundDto> playgrounds = List.of(playgroundDto);

        // Mock the service call
        when(playgroundService.getByAuthToken("Bearer <Test Token>")).thenReturn(playgrounds);

        // Perform the GET request
        mockMvc.perform(get(AppRestEndpoints.V1.Playground.By.USER)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer <Test Token>")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{'id':1,'name':'Test Playground'}]"));
    }

    @Test
    public void testPlaygroundNotFound() throws Exception {
        Long nonExistingId = 99999999999999999L;

        when(playgroundService.getById(nonExistingId)).thenThrow(new NoSuchElementException());

        mockMvc.perform(get(AppRestEndpoints.V1.Playground.By.ID, nonExistingId))
                .andExpect(status().isNotFound());

        verify(playgroundService).getById(nonExistingId);
    }
}
