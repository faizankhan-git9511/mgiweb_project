package com.kaamchahiye.app.service.impl;

import com.kaamchahiye.app.dto.request.JobRequest;
import com.kaamchahiye.app.dto.response.JobDto;
import com.kaamchahiye.app.entity.Job;
import com.kaamchahiye.app.entity.User;
import com.kaamchahiye.app.exception.ResourceNotFoundException;
import com.kaamchahiye.app.mapper.AppMapper;
import com.kaamchahiye.app.repository.JobRepository;
import com.kaamchahiye.app.repository.UserRepository;
import com.kaamchahiye.app.service.JobService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final AppMapper appMapper;

    public JobServiceImpl(JobRepository jobRepository, UserRepository userRepository, AppMapper appMapper) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.appMapper = appMapper;
    }

    @Override
    public List<JobDto> getAllJobs(String category, String skill, String location) {
        return jobRepository.searchJobs(category, skill, location).stream()
                .map(appMapper::toJobDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return appMapper.toJobDto(job);
    }

    @Override
    public List<JobDto> getJobsByEmployerId(Long employerId) {
        return jobRepository.findByEmployerId(employerId).stream()
                .map(appMapper::toJobDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobDto createJob(Long employerUserId, JobRequest request) {
        User employer = userRepository.findById(employerUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer user not found: " + employerUserId));

        Job job = Job.builder()
                .title(request.getTitle())
                .category(request.getCategory())
                .tradeSkillRequired(request.getTradeSkillRequired())
                .location(request.getLocation())
                .dailyRate(request.getDailyRate())
                .description(request.getDescription())
                .status("OPEN")
                .employer(employer)
                .workerCountNeeded(request.getWorkerCountNeeded() != null ? request.getWorkerCountNeeded() : 1)
                .build();

        Job saved = jobRepository.save(job);
        return appMapper.toJobDto(saved);
    }

    @Override
    public JobDto updateJobStatus(Long id, String status) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        job.setStatus(status);
        Job saved = jobRepository.save(job);
        return appMapper.toJobDto(saved);
    }
}
