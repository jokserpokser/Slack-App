import React, { useState } from 'react';
import AddMemberService from '../../services/AddMemberService';
import './AddMember.css';

const AddMember = ({ channelId, onClose }) => {
  const [newUserId, setNewUserId] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddMember = async () => {
    try {
      
      await AddMemberService.addMember(user, channelId, newUserId);
       onClose();
    } catch (error) {
      alert('Error adding member');
    }
  };

  return (
    <div className="add-member-modal">
      <div className="modal-content">
        <h2>Add Member</h2>
        <input className='add-member-input'
          type="text"
          value={newUserId}
          onChange={(e) => setNewUserId(e.target.value)}
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
