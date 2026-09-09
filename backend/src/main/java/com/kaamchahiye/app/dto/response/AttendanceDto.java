package com.kaamchahiye.app.dto.response;

import java.time.LocalDate;

public class AttendanceDto {
    private Long id;
    private Long bookingId;
    private UserDto worker;
    private String siteLocation;
    private LocalDate attendanceDate;
    private String status;
    private String checkInTime;
    private String checkOutTime;
    private String verificationMethod;

    public AttendanceDto() {}

    public AttendanceDto(Long id, Long bookingId, UserDto worker, String siteLocation, LocalDate attendanceDate, String status, String checkInTime, String checkOutTime, String verificationMethod) {
        this.id = id;
        this.bookingId = bookingId;
        this.worker = worker;
        this.siteLocation = siteLocation;
        this.attendanceDate = attendanceDate;
        this.status = status;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.verificationMethod = verificationMethod;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public UserDto getWorker() { return worker; }
    public void setWorker(UserDto worker) { this.worker = worker; }

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

    public static AttendanceDtoBuilder builder() {
        return new AttendanceDtoBuilder();
    }

    public static class AttendanceDtoBuilder {
        private Long id;
        private Long bookingId;
        private UserDto worker;
        private String siteLocation;
        private LocalDate attendanceDate;
        private String status;
        private String checkInTime;
        private String checkOutTime;
        private String verificationMethod;

        public AttendanceDtoBuilder id(Long id) { this.id = id; return this; }
        public AttendanceDtoBuilder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public AttendanceDtoBuilder worker(UserDto worker) { this.worker = worker; return this; }
        public AttendanceDtoBuilder siteLocation(String siteLocation) { this.siteLocation = siteLocation; return this; }
        public AttendanceDtoBuilder attendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; return this; }
        public AttendanceDtoBuilder status(String status) { this.status = status; return this; }
        public AttendanceDtoBuilder checkInTime(String checkInTime) { this.checkInTime = checkInTime; return this; }
        public AttendanceDtoBuilder checkOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; return this; }
        public AttendanceDtoBuilder verificationMethod(String verificationMethod) { this.verificationMethod = verificationMethod; return this; }

        public AttendanceDto build() {
            return new AttendanceDto(id, bookingId, worker, siteLocation, attendanceDate, status, checkInTime, checkOutTime, verificationMethod);
        }
    }
}
