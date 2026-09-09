package com.kaamchahiye.app.controller;

import com.kaamchahiye.app.dto.request.AttendanceRequest;
import com.kaamchahiye.app.dto.response.AttendanceDto;
import com.kaamchahiye.app.service.AttendanceService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<AttendanceDto> recordAttendance(@RequestBody AttendanceRequest request) {
        return ResponseEntity.ok(attendanceService.recordAttendance(request));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByWorker(@PathVariable Long workerId) {
        return ResponseEntity.ok(attendanceService.getAttendanceByWorker(workerId));
    }

    @GetMapping("/date")
    public ResponseEntity<List<AttendanceDto>> getAttendanceByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getAttendanceByDate(date));
    }
}
