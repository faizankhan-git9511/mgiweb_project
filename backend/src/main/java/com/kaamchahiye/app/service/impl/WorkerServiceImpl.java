package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.response.WorkerProfileDto;
import com.kaamchahiye.app.entity.WorkerProfile;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.WorkerProfileRepository;
import com.kaamchahiye.app.service.WorkerService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkerServiceImpl implements WorkerService {

    private final WorkerProfileRepository workerProfileRepository;
    private final AppMapper appMapper;

    public WorkerServiceImpl(WorkerProfileRepository workerProfileRepository, AppMapper appMapper) {
        this.workerProfileRepository = workerProfileRepository;
        this.appMapper = appMapper;
    }

    @Override
    public List<WorkerProfileDto> getAllWorkers(String category, String skill, String location) {
        List<WorkerProfile> profiles = workerProfileRepository.searchWorkers(category, skill, location);
        return profiles.stream().map(appMapper::toWorkerProfileDto).collect(Collectors.toList());
    }

    @Override
    public WorkerProfileDto getWorkerById(Long id) {
        WorkerProfile profile = workerProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Worker profile not found with id: " + id));
        return appMapper.toWorkerProfileDto(profile);
    }

    @Override
    public WorkerProfileDto getWorkerByUserId(Long userId) {
        WorkerProfile profile = workerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Worker profile not found for user: " + userId));
        return appMapper.toWorkerProfileDto(profile);
    }

    @Override
    public WorkerProfileDto updateAvailability(Long userId, String status) {
        WorkerProfile profile = workerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Worker profile not found for user: " + userId));
        profile.setAvailabilityStatus(status);
        WorkerProfile updated = workerProfileRepository.save(profile);
        return appMapper.toWorkerProfileDto(updated);
    }
}
