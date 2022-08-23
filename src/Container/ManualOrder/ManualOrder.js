import React, { useEffect, useState } from "react";
import axios from "axios";
import "../ManualOrder/ManualOrder.css";

const ManualOrder = () => {
  // SEARCH PRODUCT START
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [orderproduct, setOrderproduct] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/prodapi/showproduct"
      );
      await setPosts(response.data.response);
      await setLoading(false);
    };
    loadPosts();
  }, []);

  const onProductClick = (product) => {
    let found = orderproduct.some((ele) => ele._id === product._id);

    const newProduct = {
      name: product.name,
      category: product.category,
      price: product.price,
      qty: 1,
      _id: product._id,
    };

    if (found) {
      return alert("Product Already Exists");
    } else {
      return setOrderproduct([...orderproduct, newProduct]);
    }
  };

  const onIncrement = (item, index) => {
    // console.log("index", index);
    let newArr = [...orderproduct];
    newArr[index].qty = newArr[index].qty ? newArr[index].qty + 1 : 2;
    setOrderproduct(newArr);
    // console.log("orderproduct", newArr);
  };

  const onDecrement = (item, index) => {
    // console.log("index", index);
    let newArr = [...orderproduct];
    if (newArr[index].qty === 1) {
      return setOrderproduct(newArr.filter((val,i)=> i !== index ))
    } else {
      newArr[index].qty = newArr[index].qty ? newArr[index].qty - 1 : 0;
      return setOrderproduct(newArr);
    }

    // console.log("orderproduct", newArr);
  };

  // SEARCH PRODUCT END

  // SEARCH CUSTOMER START

  const [customerloading, setCustomerloading] = useState(false);
  const [customerposts, setCustomerposts] = useState([]);
  const [addcustomer, setAddcustomer] = useState(null);
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
    setAddcustomer(customer);
  };

  // const onCustomerClick = (customer) => {
  //   let found = addcustomer.some((ele) => ele._id === customer._id);

  //   if (found) {
  //     return alert("This Customer Already Exists");
  //   } else {
  //     return setAddcustomer([...addcustomer, customer]);
  //   }
  // };

  // SEARCH CUSTOMER END

  // MANUALLY CUSTOMER ADDING START

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [customeremail, setCustomeremail] = useState("");
  const [customerphone, setCustomerphone] = useState("");
  const [customeraddress, setCustomeraddress] = useState("");

  const addcustomermanually = async (e) => {
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

  // MANUALLY CUSTOMER ADDING END

  // ORDER PLACED START

  const totalamount = orderproduct.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue.qty * currentValue.price;
  },
  0);
  const [userId, setUserId] = useState("");
  const [customerid, setCustomerid] = useState("");

  const placeorder = () => {
    const form = {
      firstname: addcustomer.firstname,
      lastname: addcustomer.lastname,
      customeremail: addcustomer.customeremail,
      customerphone: addcustomer.customerphone,
      customeraddress: addcustomer.customeraddress,
      orderitem: orderproduct,
      totalamount: totalamount,
      token: localStorage.getItem("SavedToken"),
      customerid: addcustomer._id,
    };
    axios.post("http://localhost:5000/orderapi/addorder", form);
  };

  return (
    <div>
      <div className="order-manual-container">
        <div>
          {/* <SearchProduct /> */}
          <div>
            <h3>Search Product</h3>
            <input
              type="text"
              placeholder="Search Product"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            {loading ? (
              <h4>Loading....</h4>
            ) : (
              posts &&
              posts.length > 0 &&
              posts
                .filter((value) => {
                  if (searchTitle === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchTitle.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((item) => (
                  <h5
                    onClick={() => {
                      onProductClick(item);
                    }}
                    key={item.id}
                  >
                    {item.name}
                  </h5>
                ))
            )}

            <div>
              Selected Product For Order
              {orderproduct &&
                orderproduct.length > 0 &&
                orderproduct.map((item, index) => (
                  <h5 key={item.id}>
                    Name :{item.name}
                    <br />
                    Price : {item.price}
                    <br /> Description : {item.desc}
                    <br /> Category :{item.category}
                    <div className="quantity-controlling">
                      <div>
                        <button onClick={() => onDecrement(item, index)}>
                          -
                        </button>
                      </div>
                      {item.qty ? item.qty : 1}
                      <div>
                        <button onClick={() => onIncrement(item, index)}>
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      Total Price :{" "}
                      {item.qty ? item.price * item.qty : item.price}
                    </div>
                  </h5>
                ))}
            </div>
            <div>Total Amount : {totalamount}</div>
          </div>
        </div>

        <div>
          {/* <SearchCustomer /> */}
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
                    value.firstname
                      .toLowerCase()
                      .includes(searchInCustomer.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((customeritem) => (
                  <h5
                    onClick={() => {
                      onCustomerClick(customeritem);
                    }}
                    key={customeritem.id}
                  >
                    {customeritem.firstname}
                  </h5>
                ))
            )}

            <div>
              Customer Details
              {addcustomer ? (
                <h5 key={addcustomer.id}>
                  First Name :{addcustomer.firstname}
                  <br /> Last Name :{addcustomer.lastname}
                  <br />
                  Email : {addcustomer.customeremail}
                  <br /> Contact : {addcustomer.customerphone}
                  <br /> Address :{addcustomer.customeraddress}
                </h5>
              ) : null}
              {/* {addcustomer &&
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
                ))} */}
            </div>
          </div>
        </div>

        <div>
          {/* <ManualCustomer /> */}
          <div>
            <h3>Add New Customer</h3>
            <div>
              <label>First Name : </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label>Last Name : </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label>Customer Email : </label>
              <input
                type="text"
                value={customeremail}
                onChange={(e) => setCustomeremail(e.target.value)}
              />
            </div>
            <div>
              <label>Customer Phone : </label>
              <input
                type="text"
                value={customerphone}
                onChange={(e) => setCustomerphone(e.target.value)}
              />
            </div>
            <div>
              <label>Customer Address : </label>
              <input
                type="text"
                value={customeraddress}
                onChange={(e) => setCustomeraddress(e.target.value)}
              />
            </div>

            <button onClick={addcustomermanually}>Add Customer Manually</button>
          </div>
        </div>

        <div>
          <button onClick={placeorder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default ManualOrder;
