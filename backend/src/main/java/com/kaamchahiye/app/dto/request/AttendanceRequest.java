package com.kaamchahiye.app.dto.request;

import java.time.LocalDate;

public class AttendanceRequest {
    private Long bookingId;
    private Long workerId;
    private String siteLocation;
    private LocalDate attendanceDate;
    private String status;
    private String checkInTime;
    private String checkOutTime;
    private String verificationMethod;

    public AttendanceRequest() {}

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public String getSiteLocation() { return siteLocation; }
    public void setSiteLocation(String siteLocation) { this.siteLocation = siteLocation; }

    public LocalDate getAttendanceDate() { return attendanceDate; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCheckInTime() { return checkInTime; }
    public void setCheckInTime(String checkInTime) { this.checkInTime = checkInTime; }

    public String getCheckOutTime() { return checkOutTime; }
    public void setCheckOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; }

    public String getVerificationMethod() { return verificationMethod; }
    public void setVerificationMethod(String verificationMethod) { this.verificationMethod = verificationMethod; }
}
