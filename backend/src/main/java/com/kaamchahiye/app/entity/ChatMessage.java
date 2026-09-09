package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(columnDefinition = "NVARCHAR(MAX)", nullable = false)
    private String content;

    @Column(name = "sent_at", insertable = false, updatable = false)
    private LocalDateTime sentAt;

    @Column(name = "read_status")
    private Boolean readStatus;

    public ChatMessage() {}

    public ChatMessage(Long id, User sender, User receiver, Booking booking, String content, LocalDateTime sentAt, Boolean readStatus) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.booking = booking;
        this.content = content;
        this.sentAt = sentAt;
        this.readStatus = readStatus;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getSender() { return sender; }
    public void setSender(User sender) { this.sender = sender; }

    public User getReceiver() { return receiver; }
    public void setReceiver(User receiver) { this.receiver = receiver; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public Boolean getReadStatus() { return readStatus; }
    public void setReadStatus(Boolean readStatus) { this.readStatus = readStatus; }

    public static ChatMessageBuilder builder() {
        return new ChatMessageBuilder();
    }

    public static class ChatMessageBuilder {
        private Long id;
        private User sender;
        private User receiver;
        private Booking booking;
        private String content;
        private LocalDateTime sentAt;
        private Boolean readStatus;

        public ChatMessageBuilder id(Long id) { this.id = id; return this; }
        public ChatMessageBuilder sender(User sender) { this.sender = sender; return this; }
        public ChatMessageBuilder receiver(User receiver) { this.receiver = receiver; return this; }
        public ChatMessageBuilder booking(Booking booking) { this.booking = booking; return this; }
        public ChatMessageBuilder content(String content) { this.content = content; return this; }
        public ChatMessageBuilder sentAt(LocalDateTime sentAt) { this.sentAt = sentAt; return this; }
        public ChatMessageBuilder readStatus(Boolean readStatus) { this.readStatus = readStatus; return this; }

        public ChatMessage build() {
            return new ChatMessage(id, sender, receiver, booking, content, sentAt, readStatus);
        }
    }
}
