package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.JobRequest;
import com.kaamchahiye.app.dto.response.JobDto;
import java.util.List;

public interface JobService {
    List<JobDto> getAllJobs(String category, String skill, String location);
    JobDto getJobById(Long id);
    List<JobDto> getJobsByEmployerId(Long employerId);
    JobDto createJob(Long employerUserId, JobRequest request);
    JobDto updateJobStatus(Long id, String status);
}
