package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.service.SecretsService;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Attachments;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Objects;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
@Slf4j
public class EmailController {

    @Autowired
    private SecretsService secretsService;

    private final String SENDGRID_API_KEY;
    private final String FORWARD_TO_EMAIL;
    private final String FROM_EMAIL;

    public EmailController(SecretsService secretsService) {
        this.secretsService = secretsService;
        this.SENDGRID_API_KEY = secretsService.getSecret("sendgrid.api.key");
        this.FORWARD_TO_EMAIL = secretsService.getSecret("email.forwardTo"); // kidsground.dev@gmail.com
        this.FROM_EMAIL = secretsService.getSecret("email.username"); // info@kidsground.bg
    }

    /**
     * Endpoint for receiving and forwarding emails from the contact form
     */
    @PostMapping(AppRestEndpoints.V1.Email.FORWARD)
    public ResponseEntity<String> forwardEmail(
            @RequestParam MultiValueMap<String, String> formData,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        // Extract form data
        String from = formData.getFirst("from");
        String subject = formData.getFirst("subject");
        String text = formData.getFirst("text");

        log.info("Email received from {} with subject {} with text {}", from, subject, text);

        try {
            // Create mail content with HTML formatting
            String htmlContent = "<h3>Forward from website contact form:</h3>" +
                    "<p><strong>From:</strong> " + from + "</p>" +
                    "<p><strong>Subject:</strong> " + subject + "</p>" +
                    "<p><strong>Message:</strong></p>" +
                    "<p>" + text.replace("\n", "<br/>") + "</p>";

            // Forward the email with SendGrid
            boolean success = sendEmailWithSendGrid(
                    FORWARD_TO_EMAIL,
                    "FWD: " + subject + " (from " + from + ")",
                    htmlContent,
                    file
            );

            if (success) {
                return ResponseEntity.ok("Email forwarded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to forward email");
            }
        } catch (Exception e) {
            log.error("Error forwarding email", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    /**
     * Public method for sending emails from the application
     *
     * @param toEmail - recipient's email
     * @param subject - email subject
     * @param htmlTemplatePath - path to HTML template file
     * @return boolean indicating success or failure
     */
    public boolean sendEmail(String toEmail, String subject, String htmlTemplatePath) {
        try {
            String htmlContent = new String(Files.readAllBytes(Paths.get(htmlTemplatePath)));
            return sendEmailWithSendGrid(toEmail, subject, htmlContent, null);
        } catch (IOException e) {
            log.error("Error reading HTML template", e);
            return false;
        }
    }

    /**
     * Core method to send email through SendGrid API
     */
    private boolean sendEmailWithSendGrid(String toEmail, String subject, String htmlContent, MultipartFile attachment) {
        try {
            Email from = new Email(FROM_EMAIL);
            Email to = new Email(toEmail);
            Content content = new Content("text/html", htmlContent);

            Mail mail = new Mail();
            mail.setFrom(from);
            mail.setSubject(subject);

            Personalization personalization = new Personalization();
            personalization.addTo(to);
            mail.addPersonalization(personalization);

            mail.addContent(content);

            // Add attachment if provided
            if (attachment != null && !attachment.isEmpty()) {
                try {
                    Attachments attachments = new Attachments();
                    attachments.setContent(Base64.getEncoder().encodeToString(attachment.getBytes()));
                    attachments.setType(attachment.getContentType());
                    attachments.setFilename(attachment.getOriginalFilename());
                    attachments.setDisposition("attachment");
                    mail.addAttachments(attachments);

                    log.info("Email - File attached: {}, {} bytes", attachment.getOriginalFilename(), attachment.getSize());
                } catch (IOException e) {
                    log.error("Error processing attachment", e);
                }
            }

            // Configure SendGrid
            SendGrid sg = new SendGrid(SENDGRID_API_KEY);
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            // Send the email
            Response response = sg.api(request);
            int statusCode = response.getStatusCode();

            log.info("SendGrid response: {} {}", statusCode, response.getBody());

            return statusCode >= 200 && statusCode < 300;
        } catch (Exception e) {
            log.error("Error sending email through SendGrid", e);
            return false;
        }
    }
}