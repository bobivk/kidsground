package bg.kidsground.service;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
@EnableAutoConfiguration
public class SecretsServiceImpl implements SecretsService {

    @Value("${maps.apiKey}")
    private String mapsApiKey;

    @Override
    public String getMapsApiKey() {
        return mapsApiKey;
    }
}
