package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.User;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.PlaygroundService;
import bg.kidsground.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class UserControllerTest {
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testRegister() throws Exception {

        when(userService.save(any())).thenReturn(new UserDto("pesho", "pesho@mail.bg", UserRole.USER));

        mockMvc.perform(post(AppRestEndpoints.V1.Users.REGISTER)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"username\" : \"pesho\",\n" +
                                "  \"password\" : \"password123\",\n" +
                                "  \"email\" : \"pesho@mail.bg\"\n" +
                                "}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value("pesho"))
                .andExpect(jsonPath("$.email").value("pesho@mail.bg"));
    }
}
