import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
    createChannel: async function (user, channelName) {
        try {
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid
            };

            const body = {
                name: channelName,
                user_ids: [user.uid]
            };

            const response = await axios.post(`${API_URL}/channels`, body, { headers });
            return response.data;
        } catch (error) {
            console.error("Error creating channel:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                alert(error.response.data.errors);
            }
            return null;
        }
    },

    getChannels: async function (user) {
        try {
            const headers = {
                "access-token": user.accessToken,
                client: user.client,
                expiry: user.expiry,
                uid: user.uid
            };
            const response = await axios.get(`${API_URL}/channels`, { headers });
            return response.data.data; 
        } catch (error) {
            console.error("Cannot get channels:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                alert(error.response.data.errors);
            }
            return [];
        }
    }
};

export default ChannelService;
