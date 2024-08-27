package bg.kidsground.service;

public interface EmailService {
    void sendEmail(String recipient, String subject, String bodyHtml);
}
