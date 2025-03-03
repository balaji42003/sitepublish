package movie.balu.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter; // Imported for formatting the date
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import movie.balu.model.DealerProduct;
import movie.balu.repository.DealerProductRepo;

@Service
public class EmailService {

    @Autowired
    private DealerProductRepo dealerProductRepo;

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendExpiryReminderEmails() {
        // Format the current date as a string in 'yyyy-MM-dd' format
        String currentDateString = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); // Changed from LocalDate to formatted String

        // Pass the formatted date string to the repository
        List<DealerProduct> expiredProducts = dealerProductRepo.findExpiredProducts(currentDateString); // Updated to pass a String instead of LocalDate

        for (DealerProduct product : expiredProducts) {
            String customerEmail = product.getCustomerEmail();
            if (customerEmail != null && !customerEmail.isEmpty()) {
                String subject = "🚨 Urgent: Product Expiry Notification – Immediate Action Required";
        
                String body = "<html>" +
                        "<head>" +
                        "<style>" +
                        "body { font-family: Arial, sans-serif; color: #333; }" +
                        "h2 { color: #d9534f; }" +
                        ".highlight { color: #d9534f; font-weight: bold; }" +
                        ".details { background-color: #f8f9fa; padding: 10px; border-radius: 5px; }" +
                        "a { color: #007bff; text-decoration: none; font-weight: bold; }" +
                        "</style>" +
                        "</head>" +
                        "<body>" +
                        "<h2>⚠️ Expiry Alert: Immediate Action Required</h2>" +
                        "<p>Dear Valued Customer,</p>" +
                        "<p>We hope you are doing well. We would like to inform you that your product, <span class='highlight'>" + product.getName() + "</span>, has now <span class='highlight'>expired</span>.</p>" +
                        "<div class='details'>" +
                        "<p><strong>Product Details:</strong></p>" +
                        "<ul>" +
                        "<li><strong>Product Name:</strong> " + product.getName() + "</li>" +
                        "<li><strong>Expiry Date:</strong> " + product.getExpiryDate() + "</li>" +
                        "</ul>" +
                        "</div>" +
                        "<p>To maintain quality and compliance, we kindly request you to return the expired product. Our team is available to assist you throughout the process.</p>" +
                        "<p>For assistance, please <a href='mailto:support@RecycleConnect.com'>contact our support team</a> or call us at <span class='highlight'>+123-456-7890</span>.</p>" +
                        "<p>Thank you for your cooperation.</p>" +
                        "<p><strong>Best Regards,</strong><br>" +
                        "<span style='color:#007bff; font-weight:bold;'>Recycle Connect</span><br>" +
                        "<a href='https://www.RecycleConnect.com'>www.yourcompany.com</a></p>" +
                        "</body>" +
                        "</html>";
        
                sendEmail(customerEmail, subject, body, true);  // 'true' indicates HTML email format
            }
        }
        
        
    }

    private void sendEmail(String to, String subject, String text, boolean isHtml) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
    
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, isHtml);  // Enables HTML if 'isHtml' is true
    
            javaMailSender.send(message);
            System.out.println("Email sent successfully to: " + to);
        } catch (MessagingException e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}