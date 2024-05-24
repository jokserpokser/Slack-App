import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, Outlet } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className="sidebar-container">
      <NavLink className="navbar-item" to="users">
        <i className="fa-solid fa-users"></i><span>Users</span>
      </NavLink>
      <NavLink className="navbar-item" to="messages">
        <i className="fa-solid fa-message"></i><span>Messages</span>
      </NavLink>
      <NavLink className="navbar-item" to="channels">
        <i className="fa-solid fa-tents"></i><span>Channels</span>
      </NavLink>
      <NavLink className="navbar-item" to="profile">
        <i className="fa-solid fa-address-card"></i><span>Profile</span>
      </NavLink>
      <Outlet></Outlet>
    </div>
  );
}
