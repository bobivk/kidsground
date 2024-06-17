package bg.kidsground.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;

@Service
@Slf4j
public class SecretsServiceImpl implements SecretsService {

    @Autowired
    private SsmClient ssmClient;

    public String getSecret(String secretName) {
        String secret = this.ssmClient.getParameter(
                        GetParameterRequest.builder()
                                .name("/config/kidsground/" + secretName)
                                .withDecryption(true)
                                .build())
                .parameter()
                .value();
        log.info("got secret from param store with name {} and value {}", secretName, secret);
        return secret;
    }
}
