import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../redux/chatSlice";
import "./Chat.css";
import ChatService from "../../services/ChatService";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MailIcon from '@mui/icons-material/Mail';
import AddMember from './AddMember';
import UserList from './UserList';
import AddIcon from '@mui/icons-material/Add';


const Chat = () => {
   const dispatch = useDispatch();
   const { selectedChannel, messages } = useSelector((state) => state.chat);
   const user = JSON.parse(localStorage.getItem("user"));
   const [newMessage, setNewMessage] = useState("");
   const [chatFlag, setChatFlag] = useState(false);
   const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
   const [listMemberOpen, setlistMemberOpen] = useState(false);
   

   useEffect(() => {
      const getMessages = () => {
         if (selectedChannel) {
            console.log(selectedChannel.id);
            dispatch(fetchMessages(user, selectedChannel.id));
         }
      };

      if (chatFlag === false) {
         getMessages();
         setChatFlag(true);
      }
   }, [chatFlag, user, selectedChannel, dispatch]);

   const handleSendMessage = async () => {
      if (!newMessage.trim()) return;
      if (selectedChannel) {
         try {
            await ChatService.sendMessage(user, newMessage, selectedChannel.id);
            dispatch(fetchMessages(selectedChannel.id));
            setNewMessage("");
         } catch (error) {
            alert("Error sending message");
         }
      }
   };

   const handleToggleAddMember = () => {
      setIsAddMemberOpen(!isAddMemberOpen);
   };

   const handleToggleListMembers = () => {
      setlistMemberOpen(!listMemberOpen);

   };

   const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
   };

   return (
      <div className="chat-container">
         {selectedChannel && (
          <>
            <div className="chat-header">
               <div className="headerLeft">
                  <MailIcon />
                  {selectedChannel ? selectedChannel.name : "Select a channel"}
               </div>
            <div className="headerRight">
                  <button className="add-member-button" onClick={handleToggleAddMember}>
                     <AddIcon />
                  </button>
            
                  <button className="userlist-button" onClick={handleToggleListMembers}>
                     <PeopleAltIcon />
                  </button>
            </div>
             </div>
         <div className="chat-box">
            {messages.data &&
               messages.data.map((msg, index) => (
                     <div key={index} className={user.uid === msg.sender.uid ? "mapMessages-user-container" : "mapMessages-receiver-container"}>
                         <span className="currentUser">
                            {msg.sender.uid}
                         </span>
                        <p className="message-body-content">{msg.body}</p>
                        <span className="timestamp">{formatTimestamp(msg["created_at"])}</span>
                     </div>
               ))}
         </div>
         <div className="chat-input">
            <input
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
         </div>
         {listMemberOpen && (
            <UserList channelId={selectedChannel.id} onClose={handleToggleListMembers} />
         )}
         {isAddMemberOpen && (
            <AddMember channelId={selectedChannel.id} onClose={handleToggleAddMember} />
         )}
         </>
         )}
         
      </div>
   );
};

export default Chat;
