package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.response.WorkerProfileDto;
import com.kaamchahiye.app.service.WorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping
    public ResponseEntity<List<WorkerProfileDto>> getAllWorkers(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(workerService.getAllWorkers(category, skill, location));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkerProfileDto> getWorkerById(@PathVariable Long id) {
        return ResponseEntity.ok(workerService.getWorkerById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<WorkerProfileDto> getWorkerByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(workerService.getWorkerByUserId(userId));
    }

    @PatchMapping("/user/{userId}/availability")
    public ResponseEntity<WorkerProfileDto> updateAvailability(
            @PathVariable Long userId,
            @RequestParam String status) {
        return ResponseEntity.ok(workerService.updateAvailability(userId, status));
    }
}
