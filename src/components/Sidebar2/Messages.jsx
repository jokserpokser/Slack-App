import React, { useEffect, useState } from "react";
import "./Sidebar2.css";
import UserService from "../../services/UserService";
import { SearchCategory } from "semantic-ui-react";

export default function Messages() {
   const [searchedUser, setSearchedUser] = useState("");
   const [selectedUser, setSelectedUser] = useState("");
   const [userList, setUserList] = useState([]);
   const [messages, setMessages] = useState([]);
   const [userListLoading, setUserListLoading] = useState(true);

   const [isFocused, setIsFocused] = useState(false);

   const [receiverId, setReceiverId] = useState(1);
   const [messageInput, setMessageInput] = useState("");

   const [fetchFlag, setFetchFlag] = useState(true);

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

      async function fetchMessages() {
         if (!fetchFlag) {
            try {
               const msg = await UserService.fetchMessages(user, receiverId);
               setMessages(msg);
            } catch (error) {
               alert("Cannot Fetch Messages: Messages.jsx");
            } finally {
               setFetchFlag(true);
               console.log(messages);
            }
         }
      }

      fetchMessages();
   });

   const handleSearchUser = (event) => {
      setSearchedUser(event.target.value);
   };

   const handleSelectUser = (event) => {
      const email = event.currentTarget.getAttribute("data-email");
      const selectedId = event.currentTarget.getAttribute("data-id");
      setReceiverId(selectedId);
      setSearchedUser(email);
      setSelectedUser(email);
      setFetchFlag(false);
   };

   const handleSendMessage = async (e) => {
      e.preventDefault();
      try {
         await UserService.sendMessage(user, receiverId, messageInput);
         setMessageInput("");
         setFetchFlag(false);
      } catch (error) {
         alert("Message not sent");
      }
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
                              const { email, id } = person;
                              return (
                                 <button
                                    className="searchUser-item"
                                    key={index}
                                    onClick={handleSelectUser}
                                    data-email={email}
                                    data-id={id}
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
                           <button
                              className="userItem"
                              onClick={handleSelectUser}
                              data-email={email}
                              data-id={id}
                              key={id}
                           >
                              <i className="fa-solid fa-message"></i>
                              {email}
                           </button>
                        );
                     })}
               </div>
            </div>
         </div>
         <div className="chatBox-container">
            {selectedUser && (
               <>
                  <div className="chatMessages-container">
                     <h6>{selectedUser}</h6>
                     {!fetchFlag && <p className="loading">Loading Messages</p>}
                     {fetchFlag &&
                        messages &&
                        messages.map((msgs, index) => {
                           return (
                              <div
                                 key={index}
                                 className={
                                    user.uid === msgs.sender.uid
                                       ? "mapMessages-user-container"
                                       : "mapMessages-receiver-container"
                                 }
                              >
                                 <span className="currentUser">
                                    {msgs.sender.uid}
                                 </span>
                                 <p>
                                    <span
                                       className={
                                          user.uid === msgs.sender.uid
                                             ? "messageUser"
                                             : "messageReceiver"
                                       }
                                    >
                                       {msgs.body}
                                    </span>
                                 </p>
                              </div>
                           );
                        })}

                     {!messages && <p>No messages to show</p>}
                  </div>
                  <div className="chatInput-container">
                     <div className="chatInput2-container">
                        <form onSubmit={handleSendMessage}>
                           <input
                              type="text"
                              onChange={(e) => setMessageInput(e.target.value)}
                              value={messageInput}
                           />
                           <input type="submit" value="Send" />
                        </form>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
