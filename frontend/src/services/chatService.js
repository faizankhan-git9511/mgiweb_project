import apiClient from './apiClient';

export const chatService = {
  sendMessage: async (senderId, messageData) => {
    const response = await apiClient.post(`/messages/sender/${senderId}`, messageData);
    return response.data;
  },

  getConversation: async (user1, user2) => {
    const response = await apiClient.get('/messages/conversation', {
      params: { user1, user2 }
    });
    return response.data;
  }
};

export default chatService;
