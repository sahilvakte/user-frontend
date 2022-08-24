import React from "react";
import { useState } from "react";
import axios from "axios";

const ManualCustomer = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [customeremail, setCustomeremail] = useState("");
  const [customerphone, setCustomerphone] = useState("");
  const [customeraddress, setCustomeraddress] = useState("");

  const [validation, setValidation] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const addcustomer = async (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      customeremail === "" ||
      customerphone === "" ||
      customeraddress === ""
    ) {
      return setShowValidation(true);
    }

    if (firstname.length < 5) {
      return setShowValidation(true);
    }
    if (lastname.length < 5) {
      return setShowValidation(true);
    }

    if (!isValidEmail(customeremail)) {
      return setShowValidation(true);
    }

    if (customerphone.length < 10) {
      return setShowValidation(true);
    }

    if (customerphone.length < 6) {
      return setShowValidation(true);
    }

    await axios
      .post(`http://localhost:5000/customerapi/addcustomer`, {
        firstname: firstname,
        lastname: lastname,
        customeremail: customeremail,
        customerphone: customerphone,
        customeraddress: customeraddress,
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
      <h3>Add New Customer</h3>
      <div>
        <label>First Name : </label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        {showValidation && firstname.length < 5
          ? showErrorMessage("Length should be greater than 5")
          : null}
      </div>
      <div>
        <label>Last Name : </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        {showValidation && lastname.length < 5
          ? showErrorMessage("Length should be greater than 5")
          : null}
      </div>
      <div>
        <label>Customer Email : </label>
        <input
          type="text"
          value={customeremail}
          onChange={(e) => setCustomeremail(e.target.value)}
        />
          {showValidation && !isValidEmail(customeremail)
              ? showErrorMessage("Invalid Email")
              : null}
      </div>
      <div>
        <label>Customer Phone : </label>
        <input
          type="text"
          value={customerphone}
          onChange={(e) => setCustomerphone(e.target.value)}
        />
        {showValidation && customerphone.length < 5
          ? showErrorMessage("Length should be greater than 5")
          : null}
      </div>
      <div>
        <label>Customer Address : </label>
        <input
          type="text"
          value={customeraddress}
          onChange={(e) => setCustomeraddress(e.target.value)}
        />
        {showValidation && customeraddress.length < 5
          ? showErrorMessage("Length should be greater than 5")
          : null}
      </div>

      <button onClick={addcustomer}>Add Customer Manually</button>
    </div>
  );
};

export default ManualCustomer;
