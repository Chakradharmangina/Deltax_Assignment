import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function WelocomePage() {
  const navigate = useNavigate();
  const [username, setuser] = useState("");
  const [emial, setemail] = useState("");
  function handlechange(e, i) {
    e.preventDefault();
    if (i == "email") {
      setemail(e.target.value);
    }
    if (i == "username") {
      setuser(e.target.value);
    }
  }
  function handlehomepage(e) {
    e.preventDefault();
    if (username && emial) {
      navigate(`/home`);
      localStorage.setItem("username", username);
    } else {
      window.alert("some fields are missing");
    }
  }
  return (
    <body>
      <div class="loginform">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={(e) => handlechange(e, "email")}
        />
        <br />
        <input
          type="text"
          name="uname"
          placeholder="username"
          onChange={(e) => handlechange(e, "username")}
        />
        <br />
        <button class="btn btn-success" onClick={(e) => handlehomepage(e)}>
          Login
        </button>
      </div>
    </body>
  );
}

export default WelocomePage;
