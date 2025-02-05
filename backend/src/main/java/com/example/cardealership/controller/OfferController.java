package com.example.cardealership.controller;

import com.example.cardealership.model.OfferRequest;
import com.example.cardealership.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin("*")
public class OfferController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendOffer(@RequestBody OfferRequest offerRequest) {
        try {
            if (offerRequest.getSellerEmail() == null || offerRequest.getBuyerEmail() == null) {
                return ResponseEntity.badRequest().body("❌ Error: Missing email details.");
            }

            System.out.println("✅ Offer Request Received:");
            System.out.println("➡ Buyer: " + offerRequest.getBuyerEmail());
            System.out.println("➡ Seller: " + offerRequest.getSellerEmail());
            System.out.println("➡ Car: " + offerRequest.getCarTitle());
            System.out.println("➡ Price: $" + offerRequest.getOfferPrice());

            emailService.sendOfferEmail(
                    offerRequest.getSellerEmail(),
                    offerRequest.getBuyerEmail(),
                    offerRequest.getCarTitle(),
                    offerRequest.getOfferPrice()
            );

            return ResponseEntity.ok("✅ Offer sent successfully!");

        } catch (Exception e) {
            System.err.println("❌ Error in OfferController: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Internal Server Error: " + e.getMessage());
        }
    }
}
