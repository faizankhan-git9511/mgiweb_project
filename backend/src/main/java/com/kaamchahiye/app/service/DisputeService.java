package com.kaamchahiye.app.service;

import com.kaamchahiye.app.dto.request.DisputeRequest;
import com.kaamchahiye.app.dto.response.DisputeDto;
import java.util.List;

public interface DisputeService {
    DisputeDto raiseDispute(Long raisedByUserId, DisputeRequest request);
    List<DisputeDto> getDisputesByWorker(Long workerId);
    List<DisputeDto> getDisputesByEmployer(Long employerId);
    DisputeDto resolveDispute(Long id, String status, String resolutionNotes);
}
