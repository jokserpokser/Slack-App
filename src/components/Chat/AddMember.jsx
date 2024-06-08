import React, { useState } from 'react';
import AddMemberService from '../../services/AddMemberService';
import './AddMember.css';

const AddMember = ({ channelId, onClose }) => {
  const [userId, setUserId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddMember = async () => {
    try {

      console.log("User:", user);
      console.log("UserId (input)", userId);
      console.log("ChannelId", channelId);

      const response = await AddMemberService.addMember(user, channelId);
      console.log("Response",response);
      if (response) {
        alert('Member added successfully');
        onClose();
      } 
    } catch (error) {
      alert('Error adding member');
      console.log("Error details", error);
    }
  };

  return (
    <div className="add-member-modal">
      <div className="modal-content">
        <h2>Add Member</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
        />
        <div className="modal-buttons">
          <button onClick={handleAddMember}>Add Member</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
