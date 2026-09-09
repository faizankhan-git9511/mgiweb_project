package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.JobRequest;
import com.kaamchahiye.app.dto.response.JobDto;
import com.kaamchahiye.app.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location) {
        return ResponseEntity.ok(jobService.getAllJobs(category, skill, location));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobDto>> getJobsByEmployerId(@PathVariable Long employerId) {
        return ResponseEntity.ok(jobService.getJobsByEmployerId(employerId));
    }

    @PostMapping("/employer/{employerId}")
    public ResponseEntity<JobDto> createJob(@PathVariable Long employerId, @RequestBody JobRequest request) {
        return ResponseEntity.ok(jobService.createJob(employerId, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<JobDto> updateJobStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(jobService.updateJobStatus(id, status));
    }
}
