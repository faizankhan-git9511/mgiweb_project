package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.DisputeRequest;
import com.kaamchahiye.app.dto.response.DisputeDto;
import com.kaamchahiye.app.entity.Booking;
import com.kaamchahiye.app.entity.Dispute;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.BookingRepository;
import com.kaamchahiye.app.repository.DisputeRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.DisputeService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DisputeServiceImpl implements DisputeService {

    private final DisputeRepository disputeRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final AppMapper appMapper;

    public DisputeServiceImpl(DisputeRepository disputeRepository,
                               UserRepository userRepository,
                               BookingRepository bookingRepository,
                               AppMapper appMapper) {
        this.disputeRepository = disputeRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.appMapper = appMapper;
    }

    @Override
    public DisputeDto raiseDispute(Long raisedByUserId, DisputeRequest request) {
        User raisedBy = userRepository.findById(raisedByUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + raisedByUserId));
        User worker = userRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new ResourceNotFoundException("Worker not found: " + request.getWorkerId()));
        User employer = userRepository.findById(request.getEmployerId())
                .orElseThrow(() -> new ResourceNotFoundException("Employer not found: " + request.getEmployerId()));

        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId()).orElse(null);
        }

        Dispute dispute = Dispute.builder()
                .booking(booking)
                .raisedBy(raisedBy)
                .worker(worker)
                .employer(employer)
                .amountInDispute(request.getAmountInDispute())
                .reason(request.getReason())
                .status("OPEN")
                .build();

        Dispute saved = disputeRepository.save(dispute);
        return appMapper.toDisputeDto(saved);
    }

    @Override
    public List<DisputeDto> getDisputesByWorker(Long workerId) {
        return disputeRepository.findByWorkerId(workerId).stream()
                .map(appMapper::toDisputeDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DisputeDto> getDisputesByEmployer(Long employerId) {
        return disputeRepository.findByEmployerId(employerId).stream()
                .map(appMapper::toDisputeDto)
                .collect(Collectors.toList());
    }

    @Override
    public DisputeDto resolveDispute(Long id, String status, String resolutionNotes) {
        Dispute dispute = disputeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dispute not found: " + id));
        dispute.setStatus(status);
        dispute.setResolutionNotes(resolutionNotes);
        Dispute saved = disputeRepository.save(dispute);
        return appMapper.toDisputeDto(saved);
    }
}
