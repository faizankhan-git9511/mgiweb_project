import apiClient from './apiClient';

export const workerService = {
  getWorkers: async (filters = {}) => {
    const response = await apiClient.get('/workers', { params: filters });
    return response.data;
  },

  getWorkerById: async (id) => {
    const response = await apiClient.get(`/workers/${id}`);
    return response.data;
  },

  getWorkerByUserId: async (userId) => {
    const response = await apiClient.get(`/workers/user/${userId}`);
    return response.data;
  },

  updateAvailability: async (userId, status) => {
    const response = await apiClient.patch(`/workers/user/${userId}/availability`, null, {
      params: { status }
    });
    return response.data;
  }
};

export default workerService;
