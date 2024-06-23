package bg.kidsground.config;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.UserRole;
import bg.kidsground.repository.UserRepository;
import bg.kidsground.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration
{

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JWTFilter filter;
    @Autowired
    private UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorizeRequests ) -> authorizeRequests
                        .requestMatchers(AppRestEndpoints.V1.Users.REGISTER,
                                AppRestEndpoints.V1.Playground.COUNT, AppRestEndpoints.V1.Playground.GET_ALL).permitAll()
                        .requestMatchers(HttpMethod.GET, AppRestEndpoints.V1.Playground.By.ID).permitAll()
                        .requestMatchers(HttpMethod.DELETE, AppRestEndpoints.V1.Playground.By.ID).hasRole(UserRole.ADMIN.getValue())
                        .requestMatchers(AppRestEndpoints.V1.Playground.ADD_PLAYGROUND).authenticated()
                        .anyRequest().authenticated()
                )
                .formLogin(formLogin -> formLogin.loginPage(AppRestEndpoints.V1.Users.LOGIN).permitAll())
                .logout(LogoutConfigurer::permitAll)
                .httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}