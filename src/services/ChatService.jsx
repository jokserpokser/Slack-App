import axios from 'axios';
import { API_URL } from "../constants/Constants";


const ChatService = {
    sendMessage: async (user, newMessage, channelId) => {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid
            };

            const body = {
                receiver_id: channelId,
                receiver_class: "Channel",
                body: newMessage,
            }
            const response = await axios.post(`${API_URL}/messages`, body, { headers });
            return response.data;
        } catch (error) {
            if(error.response.data.errors){
                alert(error.response.data.errors);
            }
        }
    },

    fetchMessages: async (user, channelId) => {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid
            };

            const body = {
                receiver_id: channelId,
                receiver_class: "Channel"
            }
            const response = await axios.get(`${API_URL}/messages?receiver_id=${channelId}&receiver_class=${body.receiver_class}`, { headers });
            return response.data;
        } catch (error) {
            // if(error.response.data.errors){
            //     alert(error.response.data.errors);
            // }
            alert("Failed to fetch messages")
        }
        
    }
};

export default ChatService;