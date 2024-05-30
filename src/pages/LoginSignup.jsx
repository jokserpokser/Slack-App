import React, { useEffect } from "react";
import { useState } from "react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from "react-router";

export default function LoginSignup() {
  const [display, setDisplay] = useState("login");
  const Navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    if (status === "true"){
      Navigate('/dashboard');
    }
  });

  return (
    <div>
      {display === "login" && (
        <Login
          setDisplay={setDisplay}
        />
      )}
      {display === "signup" && (
        <Signup setDisplay={setDisplay} />
      )}
    </div>
  );
}
