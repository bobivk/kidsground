package bg.kidsground.config;

import bg.kidsground.service.SecretsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    final SecretsService secretsService;

    @Autowired
    public DataSourceConfig(SecretsService secretsService) {
        this.secretsService = secretsService;
    }

    @Primary
    @Bean
    public DataSource dataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(this.secretsService.getSecret("db.url"));
        dataSource.setUsername(this.secretsService.getSecret("db.username"));
        dataSource.setPassword(this.secretsService.getSecret("db.password"));

        return dataSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
