package com.kaamchahiye.app.dto.request;

import java.math.BigDecimal;

public class DisputeRequest {
    private Long bookingId;
    private Long workerId;
    private Long employerId;
    private BigDecimal amountInDispute;
    private String reason;

    public DisputeRequest() {}

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public Long getEmployerId() { return employerId; }
    public void setEmployerId(Long employerId) { this.employerId = employerId; }

    public BigDecimal getAmountInDispute() { return amountInDispute; }
    public void setAmountInDispute(BigDecimal amountInDispute) { this.amountInDispute = amountInDispute; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
