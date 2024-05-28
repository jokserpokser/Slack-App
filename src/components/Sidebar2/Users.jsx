import React, { useEffect } from "react";
import "./Sidebar2.css";
import UserService from "../../services/UserService";
import { useState } from "react";

export default function Users() {
    const [userList, setUserList] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        // console.log('Users', user);
        // console.log(user.accessToken)
        async function fetchUsers() {
            const users = await UserService.getUsers(user);
            setUserList(users);
        }
        if (userList.length === 0) {
            fetchUsers();
        }
    }, [user]);

    return (
        <div className="sidebar2-container">
            <h1>Users</h1>
            <div className="userList-container">
                {userList.map((person) => {
                    const { email, id } = person;
                    return (
                        <p className="userItem" key={id}>
                            <i className="fa-solid fa-user"></i>{email}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
