package com.example.cardealership.controller;

import com.example.cardealership.model.ChatMessage;
import com.example.cardealership.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat Feature", description = "Chat Feature Management")
public class ChatController {

    @Autowired
    private ChatService chatService;

    //  Fetch Chat History for a Listing
    @Operation(summary = "Get chat history for a car listing", description = "Retrieves the chat history for a specific car listing.")
    @GetMapping("/{carListingId}")
    public List<ChatMessage> getChatHistory(@PathVariable Long carListingId) {
        return chatService.getChatHistory(carListingId);
    }

    //  Send a New Message
    @Operation(summary = "Send a new message", description = "Sends a new message to the chat.")
    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.saveMessage(message);
    }

    //  Edit an Existing Message (Text or Image)
    @Operation(summary = "Edit an existing message", description = "Edits an existing message by updating the text or image URL.")
    @PutMapping("/{messageId}")
    public ChatMessage updateMessage(
            @PathVariable Long messageId,
            @RequestParam(required = false) String newMessageText,
            @RequestParam(required = false) String newImageUrl
    ) {
        return chatService.updateMessage(messageId, newMessageText, newImageUrl);
    }


    //  Delete a Message
    @Operation(summary = "Delete a message", description = "Deletes a message from the chat.")
    @DeleteMapping("/{messageId}")
    public String deleteMessage(@PathVariable Long messageId) {
        chatService.deleteMessage(messageId);
        return "Message deleted successfully.";
    }
}
