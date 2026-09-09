package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.BookingRequest;
import com.kaamchahiye.app.dto.response.BookingDto;
import java.util.List;

public interface BookingService {
    BookingDto createBooking(Long employerId, BookingRequest request);
    List<BookingDto> getBookingsByWorker(Long workerId);
    List<BookingDto> getBookingsByEmployer(Long employerId);
    BookingDto updateBookingStatus(Long id, String status);
}
