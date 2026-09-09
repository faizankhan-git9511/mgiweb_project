package com.kaamchahiye.app.dto.response;

import java.time.LocalDateTime;

public class ChatMessageDto {
    private Long id;
    private UserDto sender;
    private UserDto receiver;
    private Long bookingId;
    private String content;
    private LocalDateTime sentAt;
    private Boolean readStatus;

    public ChatMessageDto() {}

    public ChatMessageDto(Long id, UserDto sender, UserDto receiver, Long bookingId, String content, LocalDateTime sentAt, Boolean readStatus) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.bookingId = bookingId;
        this.content = content;
        this.sentAt = sentAt;
        this.readStatus = readStatus;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserDto getSender() { return sender; }
    public void setSender(UserDto sender) { this.sender = sender; }

    public UserDto getReceiver() { return receiver; }
    public void setReceiver(UserDto receiver) { this.receiver = receiver; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public Boolean getReadStatus() { return readStatus; }
    public void setReadStatus(Boolean readStatus) { this.readStatus = readStatus; }

    public static ChatMessageDtoBuilder builder() {
        return new ChatMessageDtoBuilder();
    }

    public static class ChatMessageDtoBuilder {
        private Long id;
        private UserDto sender;
        private UserDto receiver;
        private Long bookingId;
        private String content;
        private LocalDateTime sentAt;
        private Boolean readStatus;

        public ChatMessageDtoBuilder id(Long id) { this.id = id; return this; }
        public ChatMessageDtoBuilder sender(UserDto sender) { this.sender = sender; return this; }
        public ChatMessageDtoBuilder receiver(UserDto receiver) { this.receiver = receiver; return this; }
        public ChatMessageDtoBuilder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public ChatMessageDtoBuilder content(String content) { this.content = content; return this; }
        public ChatMessageDtoBuilder sentAt(LocalDateTime sentAt) { this.sentAt = sentAt; return this; }
        public ChatMessageDtoBuilder readStatus(Boolean readStatus) { this.readStatus = readStatus; return this; }

        public ChatMessageDto build() {
            return new ChatMessageDto(id, sender, receiver, bookingId, content, sentAt, readStatus);
        }
    }
}
