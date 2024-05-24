import React from "react";
import "./Login.css";
import logo from "../../assets/slack-logo.png";
import { useNavigate } from "react-router-dom";

export default function Login({ setDisplay }) {
  const Navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    Navigate('/dashboard');
  };

  return (
    <div className="main-container">
      <img src={logo} alt="Slack" className="logo-img" />
      <div className="login-form">
        <h1>Sign in to Slack</h1>
        <p className="header2">
          We suggest using the email address you use at work.
        </p>
        <form action="post" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br></br>
          <input type="email" required />
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input type="password" required />
          <br></br>
          <input type="submit" value="Login" className="login-btn" />
        </form>
        <button
          className="changeDisplayLogin-btn"
          onClick={() => setDisplay("signup")}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}
