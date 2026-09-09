package com.kaamchahiye.app.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingRequest {
    private Long jobId;
    private Long workerId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal agreedDailyRate;

    public BookingRequest() {}

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public BigDecimal getAgreedDailyRate() { return agreedDailyRate; }
    public void setAgreedDailyRate(BigDecimal agreedDailyRate) { this.agreedDailyRate = agreedDailyRate; }
}
