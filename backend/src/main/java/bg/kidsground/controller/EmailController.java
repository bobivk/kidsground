package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.service.SecretsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import java.util.Properties;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class EmailController {

    @Autowired
    private SecretsService secretsService;

    @PostMapping(AppRestEndpoints.V1.Email.FORWARD)
    public ResponseEntity<String> forwardEmail(@RequestBody Map<String, Object> payload) {
        String sender = (String) payload.get("from");
        String subject = (String) payload.get("subject");
        String body = (String) payload.get("text");

        try {
            sendEmail(sender, subject, body);
            return ResponseEntity.ok("Email forwarded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    private void sendEmail(String sender, String subject, String body) throws MessagingException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        String forwardTo = this.secretsService.getSecret("email.forwardTo");
        String forwardToPassword = this.secretsService.getSecret("email.password");
        String emailUsername = this.secretsService.getSecret("email.username");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(forwardTo, forwardToPassword);
            }
        });

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(forwardTo));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(forwardTo));
        message.setSubject("FWD: " + subject + " (from " + sender + ")");
        message.setText(body);
        message.setReplyTo(new Address[] { new InternetAddress(emailUsername) });

        Transport.send(message);
    }
}

