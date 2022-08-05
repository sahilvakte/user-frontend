import React from "react";
import "../Signup/Signup.css";

import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const asd = async (e) => {
    e.preventDefault();

    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      phone === "" ||
      password === ""
    ) {
      return setShowValidation(true);
    }

    if (fname.length < 5) {
      return setShowValidation(true);
    }
    if (lname.length < 5) {
      return setShowValidation(true);
    }

    if (!isValidEmail(email)) {
      return setShowValidation(true);
    }

    if (phone.length < 10) {
      return setShowValidation(true);
    }

    if (password.length < 6) {
      return setShowValidation(true);
    }

    await axios
      .post(`http://localhost:5000/api/register`, {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: password,
      })
      .then((res) => {
        console.log("res", res);
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
      <div className="signup-container-for-store">
        <div className="signup-card-for-store">
          <div>
            <label>First Name : </label>
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            {showValidation && fname.length < 5
              ? showErrorMessage("Length should be greater than 5")
              : null}
          </div>

          <div>
            <label>Last Name : </label>
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            {showValidation && lname.length < 5
              ? showErrorMessage("Length should be greater than 5")
              : null}
          </div>

          <div>
            <label>Email : </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {showValidation && !isValidEmail(email)
              ? showErrorMessage("Invalid Email")
              : null}
          </div>

          <div>
            <label>Phone : </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {showValidation && phone.length < 10
              ? showErrorMessage("Phone Number must contain 6 digits")
              : null}
          </div>

          <div>
            <label>Password : </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showValidation && password.length < 6
              ? showErrorMessage("Password must contain 6 digits")
              : null}
          </div>

          <button onClick={asd}>SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
