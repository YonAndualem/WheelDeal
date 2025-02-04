package com.example.cardealership.repository;

import com.example.cardealership.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByCarListingIdOrderByTimestampAsc(Long carListingId); // Fetch all messages for a car listing
}
