package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.BookingRequest;
import com.kaamchahiye.app.dto.response.BookingDto;
import com.kaamchahiye.app.entity.Booking;
import com.kaamchahiye.app.entity.Job;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.BookingRepository;
import com.kaamchahiye.app.repository.JobRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.BookingService;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final AppMapper appMapper;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              AppMapper appMapper) {
        this.bookingRepository = bookingRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.appMapper = appMapper;
    }

    @Override
    public BookingDto createBooking(Long employerId, BookingRequest request) {
        User employer = userRepository.findById(employerId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer user not found: " + employerId));
        User worker = userRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResourceNotFoundException("Worker user not found: " + request.getWorkerId()));

        Job job = null;
        if (request.getJobId() != null) {
            job = jobRepository.findById(request.getJobId()).orElse(null);
        }

        long days = 1;
        if (request.getStartDate() != null && request.getEndDate() != null) {
            days = Math.max(1, ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate()) + 1);
        }

        BigDecimal agreedRate = request.getAgreedDailyRate() != null ? request.getAgreedDailyRate() : new BigDecimal("850.00");
        BigDecimal totalAmount = agreedRate.multiply(BigDecimal.valueOf(days));

        Booking booking = Booking.builder()
                .job(job)
                .worker(worker)
                .employer(employer)
                .status("CONFIRMED")
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .agreedDailyRate(agreedRate)
                .totalAmount(totalAmount)
                .paymentStatus("UNPAID")
                .build();

        Booking saved = bookingRepository.save(booking);
        return appMapper.toBookingDto(saved);
    }

    @Override
    public List<BookingDto> getBookingsByWorker(Long workerId) {
        return bookingRepository.findByWorkerId(workerId).stream()
                .map(appMapper::toBookingDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDto> getBookingsByEmployer(Long employerId) {
        return bookingRepository.findByEmployerId(employerId).stream()
                .map(appMapper::toBookingDto)
                .collect(Collectors.toList());
    }

    @Override
    public BookingDto updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        booking.setStatus(status);
        Booking saved = bookingRepository.save(booking);
        return appMapper.toBookingDto(saved);
    }
}
