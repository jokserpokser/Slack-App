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
                  className={isFocused ? "searchList-container" : "displayNone"}
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
         </div>
      </div>
   );
}
