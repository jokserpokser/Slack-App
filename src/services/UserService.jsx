import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
   getUsers: async function (user) {
      try {
         const headers = {
            "access-token": user.accessToken,
            expiry: user.expiry,
            client: user.client,
            uid: user.uid,
         };

         const response = await axios.get(`${API_URL}/users`, { headers });
         const users = response.data.data;
         return users.filter((user) => user.id >= 4980);
      } catch (error) {
         if (error.response.data.errors) {
            alert(error.response.data.errors);
         }
      }
   },

   signUp: async function (info) {
      if (info.password !== info.password_confirmation) {
         return alert("Passwords do not match!");
      }
      try {
         const response = await axios.post(`${API_URL}/auth/`, info);
         const { data } = response;
         if (data.data) {
            return alert("Account Creation Successful!");
         }
      } catch (error) {
         if (error.response.data.errors) {
            return alert(error.response.data.errors);
         }
      }
   },

   fetchMessages: async function (user, receiverId) {
      const headers = {
         "access-token": user.accessToken,
         expiry: user.expiry,
         client: user.client,
         uid: user.uid,
      };

      try {
         const response = await axios.get(
            `${API_URL}/messages?receiver_id=${receiverId}&receiver_class=User`,
            { headers }
         );

         return response.data.data;
      } catch (error) {
         alert(error.response.data.errors);
      }
   },

   sendMessage: async function (user, id, messageInput) {
      const headers = {
         "access-token": user.accessToken,
         expiry: user.expiry,
         client: user.client,
         uid: user.uid,
      };

      const body = {
         receiver_id: id,
         receiver_class: "User",
         body: messageInput,
      };

      try {
         const response = await axios.post(`${API_URL}/messages`, body, {headers});
         
         if (response.data.data) {
            console.log("Message Sent: ");
            return response.data;
         }
      } catch (error) {
         console.log("Error: Message not Sent from UserService");
      }
   },
};

export default UserService;
