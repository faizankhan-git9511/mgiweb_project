package com.kaamchahiye.app.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private User worker;

    @Column(name = "site_location")
    private String siteLocation;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(nullable = false)
    private String status;

    @Column(name = "check_in_time")
    private String checkInTime;

    @Column(name = "check_out_time")
    private String checkOutTime;

    @Column(name = "verification_method")
    private String verificationMethod;

    public Attendance() {}

    public Attendance(Long id, Booking booking, User worker, String siteLocation, LocalDate attendanceDate, String status, String checkInTime, String checkOutTime, String verificationMethod) {
        this.id = id;
        this.booking = booking;
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

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public User getWorker() { return worker; }
    public void setWorker(User worker) { this.worker = worker; }

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

    public static AttendanceBuilder builder() {
        return new AttendanceBuilder();
    }

    public static class AttendanceBuilder {
        private Long id;
        private Booking booking;
        private User worker;
        private String siteLocation;
        private LocalDate attendanceDate;
        private String status;
        private String checkInTime;
        private String checkOutTime;
        private String verificationMethod;

        public AttendanceBuilder id(Long id) { this.id = id; return this; }
        public AttendanceBuilder booking(Booking booking) { this.booking = booking; return this; }
        public AttendanceBuilder worker(User worker) { this.worker = worker; return this; }
        public AttendanceBuilder siteLocation(String siteLocation) { this.siteLocation = siteLocation; return this; }
        public AttendanceBuilder attendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; return this; }
        public AttendanceBuilder status(String status) { this.status = status; return this; }
        public AttendanceBuilder checkInTime(String checkInTime) { this.checkInTime = checkInTime; return this; }
        public AttendanceBuilder checkOutTime(String checkOutTime) { this.checkOutTime = checkOutTime; return this; }
        public AttendanceBuilder verificationMethod(String verificationMethod) { this.verificationMethod = verificationMethod; return this; }

        public Attendance build() {
            return new Attendance(id, booking, worker, siteLocation, attendanceDate, status, checkInTime, checkOutTime, verificationMethod);
        }
    }
}
