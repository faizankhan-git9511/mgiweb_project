package com.kaamchahiye.app.repository;

import com.kaamchahiye.app.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByWorkerId(Long workerId);
    List<Booking> findByEmployerId(Long employerId);
    List<Booking> findByJobId(Long jobId);
}
