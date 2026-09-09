package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.response.WorkerProfileDto;
import java.util.List;

public interface WorkerService {
    List<WorkerProfileDto> getAllWorkers(String category, String skill, String location);
    WorkerProfileDto getWorkerById(Long id);
    WorkerProfileDto getWorkerByUserId(Long userId);
    WorkerProfileDto updateAvailability(Long userId, String status);
}
