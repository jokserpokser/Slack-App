import axios from 'axios';
import { API_URL } from "../constants/Constants";

const AddMemberService = {
  addMember: async (user, channelId) => {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid
      };

      const body = {
        id: channelId,
        member_id: user.id
      };

      const response = await axios.post(`${API_URL}/channel/add_member`, body,  { headers });
      return response.data;
    } catch (error) {
        if(error.response.data.errors){
            alert(error.response.data.errors);
        }
    }
  }
};

export default AddMemberService;
