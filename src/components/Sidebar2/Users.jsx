import React, { useEffect } from 'react'
import './Sidebar2.css';
import UserService from "../../services/UserService";
import { useState } from 'react';

export default function Users() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // const users = await UserService.getUsers(user);
      // setUserList(users);
    }
    if(userList.length === 0){
      fetchUsers();
    }
  })
  return (
    <div className='sidebar2-container'>Users</div>
  )
}


