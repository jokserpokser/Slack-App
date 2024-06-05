import axios from 'axios';
import { API_URL } from "../constants/Constants";

const getHeaders = (user) => ({
  "access-token": user.accessToken,
  "expiry": user.expiry,
  "client": user.client,
  "uid": user.uid,
});

const ChatService = {
  sendMessage: async (user, newMessage, channelId) => {
    const headers = getHeaders(user);
    const body = {
      receiver_id: channelId,
      receiver_class: "Channel",
      body: newMessage,
    };

    try {
      const response = await axios.post(`${API_URL}/messages`, body, { headers });
      return response.data;
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },

  fetchMessages: async (user, channelId) => {
    const headers = getHeaders(user);
    const body = {
      receiver_id: channelId,
      receiver_class: "Channel",
    };

    try {
      const response = await axios.get(`${API_URL}/messages`, body, { headers });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      throw error;
    }
  },
};

export default ChatService;
