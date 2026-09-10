package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "disputes")
public class Dispute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "raised_by_id", nullable = false)
    private User raisedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private User worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    @Column(name = "amount_in_dispute", nullable = false)
    private BigDecimal amountInDispute;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String reason;

    private String status; // OPEN, UNDER_REVIEW, RESOLVED, REJECTED

    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Dispute() {}

    public Dispute(Long id, Booking booking, User raisedBy, User worker, User employer, BigDecimal amountInDispute, String reason, String status, String resolutionNotes, LocalDateTime createdAt) {
        this.id = id;
        this.booking = booking;
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

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public User getRaisedBy() { return raisedBy; }
    public void setRaisedBy(User raisedBy) { this.raisedBy = raisedBy; }

    public User getWorker() { return worker; }
    public void setWorker(User worker) { this.worker = worker; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

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

    public static DisputeBuilder builder() {
        return new DisputeBuilder();
    }

    public static class DisputeBuilder {
        private Long id;
        private Booking booking;
        private User raisedBy;
        private User worker;
        private User employer;
        private BigDecimal amountInDispute;
        private String reason;
        private String status;
        private String resolutionNotes;
        private LocalDateTime createdAt;

        public DisputeBuilder id(Long id) { this.id = id; return this; }
        public DisputeBuilder booking(Booking booking) { this.booking = booking; return this; }
        public DisputeBuilder raisedBy(User raisedBy) { this.raisedBy = raisedBy; return this; }
        public DisputeBuilder worker(User worker) { this.worker = worker; return this; }
        public DisputeBuilder employer(User employer) { this.employer = employer; return this; }
        public DisputeBuilder amountInDispute(BigDecimal amountInDispute) { this.amountInDispute = amountInDispute; return this; }
        public DisputeBuilder reason(String reason) { this.reason = reason; return this; }
        public DisputeBuilder status(String status) { this.status = status; return this; }
        public DisputeBuilder resolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; return this; }
        public DisputeBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Dispute build() {
            return new Dispute(id, booking, raisedBy, worker, employer, amountInDispute, reason, status, resolutionNotes, createdAt);
        }
    }
}
