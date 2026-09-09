package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.DisputeRequest;
import com.kaamchahiye.app.dto.response.DisputeDto;
import com.kaamchahiye.app.service.DisputeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/disputes")
public class DisputeController {

    private final DisputeService disputeService;

    public DisputeController(DisputeService disputeService) {
        this.disputeService = disputeService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<DisputeDto> raiseDispute(@PathVariable Long userId, @RequestBody DisputeRequest request) {
        return ResponseEntity.ok(disputeService.raiseDispute(userId, request));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<DisputeDto>> getDisputesByWorker(@PathVariable Long workerId) {
        return ResponseEntity.ok(disputeService.getDisputesByWorker(workerId));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<DisputeDto>> getDisputesByEmployer(@PathVariable Long employerId) {
        return ResponseEntity.ok(disputeService.getDisputesByEmployer(employerId));
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<DisputeDto> resolveDispute(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String resolutionNotes) {
        return ResponseEntity.ok(disputeService.resolveDispute(id, status, resolutionNotes));
    }
}
