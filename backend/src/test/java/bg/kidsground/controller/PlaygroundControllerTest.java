package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.Playground;
import bg.kidsground.service.PlaygroundService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

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
        Playground playground = new Playground(); // You need to create a Playground object here with appropriate data
        playground.setName("Test Playground");
        ObjectMapper objectMapper = new ObjectMapper();
        String playgroundJson = objectMapper.writeValueAsString(playground);

        mockMvc.perform(post(AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(playgroundJson))
                .andExpect(status().isOk());

        verify(playgroundService).savePlayground(any(Playground.class));
    }

    @Test
    public void testGetPlaygroundById() throws Exception {
        Long id = 1L; // Sample ID
        String name = "TestPlayground";
        Playground playground = new Playground(); // You need to create a Playground object here with appropriate data
        playground.setId(id);
        playground.setName(name);

        when(playgroundService.getById(id)).thenReturn(playground);

        mockMvc.perform(get(AppRestEndpoints.V1.Playground.By.ID, id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.name").value(name));

        verify(playgroundService).getById(id);
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
