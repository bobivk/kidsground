package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.service.SecretsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.MultiValueMap;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Objects;
import java.util.Properties;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
@Slf4j
public class EmailController {

    @Autowired
    private SecretsService secretsService;

    @PostMapping(AppRestEndpoints.V1.Email.FORWARD)
    public ResponseEntity<String> forwardEmail(
            @RequestParam MultiValueMap<String, String> formData, // Extract form fields
            @RequestParam(value = "file", required = false) MultipartFile file) {
        // Extract form data (e.g., "from", "subject", etc.)
        String from = formData.getFirst("from");
        String subject = formData.getFirst("subject");
        String text = formData.getFirst("text");

        log.info("Email received from {} with subject {} with text {}", from, subject, text);

        try {
            sendEmail(from, subject, text, file);
            return ResponseEntity.ok("Email forwarded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    private void sendEmail(String sender, String subject, String body, MultipartFile file) throws MessagingException {
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

        if (file != null && file.getOriginalFilename() != null && !Objects.equals(file.getOriginalFilename(), "")) {
            long fileSize = file.getSize();
            log.info("Email - File received: {}, {} bytes", file.getOriginalFilename(), fileSize);
            message.setFileName(file.getOriginalFilename());
        }

        Transport.send(message);
    }
}

