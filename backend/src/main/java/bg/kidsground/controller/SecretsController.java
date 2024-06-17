package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.service.SecretsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecretsController {
    @Autowired
    private SecretsService secretsService;

    @GetMapping(AppRestEndpoints.V1.Secrets.MAPS_API_KEY)
    public ResponseEntity<String> getMapsApiKey() {
        return ResponseEntity.ok(this.secretsService.getSecret("maps.apiKey"));
    }
}
