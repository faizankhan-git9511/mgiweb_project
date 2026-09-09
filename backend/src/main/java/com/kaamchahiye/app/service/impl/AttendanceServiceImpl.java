package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.AttendanceRequest;
import com.kaamchahiye.app.dto.response.AttendanceDto;
import com.kaamchahiye.app.entity.Attendance;
import com.kaamchahiye.app.entity.Booking;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.AttendanceRepository;
import com.kaamchahiye.app.repository.BookingRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.AttendanceService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final AppMapper appMapper;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository,
                                  UserRepository userRepository,
                                  BookingRepository bookingRepository,
                                  AppMapper appMapper) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.appMapper = appMapper;
    }

    @Override
    public AttendanceDto recordAttendance(AttendanceRequest request) {
        User worker = userRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResourceNotFoundException("Worker not found with id: " + request.getWorkerId()));

        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId()).orElse(null);
        }

        Attendance attendance = Attendance.builder()
                .booking(booking)
                .worker(worker)
                .siteLocation(request.getSiteLocation() != null ? request.getSiteLocation() : "Default Site Location")
                .attendanceDate(request.getAttendanceDate() != null ? request.getAttendanceDate() : LocalDate.now())
                .status(request.getStatus() != null ? request.getStatus() : "PRESENT")
                .checkInTime(request.getCheckInTime() != null ? request.getCheckInTime() : "08:30 AM")
                .checkOutTime(request.getCheckOutTime() != null ? request.getCheckOutTime() : "05:30 PM")
                .verificationMethod(request.getVerificationMethod() != null ? request.getVerificationMethod() : "MANUAL_SUPERVISOR")
                .build();

        Attendance saved = attendanceRepository.save(attendance);
        return appMapper.toAttendanceDto(saved);
    }

    @Override
    public List<AttendanceDto> getAttendanceByWorker(Long workerId) {
        return attendanceRepository.findByWorkerId(workerId).stream()
                .map(appMapper::toAttendanceDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByAttendanceDate(date).stream()
                .map(appMapper::toAttendanceDto)
                .collect(Collectors.toList());
    }
}
