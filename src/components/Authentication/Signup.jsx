import React from "react";
import "./Login.css";
import logo from '../../assets/slack-logo.png';

export default function Signup({setDisplay}) {
  return (
    
    <div className="main-container">
      <img src={logo} alt="Slack" className="logo-img" />
      <div className="login-form">
        <h1>Create an Account</h1>
        <p className="header2">Create an account and start using Slack now!</p>
        <form action="post">
          <label htmlFor="email">Email</label>
          <br></br>
          <input type="email" required />
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input type="password" required />
          <br></br>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <br></br>
          <input type="password" required />
          <br></br>
          <input type="submit" value="Sign-up" className="login-btn" required />
        </form>
        <button
          className="changeDisplayLogin-btn"
          onClick={() => setDisplay('login')}
        >
          Already have an account? Login!
        </button>
      </div>
    </div>
  );
}
