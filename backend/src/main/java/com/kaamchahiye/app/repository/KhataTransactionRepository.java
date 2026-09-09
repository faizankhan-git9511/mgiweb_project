package com.kaamchahiye.app.repository;

import com.kaamchahiye.app.entity.KhataTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface KhataTransactionRepository extends JpaRepository<KhataTransaction, Long> {
    List<KhataTransaction> findByWorkerId(Long workerId);
    List<KhataTransaction> findByEmployerId(Long employerId);
    List<KhataTransaction> findByStatus(String status);
}
