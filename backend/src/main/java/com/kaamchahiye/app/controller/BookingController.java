package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.BookingRequest;
import com.kaamchahiye.app.dto.response.BookingDto;
import com.kaamchahiye.app.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/employer/{employerId}")
    public ResponseEntity<BookingDto> createBooking(@PathVariable Long employerId, @RequestBody BookingRequest request) {
        return ResponseEntity.ok(bookingService.createBooking(employerId, request));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<BookingDto>> getBookingsByWorker(@PathVariable Long workerId) {
        return ResponseEntity.ok(bookingService.getBookingsByWorker(workerId));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<BookingDto>> getBookingsByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(bookingService.getBookingsByEmployer(employerId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<BookingDto> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }
}
