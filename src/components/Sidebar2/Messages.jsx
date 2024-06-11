import React, { useEffect, useState, useRef } from "react";
import "./Sidebar2.css";
import UserService from "../../services/UserService";
import { FiberManualRecord } from '@mui/icons-material';

export default function Messages() {
   const [searchedUser, setSearchedUser] = useState("");
   const [selectedUser, setSelectedUser] = useState("");
   const [userList, setUserList] = useState([]);
   const [messages, setMessages] = useState([]);
   const [userListLoading, setUserListLoading] = useState(true);
   const [filteredUsers, setFilteredUsers] = useState([]);

   const [isFocused, setIsFocused] = useState(false);

   const [receiverId, setReceiverId] = useState(1);
   const [messageInput, setMessageInput] = useState("");

   const [fetchFlag, setFetchFlag] = useState(true);
   const [filteredUsersFlag, setFilteredUsersFlag] = useState(false);

   const user = JSON.parse(localStorage.getItem("user"));
   const chatContainerRef = useRef(null);

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
            }
         }
      }

      async function fetchAllMessages() {
         if (!filteredUsersFlag) {
            try {
               const responseArray = await UserService.fetchAllMessages(user);
               setFilteredUsersFlag(true);
               setFilteredUsers(responseArray);
            } catch (error) {
               console.log("FetchAllMessages function Failed");
            }
         }
      }

      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
      }

      // fetchAllMessages();
      fetchMessages();
   }, [
      fetchFlag,
      filteredUsersFlag,
      receiverId,
      user,
      userList.length,
      messages,
   ]);

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
         // if (!filteredUsers.includes(receiverId)) {
         //    setFilteredUsersFlag(false);
         // }
      } catch (error) {
         alert("Message not sent");
      }
   };

   const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
   };

   return (
      <div className="messages-container">
         <div className="sidebar2-container">
            {/* <MessageComponent /> */}
            <h1>Messages</h1>
            <div className="userList-container">
               <span className="email-header">
                     <h3 className="bold">{user.uid}</h3>
                     <p>#{user.id} <FiberManualRecord style={{color:"green", fontSize: "0.8rem"}} /> </p>
               </span>

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
                  {/* {filteredUsersFlag &&} */}
                  {userList
                     .slice()
                     .filter((indiv) => {
                        return indiv;
                        // return filteredUsers.includes(indiv.id);
                     })
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
                  <div
                     className="chatMessages-container"
                     ref={chatContainerRef}
                  >
                     <h6>{selectedUser}</h6>
                     {!messages && <p className="loading">Loading Messages</p>}
                     {messages &&
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
                                 <span className="time-stamp">
                                    {formatTimestamp(msgs["created_at"])}
                                 </span>
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
