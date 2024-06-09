import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import './UserList.css';

const UserList = ({ channelId, onClose }) => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
        if(users.length <= 0) {
            try {
                const usersInChannel = await UserService.getUsersInChannel(user, channelId);
                setUsers(usersInChannel);
              } catch (error) {
                alert('Error fetching user list');
            }
        }
        console.log(users)
    };

    fetchUsers();
  }, [channelId, user, users]);

  return (
    <div className="user-list-modal">
      <div className="modal-content">
        <h2>Channel Users</h2>
        <ul>
          {users && users.map((person) => (
            <li key={person["user_id"]}>({person["user_id"]})</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserList;
