package bg.kidsground.service;

import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagement;
import com.amazonaws.services.simplesystemsmanagement.AWSSimpleSystemsManagementClientBuilder;
import com.amazonaws.services.simplesystemsmanagement.model.GetParameterRequest;
import com.amazonaws.services.simplesystemsmanagement.model.GetParameterResult;
import org.springframework.stereotype.Service;

@Service
public class ParameterStoreService {

//    private final AWSSimpleSystemsManagement ssmClient = AWSSimpleSystemsManagementClientBuilder.defaultClient();
//
//    public String getParameter(String parameterName) {
//        GetParameterRequest request = new GetParameterRequest().withName(parameterName).withWithDecryption(true);
//        GetParameterResult result = ssmClient.getParameter(request);
//        return result.getParameter().getValue();
//    }
}
