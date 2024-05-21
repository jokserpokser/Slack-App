import React from "react";
import "./Login.css";

export default function Login({ setDisplay }) {
  return (
    <div className="main-container">
      <div className="login-form">
        <h1>Sign in to Slack</h1>
        <p className="header2">
          We suggest using the email address you use at work.
        </p>
        <form action="post">
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
          onClick={() => setDisplay(false)}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}
