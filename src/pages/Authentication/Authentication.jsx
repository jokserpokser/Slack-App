import React from "react";
import "./Login.css";
import logo from "../../assets/slack-logo.png";

export default function Authentication() {
  return (
    <div>
      <div>
        <img src={logo} alt="Slack" className="logo-img" />
      </div>
      <Login />
    </div>
  );
}
