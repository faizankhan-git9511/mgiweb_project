package com.kaamchahiye.app.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class KhataTransactionDto {
    private Long id;
    private UserDto worker;
    private UserDto employer;
    private Long bookingId;
    private LocalDate transactionDate;
    private BigDecimal amount;
    private String transactionType;
    private String notes;
    private String status;
    private String voucherUrl;

    public KhataTransactionDto() {}

    public KhataTransactionDto(Long id, UserDto worker, UserDto employer, Long bookingId, LocalDate transactionDate, BigDecimal amount, String transactionType, String notes, String status, String voucherUrl) {
        this.id = id;
        this.worker = worker;
        this.employer = employer;
        this.bookingId = bookingId;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.transactionType = transactionType;
        this.notes = notes;
        this.status = status;
        this.voucherUrl = voucherUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UserDto getWorker() { return worker; }
    public void setWorker(UserDto worker) { this.worker = worker; }

    public UserDto getEmployer() { return employer; }
    public void setEmployer(UserDto employer) { this.employer = employer; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public LocalDate getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getVoucherUrl() { return voucherUrl; }
    public void setVoucherUrl(String voucherUrl) { this.voucherUrl = voucherUrl; }

    public static KhataTransactionDtoBuilder builder() {
        return new KhataTransactionDtoBuilder();
    }

    public static class KhataTransactionDtoBuilder {
        private Long id;
        private UserDto worker;
        private UserDto employer;
        private Long bookingId;
        private LocalDate transactionDate;
        private BigDecimal amount;
        private String transactionType;
        private String notes;
        private String status;
        private String voucherUrl;

        public KhataTransactionDtoBuilder id(Long id) { this.id = id; return this; }
        public KhataTransactionDtoBuilder worker(UserDto worker) { this.worker = worker; return this; }
        public KhataTransactionDtoBuilder employer(UserDto employer) { this.employer = employer; return this; }
        public KhataTransactionDtoBuilder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public KhataTransactionDtoBuilder transactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; return this; }
        public KhataTransactionDtoBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public KhataTransactionDtoBuilder transactionType(String transactionType) { this.transactionType = transactionType; return this; }
        public KhataTransactionDtoBuilder notes(String notes) { this.notes = notes; return this; }
        public KhataTransactionDtoBuilder status(String status) { this.status = status; return this; }
        public KhataTransactionDtoBuilder voucherUrl(String voucherUrl) { this.voucherUrl = voucherUrl; return this; }

        public KhataTransactionDto build() {
            return new KhataTransactionDto(id, worker, employer, bookingId, transactionDate, amount, transactionType, notes, status, voucherUrl);
        }
    }
}
