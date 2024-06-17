package bg.kidsground.config;

import bg.kidsground.service.SecretsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

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
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://your-database-url:3306/your-database-name");
        dataSource.setUsername("db.username");
        dataSource.setPassword("db.password");
        return dataSource;
    }
}
