package bg.kidsground.config;
import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration
{
        
    @Autowired
    private JWTFilter filter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorizeRequests ) -> authorizeRequests
                        // Allow non-logged-in
                        .requestMatchers(AppRestEndpoints.V1.Users.REGISTER, AppRestEndpoints.V1.Users.LOGIN,
                                AppRestEndpoints.V1.Playground.COUNT, AppRestEndpoints.V1.Playground.GET_ALL)
                                    .permitAll()
                        .requestMatchers(HttpMethod.GET, AppRestEndpoints.V1.Playground.By.ID)
                                    .permitAll()

                        // restrict to admin only
                        .requestMatchers(HttpMethod.DELETE, AppRestEndpoints.V1.Playground.By.ID).hasRole(UserRole.ADMIN.getValue())
                        .requestMatchers(HttpMethod.DELETE, AppRestEndpoints.V1.Comments.By.ID).hasRole(UserRole.ADMIN.getValue())
                        .requestMatchers(AppRestEndpoints.V1.Playground.TO_APPROVE,
                                        AppRestEndpoints.V1.Playground.By.Id.APPROVE)
                                    .hasRole(UserRole.ADMIN.getValue())

                        // require user to be logged in
                        .requestMatchers(AppRestEndpoints.V1.Playground.ADD_PLAYGROUND,
                                        AppRestEndpoints.V1.Playground.By.Id.UPLOAD_IMAGES,
                                        AppRestEndpoints.V1.Playground.By.USER,
                                        AppRestEndpoints.V1.Comments.ADD,
                                        AppRestEndpoints.V1.Comments.COMMENTS_ROOT,
                                        AppRestEndpoints.V1.Comments.By.USER)
                                    .authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .logout(LogoutConfigurer::permitAll)
                .requiresChannel(channel -> channel
                        .anyRequest().requiresSecure()
                )
                .httpBasic(withDefaults());
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

}