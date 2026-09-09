import apiClient from './apiClient';

export const jobService = {
  getJobs: async (filters = {}) => {
    const response = await apiClient.get('/jobs', { params: filters });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  getJobsByEmployer: async (employerId) => {
    const response = await apiClient.get(`/jobs/employer/${employerId}`);
    return response.data;
  },

  createJob: async (employerId, jobData) => {
    const response = await apiClient.post(`/jobs/employer/${employerId}`, jobData);
    return response.data;
  },

  updateJobStatus: async (id, status) => {
    const response = await apiClient.patch(`/jobs/${id}/status`, null, { params: { status } });
    return response.data;
  }
};

export default jobService;
