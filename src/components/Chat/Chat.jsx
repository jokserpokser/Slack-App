import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../redux/chatSlice";
import AddIcon from "@mui/icons-material/Add";
import "./Chat.css";
import ChatService from "../../services/ChatService";

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
            {selectedChannel ? selectedChannel.name : "Select a channel"}
            <button className="add-member-button">
               Add Member <AddIcon />
            </button>
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
