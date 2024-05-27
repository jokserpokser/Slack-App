import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Navigate("/");
  }
  return (
    <div className="sidebar-container">
      <NavLink className="navbar-item topmargin" to="users">
        <i className="fa-solid fa-users"></i><span>Users</span>
      </NavLink>
      <NavLink className="navbar-item" to="messages">
        <i className="fa-solid fa-message"></i><span>DMs</span>
      </NavLink>
      <NavLink className="navbar-item" to="channels">
        <i className="fa-solid fa-tents"></i><span>Channels</span>
      </NavLink>
      <NavLink className="navbar-item" to="profile">
        <i className="fa-solid fa-address-card"></i><span>Profile</span>
      </NavLink>
      <button className="navbar-item logout" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i><span>Logout</span></button>
      <Outlet></Outlet>
    </div>
  );
}
