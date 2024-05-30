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
      <div className="sidebar2-container">
         <h1>Users</h1>
         <div className="userList-container">
            {userListLoading && <span className="loading">Loading...</span>}

            {!userListLoading &&
               userList
                  .slice() 
                  .sort((a, b) => a.email.localeCompare(b.email))
                  .map((person) => {
                     const { email, id } = person;
                     return (
                        <p className="userItem" key={id}>
                           <i className="fa-solid fa-user"></i>
                           {email}
                        </p>
                     );
                  })}
         </div>
      </div>
   );
}
