import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Channels from "../components/Sidebar2/Channels";
import Messages from "../components/Sidebar2/Messages";
import Users from "../components/Sidebar2/Users";
import Profile from "../components/Sidebar2/Profile";
import Header from "../components/Header/Header";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Users />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="messages" element={<Messages />}></Route>
          <Route path="channels" element={<Channels />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
