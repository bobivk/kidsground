package bg.kidsground.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParameterRequest;

@Service
public class SecretsServiceImpl implements SecretsService {

    @Autowired
    private SsmClient ssmClient;

    public String getSecret(String secretName) {
        return this.ssmClient.getParameter(
                        GetParameterRequest.builder()
                                .name("/config/kidsground/" + secretName)
                                .build())
                .parameter()
                .value();
    }
}
