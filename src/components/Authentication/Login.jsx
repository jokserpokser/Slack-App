import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/slack-logo.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../constants/Constants";

export default function Login({ setDisplay }) {
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();


   const Navigate = useNavigate();
   const handleLogin = async (event) => {
      event.preventDefault();
      if (!email || !password) {
         return alert("Please input your Login Credentials");
      }

      try {
         const loginCredentials = {
            email,
            password,
         };

         const response = await axios.post(
            `${API_URL}/auth/sign_in`,
            loginCredentials
         );
         const { data, headers } = response;

         if (data && headers) {
            const accessToken = headers["access-token"];
            const client = headers.client;
            const expiry = headers.expiry;
            const uid = headers.uid;

            const necessaryData = {
               accessToken,
               client,
               expiry,
               uid,
               id: data.data.id,
            };

            localStorage.setItem("user", JSON.stringify(necessaryData));
            localStorage.setItem("isLoggedIn", "true");
            Navigate("/dashboard");
         }
      } catch (error) {
         if (error.response.data.errors) {
            return alert(error.response.data.errors);
         }
      }
   };

   return (
      <div className="main-container">
         <img src={logo} alt="Slack" className="logo-img" />
         <div className="login-form">
            <h1>Sign in to Slack</h1>
            <p className="header2">
               We suggest using the email address you use at work.
            </p>
            <form onSubmit={handleLogin}>
               <label>Email</label>
               <br></br>
               <input
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
               />
               <br></br>
               <label>Password</label>
               <br></br>
               <input
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
               />
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
