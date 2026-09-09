import apiClient from './apiClient';

export const attendanceService = {
  recordAttendance: async (attendanceData) => {
    const response = await apiClient.post('/attendance', attendanceData);
    return response.data;
  },

  getAttendanceByWorker: async (workerId) => {
    const response = await apiClient.get(`/attendance/worker/${workerId}`);
    return response.data;
  },

  getAttendanceByDate: async (date) => {
    const response = await apiClient.get('/attendance/date', { params: { date } });
    return response.data;
  }
};

export default attendanceService;
