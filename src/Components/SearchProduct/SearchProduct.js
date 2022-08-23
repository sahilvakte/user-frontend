import React, { useEffect, useState } from "react";
import axios from "axios";
import "../SearchProduct/SearchProduct.css";

function SearchProduct() {
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

    if (found) {
      return alert("Product Already Exists");
    } else {
      return setOrderproduct([...orderproduct, product]);
    }
  };

  // console.log("orderproduct", orderproduct);

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

  const asd = orderproduct.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.qty * currentValue.price;
  }, 0);

  console.log("asd", asd, orderproduct);

  return (
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
                  <button onClick={() => onDecrement(item, index)}>-</button>
                </div>
                {item.qty ? item.qty : 1}
                <div>
                  <button onClick={() => onIncrement(item, index)}>+</button>
                </div>
              </div>
              <div>
                Total Price : {item.qty ? item.price * item.qty : item.price}
              </div>
            </h5>
          ))}
        <div></div>
      </div>
    </div>
  );
}

export default SearchProduct;
