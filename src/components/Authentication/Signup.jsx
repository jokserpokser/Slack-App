import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/slack-logo.png";
import UserService from "../../services/UserService";


export default function Signup({ setDisplay }) {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [password_confirmation, setPasswordConfirmation] = useState();

   const handleSignup = async (event) => {
      event.preventDefault();
      const info = {
        email,
        password,
        password_confirmation
      }

      await UserService.signUp(info);
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      setDisplay("login");
   };

   return (
      <div className="main-container">
         <img src={logo} alt="Slack" className="logo-img" />
         <div className="login-form">
            <h1>Create an Account</h1>
            <p className="header2">
               Create an account and start using Slack now!
            </p>
            <form onSubmit={handleSignup}>
               <label htmlFor="email">Email</label>
               <br></br>
               <input
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
               />
               <br></br>
               <label htmlFor="password">Password</label>
               <br></br>
               <input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  required
               />
               <br></br>
               <label htmlFor="passwordConfirmation">
                  Password Confirmation
               </label>
               <br></br>
               <input
                  type="password"
                  onChange={(event) =>
                     setPasswordConfirmation(event.target.value)
                  }
                  value={password_confirmation}
                  required
               />
               <br></br>
               <input
                  type="submit"
                  value="Sign-up"
                  className="login-btn"
                  required
               />
            </form>
            <button
               className="changeDisplayLogin-btn"
               onClick={() => setDisplay("login")}
            >
               Already have an account? Login!
            </button>
         </div>
      </div>
   );
}
