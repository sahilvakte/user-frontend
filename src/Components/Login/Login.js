import React from "react";
import "../Login/Login.css";

import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/api/login`, {
        username: username,
        password: password,
      })
      .then((res) => {

        console.log("res", res);
        const {token} = res.data
        localStorage.setItem("SavedToken", token);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <div className="user-login-container">
        <div className="user-login-card">
          <div>
            <label>Email or Phone</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
