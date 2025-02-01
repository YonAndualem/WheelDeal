package com.example.cardealership.controller;

import com.example.cardealership.model.ChatMessage;
import com.example.cardealership.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    //  Fetch Chat History for a Listing
    @GetMapping("/{carListingId}")
    public List<ChatMessage> getChatHistory(@PathVariable Long carListingId) {
        return chatService.getChatHistory(carListingId);
    }

    //  Send a New Message
    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.saveMessage(message);
    }

    //  Edit an Existing Message (Text or Image)
    @PutMapping("/{messageId}")
    public ChatMessage updateMessage(
            @PathVariable Long messageId,
            @RequestParam(required = false) String newMessageText,
            @RequestParam(required = false) String newImageUrl
    ) {
        return chatService.updateMessage(messageId, newMessageText, newImageUrl);
    }


    //  Delete a Message
    @DeleteMapping("/{messageId}")
    public String deleteMessage(@PathVariable Long messageId) {
        chatService.deleteMessage(messageId);
        return "Message deleted successfully.";
    }
}
