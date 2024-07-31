package bg.kidsground.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.*;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private SesClient sesClient;

    @Override
    public void sendEmail(String recipient, String subject, String bodyHtml) {
        Destination destination = Destination.builder()
                .toAddresses(recipient)
                .build();

        Content contentSubject = Content.builder()
                .data(subject)
                .build();

        Content htmlBody = Content.builder()
                .data(bodyHtml)
                .build();

        Body body = Body.builder()
                .html(htmlBody)
                .build();

        Message message = Message.builder()
                .subject(contentSubject)
                .body(body)
                .build();

        SendEmailRequest request = SendEmailRequest.builder()
                .destination(destination)
                .message(message)
                .source("kidsground.dev@gmail.com")
                .build();

        sesClient.sendEmail(request);
    }
}
