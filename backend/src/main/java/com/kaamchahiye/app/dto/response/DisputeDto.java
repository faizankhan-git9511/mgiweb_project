package com.kaamchahiye.app.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DisputeDto {
    private Long id;
    private Long bookingId;
    private UserDto raisedBy;
    private UserDto worker;
    private UserDto employer;
    private BigDecimal amountInDispute;
    private String reason;
    private String status;
    private String resolutionNotes;
    private LocalDateTime createdAt;

    public DisputeDto() {}

    public DisputeDto(Long id, Long bookingId, UserDto raisedBy, UserDto worker, UserDto employer, BigDecimal amountInDispute, String reason, String status, String resolutionNotes, LocalDateTime createdAt) {
        this.id = id;
        this.bookingId = bookingId;
        this.raisedBy = raisedBy;
        this.worker = worker;
        this.employer = employer;
        this.amountInDispute = amountInDispute;
        this.reason = reason;
        this.status = status;
        this.resolutionNotes = resolutionNotes;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public UserDto getRaisedBy() { return raisedBy; }
    public void setRaisedBy(UserDto raisedBy) { this.raisedBy = raisedBy; }

    public UserDto getWorker() { return worker; }
    public void setWorker(UserDto worker) { this.worker = worker; }

    public UserDto getEmployer() { return employer; }
    public void setEmployer(UserDto employer) { this.employer = employer; }

    public BigDecimal getAmountInDispute() { return amountInDispute; }
    public void setAmountInDispute(BigDecimal amountInDispute) { this.amountInDispute = amountInDispute; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static DisputeDtoBuilder builder() {
        return new DisputeDtoBuilder();
    }

    public static class DisputeDtoBuilder {
        private Long id;
        private Long bookingId;
        private UserDto raisedBy;
        private UserDto worker;
        private UserDto employer;
        private BigDecimal amountInDispute;
        private String reason;
        private String status;
        private String resolutionNotes;
        private LocalDateTime createdAt;

        public DisputeDtoBuilder id(Long id) { this.id = id; return this; }
        public DisputeDtoBuilder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public DisputeDtoBuilder raisedBy(UserDto raisedBy) { this.raisedBy = raisedBy; return this; }
        public DisputeDtoBuilder worker(UserDto worker) { this.worker = worker; return this; }
        public DisputeDtoBuilder employer(UserDto employer) { this.employer = employer; return this; }
        public DisputeDtoBuilder amountInDispute(BigDecimal amountInDispute) { this.amountInDispute = amountInDispute; return this; }
        public DisputeDtoBuilder reason(String reason) { this.reason = reason; return this; }
        public DisputeDtoBuilder status(String status) { this.status = status; return this; }
        public DisputeDtoBuilder resolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; return this; }
        public DisputeDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public DisputeDto build() {
            return new DisputeDto(id, bookingId, raisedBy, worker, employer, amountInDispute, reason, status, resolutionNotes, createdAt);
        }
    }
}
