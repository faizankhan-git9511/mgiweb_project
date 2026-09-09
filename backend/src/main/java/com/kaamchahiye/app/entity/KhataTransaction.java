package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "khata_transactions")
public class KhataTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private User worker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", nullable = false)
    private User employer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    private String notes;

    private String status;

    @Column(name = "voucher_url")
    private String voucherUrl;

    public KhataTransaction() {}

    public KhataTransaction(Long id, User worker, User employer, Booking booking, LocalDate transactionDate, BigDecimal amount, String transactionType, String notes, String status, String voucherUrl) {
        this.id = id;
        this.worker = worker;
        this.employer = employer;
        this.booking = booking;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.transactionType = transactionType;
        this.notes = notes;
        this.status = status;
        this.voucherUrl = voucherUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getWorker() { return worker; }
    public void setWorker(User worker) { this.worker = worker; }

    public User getEmployer() { return employer; }
    public void setEmployer(User employer) { this.employer = employer; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

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

    public static KhataTransactionBuilder builder() {
        return new KhataTransactionBuilder();
    }

    public static class KhataTransactionBuilder {
        private Long id;
        private User worker;
        private User employer;
        private Booking booking;
        private LocalDate transactionDate;
        private BigDecimal amount;
        private String transactionType;
        private String notes;
        private String status;
        private String voucherUrl;

        public KhataTransactionBuilder id(Long id) { this.id = id; return this; }
        public KhataTransactionBuilder worker(User worker) { this.worker = worker; return this; }
        public KhataTransactionBuilder employer(User employer) { this.employer = employer; return this; }
        public KhataTransactionBuilder booking(Booking booking) { this.booking = booking; return this; }
        public KhataTransactionBuilder transactionDate(LocalDate transactionDate) { this.transactionDate = transactionDate; return this; }
        public KhataTransactionBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public KhataTransactionBuilder transactionType(String transactionType) { this.transactionType = transactionType; return this; }
        public KhataTransactionBuilder notes(String notes) { this.notes = notes; return this; }
        public KhataTransactionBuilder status(String status) { this.status = status; return this; }
        public KhataTransactionBuilder voucherUrl(String voucherUrl) { this.voucherUrl = voucherUrl; return this; }

        public KhataTransaction build() {
            return new KhataTransaction(id, worker, employer, booking, transactionDate, amount, transactionType, notes, status, voucherUrl);
        }
    }
}
