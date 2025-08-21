package bg.kidsground.service;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.sendgrid.*;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final String sendGridApiKey;
    private final String fromEmail;

    public EmailServiceImpl(final SecretsService secretsService) {
        this.sendGridApiKey = secretsService.getSecret("sendgrid.api.key");
        this.fromEmail = secretsService.getSecret("email.username");
    }

    @Override
    public void sendEmail(String recipient, String subject, String bodyHtml) {
        try {
            Email from = new Email(fromEmail);
            Email to = new Email(recipient);
            Content content = new Content("text/html", bodyHtml);

            Mail mail = new Mail();
            mail.setFrom(from);
            mail.setSubject(subject);

            Personalization personalization = new Personalization();
            personalization.addTo(to);
            mail.addPersonalization(personalization);

            mail.addContent(content);

            SendGrid sg = new SendGrid(sendGridApiKey);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
            int statusCode = response.getStatusCode();

            log.info("SendGrid response: {} {}", statusCode, response.getBody());
        } catch (Exception e) {
            log.error("Could not send email. Exception is", e);
        }
    }
}