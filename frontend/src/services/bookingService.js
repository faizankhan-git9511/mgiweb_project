import apiClient from './apiClient';

export const bookingService = {
  createBooking: async (employerId, bookingData) => {
    const response = await apiClient.post(`/bookings/employer/${employerId}`, bookingData);
    return response.data;
  },

  getBookingsByWorker: async (workerId) => {
    const response = await apiClient.get(`/bookings/worker/${workerId}`);
    return response.data;
  },

  getBookingsByEmployer: async (employerId) => {
    const response = await apiClient.get(`/bookings/employer/${employerId}`);
    return response.data;
  },

  updateBookingStatus: async (id, status) => {
    const response = await apiClient.patch(`/bookings/${id}/status`, null, { params: { status } });
    return response.data;
  }
};

export default bookingService;
