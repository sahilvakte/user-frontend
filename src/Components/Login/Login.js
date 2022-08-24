import React from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  // const isValidEmail = (email) => {
  //   return /\S+@\S+\.\S+/.test(email);
  // };

  const login = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      return setShowValidation(true);
    }

    if (username !== username) {
      return setShowValidation(true);
    }
    // if (password.length < 5) {
    //   return setShowValidation(true);
    // }
      navigate("/morder");

    await axios
      .post(`http://localhost:5000/api/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("res", res);
        const { token } = res.data;
        localStorage.setItem("SavedToken", token);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const showErrorMessage = (msg) => {
    return (
      <>
        <div>{msg}</div>
      </>
    );
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
            {showValidation && username === username
              ? showErrorMessage("Incorrect Email ID")
              : null}
          </div>

          <div>
            <label>Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showValidation && password === password
              ? showErrorMessage("Incorrect Password")
              : null}
          </div>
          {/* <Link to="/morder"> */}
          <button onClick={login}>Login</button>
          {/* </Link> */}
        </div>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
