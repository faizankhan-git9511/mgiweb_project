import apiClient from './apiClient';

export const disputeService = {
  raiseDispute: async (userId, disputeData) => {
    const response = await apiClient.post(`/disputes/user/${userId}`, disputeData);
    return response.data;
  },

  getDisputesByWorker: async (workerId) => {
    const response = await apiClient.get(`/disputes/worker/${workerId}`);
    return response.data;
  },

  getDisputesByEmployer: async (employerId) => {
    const response = await apiClient.get(`/disputes/employer/${employerId}`);
    return response.data;
  },

  resolveDispute: async (id, status, resolutionNotes) => {
    const response = await apiClient.patch(`/disputes/${id}/resolve`, null, {
      params: { status, resolutionNotes }
    });
    return response.data;
  }
};

export default disputeService;
