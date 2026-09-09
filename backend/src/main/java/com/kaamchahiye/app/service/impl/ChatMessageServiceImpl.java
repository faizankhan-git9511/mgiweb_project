package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.ChatMessageRequest;
import com.kaamchahiye.app.dto.response.ChatMessageDto;
import com.kaamchahiye.app.entity.Booking;
import com.kaamchahiye.app.entity.ChatMessage;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.BookingRepository;
import com.kaamchahiye.app.repository.ChatMessageRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.ChatMessageService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final AppMapper appMapper;

    public ChatMessageServiceImpl(ChatMessageRepository chatRepository,
                                  UserRepository userRepository,
                                  BookingRepository bookingRepository,
                                  AppMapper appMapper) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.appMapper = appMapper;
    }

    @Override
    public ChatMessageDto sendMessage(Long senderId, ChatMessageRequest request) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found: " + senderId));
        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("Receiver not found: " + request.getReceiverId()));

        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId()).orElse(null);
        }

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .booking(booking)
                .content(request.getContent())
                .readStatus(false)
                .build();

        ChatMessage saved = chatRepository.save(message);
        return appMapper.toChatMessageDto(saved);
    }

    @Override
    public List<ChatMessageDto> getConversation(Long user1, Long user2) {
        return chatRepository.findConversation(user1, user2).stream()
                .map(appMapper::toChatMessageDto)
                .collect(Collectors.toList());
    }
}
