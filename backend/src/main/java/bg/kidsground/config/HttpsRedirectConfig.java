import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.server.WebFilter;

import javax.annotation.PostConstruct;

@Configuration
public class HttpsRedirectConfig extends WebSecurityConfigurerAdapter {

    private final Environment env;

    public HttpsRedirectConfig(Environment env) {
        this.env = env;
    }

    @PostConstruct
    private void init() {
        if (env.getProperty("server.ssl.key-store") != null) {
            System.setProperty("server.ssl.enabled", "true");
        }
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.requiresChannel()
            .anyRequest()
            .requiresSecure();
    }
}
