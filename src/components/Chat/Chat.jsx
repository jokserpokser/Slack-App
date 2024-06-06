import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../redux/chatSlice";
import "./Chat.css";
import ChatService from "../../services/ChatService";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MailIcon from '@mui/icons-material/Mail';

const Chat = () => {
   const dispatch = useDispatch();
   const { selectedChannel, messages } = useSelector((state) => state.chat);
   const user = JSON.parse(localStorage.getItem("user"));
   const [newMessage, setNewMessage] = useState("");
   const [chatFlag, setChatFlag] = useState(false);

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

   return (
      <div className="chat-container">
         <div className="chat-header">
            <div className="headerLeft">
              <MailIcon />
              {selectedChannel ? selectedChannel.name : "Select a channel"}
            </div>
            <div className="headerRight">
              <button className="add-member-button">
                <PeopleAltIcon />
              </button>
            </div>
         </div>
         <div className="chat-box">
            {messages.data &&
               messages.data.map((msg, index) => (
                  <div key={index} className="chat-message">
                     {msg.body}
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
      </div>
   );
};

export default Chat;
