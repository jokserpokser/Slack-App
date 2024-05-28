import React, { useEffect } from "react";
import "./Sidebar2.css";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { uid, id } = user;
    
    return (
        <div className="sidebar2-container">
            <h1>Profile</h1>
            <div className="userList-container">
                <p>Email: {uid} </p>
                <p>ID: {id} </p>
            </div>
        </div>
    );
}
