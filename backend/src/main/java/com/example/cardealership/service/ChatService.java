package com.example.cardealership.service;

import com.example.cardealership.model.ChatMessage;
import com.example.cardealership.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChatHistory(Long carListingId) {
        return chatMessageRepository.findByCarListingIdOrderByTimestampAsc(carListingId);
    }

    public void deleteMessage(Long messageId) {
        chatMessageRepository.deleteById(messageId);
    }

    // ✅ Edit an existing message
    public ChatMessage updateMessage(Long messageId, String newMessageText, String newImageUrl) {
        Optional<ChatMessage> existingMessage = chatMessageRepository.findById(messageId);
        if (existingMessage.isPresent()) {
            ChatMessage message = existingMessage.get();

            // ✅ Allow updating text OR image (or both)
            boolean isUpdated = false;
            if (newMessageText != null && !newMessageText.isEmpty()) {
                message.setMessageText(newMessageText);
                isUpdated = true;
            }
            if (newImageUrl != null && !newImageUrl.isEmpty()) {
                message.setImageUrl(newImageUrl);
                isUpdated = true;
            }

            if (isUpdated) {
                message.setEdited(true); // ✅ Mark message as edited
                return chatMessageRepository.save(message);
            } else {
                throw new RuntimeException("No valid data to update.");
            }
        }
        throw new RuntimeException("Message not found.");
    }

}
