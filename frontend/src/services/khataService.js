import apiClient from './apiClient';

export const khataService = {
  addTransaction: async (khataData) => {
    const response = await apiClient.post('/khata', khataData);
    return response.data;
  },

  getWorkerKhata: async (workerId) => {
    const response = await apiClient.get(`/khata/worker/${workerId}`);
    return response.data;
  },

  getEmployerKhata: async (employerId) => {
    const response = await apiClient.get(`/khata/employer/${employerId}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await apiClient.patch(`/khata/${id}/status`, null, { params: { status } });
    return response.data;
  }
};

export default khataService;
