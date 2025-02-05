package com.example.cardealership.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOfferEmail(String sellerEmail, String buyerEmail, String carTitle, double offerPrice) {
        try {
            System.out.println("✅ Preparing email...");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(sellerEmail);
            message.setSubject("New Offer for " + carTitle);
            message.setText(
                    "You have received an offer of $" + offerPrice +
                            " for your car listing: " + carTitle +
                            "\n\nBuyer Email: " + buyerEmail +
                            "\n\nPlease contact the buyer if interested.");

            mailSender.send(message);
            System.out.println("✅ Offer email sent successfully to " + sellerEmail);

        } catch (MailException e) {
            System.err.println("❌ Error Sending Email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
