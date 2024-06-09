import axios from 'axios';
import { API_URL } from "../constants/Constants";

const AddMemberService = {
  addMember: async (user, channelId, newUserId) => {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid
      };

      const body = {
        id: channelId,
        member_id: newUserId
      };

      const response = await axios.post(`${API_URL}/channel/add_member`, body,  { headers });
      if (response.data.errors) {
        alert(response.data.errors);
      } else {
        alert('Member added successfully');
      }
      
    } catch (error) {
        if(error.response.data.errors){
            alert(error.response.data.errors);
        }
    }
  }
};

export default AddMemberService;
