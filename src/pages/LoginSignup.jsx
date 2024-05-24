import React from "react";
import { useState } from "react";
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

export default function LoginSignup() {
  const [display, setDisplay] = useState("login");

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
