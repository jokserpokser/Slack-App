import React, { useEffect, useState } from "react";
import "./Sidebar2.css";
import UserService from "../../services/UserService";

export default function Messages() {
   const [searchedUser, setSearchedUser] = useState("");
   const [userList, setUserList] = useState([]);
   const [userListLoading, setUserListLoading] = useState(true);

   const [isFocused, setIsFocused] = useState(false);

   const user = JSON.parse(localStorage.getItem("user"));
   useEffect(() => {
      async function fetchUsers() {
         try {
            const users = await UserService.getUsers(user);
            setUserList(users);
         } catch (error) {
            alert("Failed to fetch users");
         } finally {
            setUserListLoading(false);
         }
      }

      if (userList.length === 0) {
         fetchUsers();
      }
   });

   const handleSearchUser = (event) => {
      setSearchedUser(event.target.value);
   };

   const handleSelectUser = (event) => {
      const email = event.currentTarget.getAttribute("data-email");
      setSearchedUser(email);
   };

   return (
      <div className="messages-container">
         <div className="sidebar2-container">
            {/* <MessageComponent /> */}
            <h1>Messages</h1>
            <div className="userList-container">
               <label htmlFor="searchUser">Search User</label>
               <input
                  type="text"
                  className="searchUser-input"
                  onFocus={() => {
                     setIsFocused(true);
                  }}
                  onBlur={() => {
                     setTimeout(() => {
                        setIsFocused(false);
                     }, 100);
                  }}
                  onChange={handleSearchUser}
                  value={searchedUser}
               />

               {searchedUser && (
                  <div
                     className={
                        isFocused ? "searchList-container" : "displayNone"
                     }
                  >
                     {userListLoading && <p>Loading</p>}

                     {!searchedUser && (
                        <p style={{ color: `whitesmoke` }}>Type an email</p>
                     )}

                     {!userListLoading &&
                        userList
                           .filter((indiv) => {
                              return indiv.email
                                 .toLowerCase()
                                 .includes(searchedUser.toLowerCase());
                           })
                           .sort((a, b) => a.email.localeCompare(b.email))
                           .map((person, index) => {
                              const { email } = person;
                              return (
                                 <button
                                    className="searchUser-item"
                                    key={index}
                                    onClick={handleSelectUser}
                                    data-email={email}
                                 >
                                    <p>{email}</p>
                                 </button>
                              );
                           })}
                     {!userListLoading &&
                        userList.filter((indiv) => {
                           return indiv.email
                              .toLowerCase()
                              .includes(searchedUser.toLowerCase());
                        }) == "" && (
                           <p style={{ color: `whitesmoke` }}>No matches</p>
                        )}
                  </div>
               )}

               <div className="userListMessages">
                  <h4>Direct Messages</h4>
                  {userListLoading && (
                     <span className="loading">Loading...</span>
                  )}
                  {userList
                     .slice()
                     .sort((a, b) => a.email.localeCompare(b.email))
                     .map((person) => {
                        const { email, id } = person;
                        return (
                           <p className="userItem" key={id}>
                              <i className="fa-solid fa-message"></i>
                              {email}
                           </p>
                        );
                     })}
               </div>
            </div>
         </div>
         <div className="chatBox-container">
            <div className="chatMessages-container">asd</div>
            <div className="chatInput-container">
               <div className="chatInput2-container">
                  <form>
                     <input type="text" />
                     <input type="submit" value="Send" />
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
