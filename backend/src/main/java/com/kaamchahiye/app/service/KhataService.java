package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.KhataRequest;
import com.kaamchahiye.app.dto.response.KhataTransactionDto;
import java.util.List;

public interface KhataService {
    KhataTransactionDto addTransaction(KhataRequest request);
    List<KhataTransactionDto> getWorkerKhata(Long workerId);
    List<KhataTransactionDto> getEmployerKhata(Long employerId);
    KhataTransactionDto updateStatus(Long id, String status);
}
