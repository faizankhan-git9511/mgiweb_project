package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.AttendanceRequest;
import com.kaamchahiye.app.dto.response.AttendanceDto;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {
    AttendanceDto recordAttendance(AttendanceRequest request);
    List<AttendanceDto> getAttendanceByWorker(Long workerId);
    List<AttendanceDto> getAttendanceByDate(LocalDate date);
}
