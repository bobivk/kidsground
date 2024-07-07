package bg.kidsground.controller;

import bg.kidsground.config.JWTUtil;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.UserRole;
import bg.kidsground.domain.dto.LoginDto;
import bg.kidsground.domain.dto.UserDto;
import bg.kidsground.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
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
    @Mock
    private JWTUtil jwtUtil;

    private UserDto userDto;
    private LoginDto loginDto;

    @BeforeEach
    public void setup() {
        userDto = new UserDto("testuser", null, UserRole.USER);

        loginDto = new LoginDto("testuser", "password", null);
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

    }

    @Test
    public void loginUser_Success() throws Exception {
        when(userService.login(any(LoginDto.class))).thenReturn(userDto);
        when(jwtUtil.generateToken(any(String.class), any(String.class))).thenReturn("dummy-token");

        mockMvc.perform(post("/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"testuser\", \"password\": \"password\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.token").value("dummy-token"));
    }

    @Test
    public void loginUser_BadCredentials() throws Exception {
        when(userService.login(any(LoginDto.class))).thenThrow(new BadCredentialsException("Invalid credentials"));

        mockMvc.perform(post("/v1/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"testuser\", \"password\": \"wrongpassword\"}"))
                .andExpect(status().isNotFound());
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
