import React, { useEffect } from "react";
import "./Sidebar2.css";
import UserService from "../../services/UserService";
import { useState } from "react";

export default function Users() {
   const [userList, setUserList] = useState([]);
   const [userListLoading, setUserListLoading] = useState(true);

   const user = JSON.parse(localStorage.getItem("user"));

   useEffect(() => {
      async function fetchUsers() {
         try {
            const users = await UserService.getUsers(user);
            setUserList(users);
         } catch (error) {
            console.error("Failed to fetch users:", error);
         } finally {
            setUserListLoading(false);
         }
      }

      if (userList.length === 0) {
         fetchUsers();
      }
   });

   return (
      <div className="messages-container">
         <div className="userList-page">
            {userListLoading && <span className="loading">Loading...</span>}
            {!userListLoading && <h4>Users</h4>}
            <div className="userListGrid">
               {!userListLoading &&
                  userList
                     .slice()
                     .sort((a, b) => a.email.localeCompare(b.email))
                     .map((person) => {
                        const { email, id } = person;
                        return (
                           <p className="userItemUsers" key={id}>
                              <i className="fa-solid fa-user"></i>
                              {email}
                           </p>
                        );
                     })}
            </div>
         </div>
      </div>
   );
}
