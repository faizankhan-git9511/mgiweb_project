package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.KhataRequest;
import com.kaamchahiye.app.dto.response.KhataTransactionDto;
import com.kaamchahiye.app.service.KhataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/khata")
public class KhataController {

    private final KhataService khataService;

    public KhataController(KhataService khataService) {
        this.khataService = khataService;
    }

    @PostMapping
    public ResponseEntity<KhataTransactionDto> addTransaction(@RequestBody KhataRequest request) {
        return ResponseEntity.ok(khataService.addTransaction(request));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<KhataTransactionDto>> getWorkerKhata(@PathVariable Long workerId) {
        return ResponseEntity.ok(khataService.getWorkerKhata(workerId));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<KhataTransactionDto>> getEmployerKhata(@PathVariable Long employerId) {
        return ResponseEntity.ok(khataService.getEmployerKhata(employerId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<KhataTransactionDto> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(khataService.updateStatus(id, status));
    }
}
