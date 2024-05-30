import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
    getUsers: async function (user) {
        try{
            const headers = {
                "access-token": user.accessToken,
                expiry: user.expiry,
                client: user.client,
                uid: user.uid
            }
            
            const response = await axios.get(`${API_URL}/users`, {headers});
            const users = response.data.data;
            return users.filter((user) => user.id >= 4980);
        } catch (error) {
            if(error.response.data.errors){
                alert(error.response.data.errors);
            }
        }
    },

    signUp: async function (info) {
        if (info.password !== info.password_confirmation){
            return alert ("Passwords do not match!");
        }
        try {
            const response = await axios.post(`${API_URL}/auth/`, info);
            const { data } = response;
            if (data.data) {
                return alert("Account Creation Successful!");
            }
        } catch (error) {
            if (error.response.data.errors){
                return alert(error.response.data.errors);
            }
        }
    }
}

export default UserService;