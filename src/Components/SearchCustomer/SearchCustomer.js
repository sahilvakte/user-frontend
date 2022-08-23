import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchCustomer() {
  const [customerloading, setCustomerloading] = useState(false);
  const [customerposts, setCustomerposts] = useState([]);
  const [addcustomer, setAddcustomer] = useState([]);
  const [searchInCustomer, setSearchInCustomer] = useState("");
  

  useEffect(() => {
    const loadCustomerposts = async () => {
      setCustomerloading(true);
      const response = await axios.get(
        "http://localhost:5000/customerapi/showcustomer"
      );
      await setCustomerposts(response.data.response);
      await setCustomerloading(false);
    };
    loadCustomerposts();
  }, []);

  const onCustomerClick = (customer) => {
    let found = addcustomer.some((ele) => ele._id === customer._id);

    if (found) {
      return alert("This Customer Already Exists");
    } else {
      return setAddcustomer([...addcustomer, customer]);
    }
  };

  return (
    <div>
      <h3>Search Customer</h3>
      <input
        type="text"
        placeholder="Search Customer"
        onChange={(e) => setSearchInCustomer(e.target.value)}
      />
      {customerloading ? (
        <h4>Customer Loading....</h4>
      ) : (
        customerposts &&
        customerposts.length > 0 &&
        customerposts
          .filter((value) => {
            if (searchInCustomer === "") {
              return value;
            } else if (
              value.firstname.toLowerCase().includes(searchInCustomer.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => (
            <h5
              onClick={() => {
                onCustomerClick(item);
              }}
              key={item.id}
            >
              {item.firstname}
            </h5>
          ))
      )}

      <div>
        Customer Details
        {addcustomer &&
          addcustomer.length > 0 &&
          addcustomer.map((item) => (
            <h5 key={item.id}>
              First Name :{item.firstname}
              <br /> Last Name :{item.lastname}
              <br />
              Email : {item.customeremail}
              <br /> Contact : {item.customerphone}
              <br /> Address :{item.customeraddress}
            </h5>
          ))}
      </div>
    </div>
  );
}

export default SearchCustomer;
