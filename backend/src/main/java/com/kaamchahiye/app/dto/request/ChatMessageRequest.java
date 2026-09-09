package com.kaamchahiye.app.dto.request;

public class ChatMessageRequest {
    private Long receiverId;
    private Long bookingId;
    private String content;

    public ChatMessageRequest() {}

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
