package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private User worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    private String status;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "agreed_daily_rate", nullable = false)
    private BigDecimal agreedDailyRate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Booking() {}

    public Booking(Long id, Job job, User worker, User employer, String status, LocalDate startDate, LocalDate endDate, BigDecimal agreedDailyRate, BigDecimal totalAmount, String paymentStatus, LocalDateTime createdAt) {
        this.id = id;
        this.job = job;
        this.worker = worker;
        this.employer = employer;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.agreedDailyRate = agreedDailyRate;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Job getJob() { return job; }
    public void setJob(Job job) { this.job = job; }

    public User getWorker() { return worker; }
    public void setWorker(User worker) { this.worker = worker; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public BigDecimal getAgreedDailyRate() { return agreedDailyRate; }
    public void setAgreedDailyRate(BigDecimal agreedDailyRate) { this.agreedDailyRate = agreedDailyRate; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public static class BookingBuilder {
        private Long id;
        private Job job;
        private User worker;
        private User employer;
        private String status;
        private LocalDate startDate;
        private LocalDate endDate;
        private BigDecimal agreedDailyRate;
        private BigDecimal totalAmount;
        private String paymentStatus;
        private LocalDateTime createdAt;

        public BookingBuilder id(Long id) { this.id = id; return this; }
        public BookingBuilder job(Job job) { this.job = job; return this; }
        public BookingBuilder worker(User worker) { this.worker = worker; return this; }
        public BookingBuilder employer(User employer) { this.employer = employer; return this; }
        public BookingBuilder status(String status) { this.status = status; return this; }
        public BookingBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public BookingBuilder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public BookingBuilder agreedDailyRate(BigDecimal agreedDailyRate) { this.agreedDailyRate = agreedDailyRate; return this; }
        public BookingBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public BookingBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public BookingBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Booking build() {
            return new Booking(id, job, worker, employer, status, startDate, endDate, agreedDailyRate, totalAmount, paymentStatus, createdAt);
        }
    }
}
