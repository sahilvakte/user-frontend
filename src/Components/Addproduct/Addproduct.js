import React from "react";
import { useState } from "react";
import axios from "axios";

const Addproduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const addproduct = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:5000/prodapi/addproduct`, {
        name: name,
        desc: desc,
        category: category,
        price: price,
        token:localStorage.getItem('SavedToken')
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
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button onClick={addproduct}>Add Product</button>
    </div>
  );
};

export default Addproduct;
