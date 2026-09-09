package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.ChatMessageRequest;
import com.kaamchahiye.app.dto.response.ChatMessageDto;
import java.util.List;

public interface ChatMessageService {
    ChatMessageDto sendMessage(Long senderId, ChatMessageRequest request);
    List<ChatMessageDto> getConversation(Long user1, Long user2);
}
