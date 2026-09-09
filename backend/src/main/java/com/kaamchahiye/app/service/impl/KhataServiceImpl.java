package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.KhataRequest;
import com.kaamchahiye.app.dto.response.KhataTransactionDto;
import com.kaamchahiye.app.entity.Booking;
import com.kaamchahiye.app.entity.KhataTransaction;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.BookingRepository;
import com.kaamchahiye.app.repository.KhataTransactionRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.KhataService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class KhataServiceImpl implements KhataService {

    private final KhataTransactionRepository khataRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final AppMapper appMapper;

    public KhataServiceImpl(KhataTransactionRepository khataRepository,
                            UserRepository userRepository,
                            BookingRepository bookingRepository,
                            AppMapper appMapper) {
        this.khataRepository = khataRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.appMapper = appMapper;
    }

    @Override
    public KhataTransactionDto addTransaction(KhataRequest request) {
        User worker = userRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResourceNotFoundException("Worker user not found: " + request.getWorkerId()));
        User employer = userRepository.findById(request.getEmployerId())
                .orElseThrow(() -> new ResourceNotFoundException("Employer user not found: " + request.getEmployerId()));

        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId()).orElse(null);
        }

        KhataTransaction khata = KhataTransaction.builder()
                .worker(worker)
                .employer(employer)
                .booking(booking)
                .transactionDate(request.getTransactionDate() != null ? request.getTransactionDate() : LocalDate.now())
                .amount(request.getAmount())
                .transactionType(request.getTransactionType() != null ? request.getTransactionType() : "WAGE_PAYMENT")
                .notes(request.getNotes())
                .status("APPROVED")
                .voucherUrl(request.getVoucherUrl())
                .build();

        KhataTransaction saved = khataRepository.save(khata);
        return appMapper.toKhataTransactionDto(saved);
    }

    @Override
    public List<KhataTransactionDto> getWorkerKhata(Long workerId) {
        return khataRepository.findByWorkerId(workerId).stream()
                .map(appMapper::toKhataTransactionDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<KhataTransactionDto> getEmployerKhata(Long employerId) {
        return khataRepository.findByEmployerId(employerId).stream()
                .map(appMapper::toKhataTransactionDto)
                .collect(Collectors.toList());
    }

    @Override
    public KhataTransactionDto updateStatus(Long id, String status) {
        KhataTransaction khata = khataRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + id));
        khata.setStatus(status);
        KhataTransaction saved = khataRepository.save(khata);
        return appMapper.toKhataTransactionDto(saved);
    }
}
