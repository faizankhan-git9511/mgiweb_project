package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.ChatMessageRequest;
import com.kaamchahiye.app.dto.response.ChatMessageDto;
import com.kaamchahiye.app.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    public ChatMessageController(ChatMessageService chatMessageService) {
        this.chatMessageService = chatMessageService;
    }

    @PostMapping("/sender/{senderId}")
    public ResponseEntity<ChatMessageDto> sendMessage(@PathVariable Long senderId, @RequestBody ChatMessageRequest request) {
        return ResponseEntity.ok(chatMessageService.sendMessage(senderId, request));
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<ChatMessageDto>> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2) {
        return ResponseEntity.ok(chatMessageService.getConversation(user1, user2));
    }
}
