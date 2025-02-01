package com.example.cardealership.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long carListingId; // The listing being discussed

    @Column(nullable = false)
    private String senderEmail; // Buyer or seller

    @Column(nullable = false)
    private String receiverEmail; // The recipient

    @Column(nullable = false, columnDefinition = "TEXT")
    private String messageText; // The chat message

    @Column(nullable = true)
    private String imageUrl; // Firebase image URL (if any)

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now(); // When the message was sent

    @Column(nullable = false)
    private boolean edited = false; // New field: Track if message was edited
}
