package com.kaamchahiye.app.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingDto {
    private Long id;
    private JobDto job;
    private UserDto worker;
    private UserDto employer;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal agreedDailyRate;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private LocalDateTime createdAt;

    public BookingDto() {}

    public BookingDto(Long id, JobDto job, UserDto worker, UserDto employer, String status, LocalDate startDate, LocalDate endDate, BigDecimal agreedDailyRate, BigDecimal totalAmount, String paymentStatus, LocalDateTime createdAt) {
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

    public JobDto getJob() { return job; }
    public void setJob(JobDto job) { this.job = job; }

    public UserDto getWorker() { return worker; }
    public void setWorker(UserDto worker) { this.worker = worker; }

    public UserDto getEmployer() { return employer; }
    public void setEmployer(UserDto employer) { this.employer = employer; }

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

    public static BookingDtoBuilder builder() {
        return new BookingDtoBuilder();
    }

    public static class BookingDtoBuilder {
        private Long id;
        private JobDto job;
        private UserDto worker;
        private UserDto employer;
        private String status;
        private LocalDate startDate;
        private LocalDate endDate;
        private BigDecimal agreedDailyRate;
        private BigDecimal totalAmount;
        private String paymentStatus;
        private LocalDateTime createdAt;

        public BookingDtoBuilder id(Long id) { this.id = id; return this; }
        public BookingDtoBuilder job(JobDto job) { this.job = job; return this; }
        public BookingDtoBuilder worker(UserDto worker) { this.worker = worker; return this; }
        public BookingDtoBuilder employer(UserDto employer) { this.employer = employer; return this; }
        public BookingDtoBuilder status(String status) { this.status = status; return this; }
        public BookingDtoBuilder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public BookingDtoBuilder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public BookingDtoBuilder agreedDailyRate(BigDecimal agreedDailyRate) { this.agreedDailyRate = agreedDailyRate; return this; }
        public BookingDtoBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public BookingDtoBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public BookingDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public BookingDto build() {
            return new BookingDto(id, job, worker, employer, status, startDate, endDate, agreedDailyRate, totalAmount, paymentStatus, createdAt);
        }
    }
}
