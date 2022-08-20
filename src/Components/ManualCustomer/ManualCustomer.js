import React from 'react'
import { useState } from "react";
import axios from "axios";

const ManualCustomer = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [customeremail, setCustomeremail] = useState("");
  const [customerphone, setCustomerphone] = useState("");
  const [customeraddress, setCustomeraddress] = useState("");
 

  const addcustomer = async (e) => {
    e.preventDefault();

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

  return (
    <div>
        <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
        <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
        <div>
        <label>Customer Email</label>
        <input
          type="text"
          value={customeremail}
          onChange={(e) => setCustomeremail(e.target.value)}
        />
      </div>
        <div>
        <label>Customer Phone</label>
        <input
          type="text"
          value={customerphone}
          onChange={(e) => setCustomerphone(e.target.value)}
        />
      </div>
        <div>
        <label>Customer Address</label>
        <input
          type="text"
          value={customeraddress}
          onChange={(e) => setCustomeraddress(e.target.value)}
        />
      </div>
      
      
      <button onClick={addcustomer}>Add Customer Manually</button>
    </div>
  )
}

export default ManualCustomer