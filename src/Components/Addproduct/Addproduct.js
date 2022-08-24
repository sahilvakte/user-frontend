import React from "react";
import { useState } from "react";
import axios from "axios";

const Addproduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [validation, setValidation] = useState("");
  const [showValidation, setShowValidation] = useState(false);


    


  const addproduct = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      desc === "" ||
      category === "" ||
      price === "" 
    ) {
      return setShowValidation(true);
    }

    if (name === "") {
      return setShowValidation(true);
    }
    if (desc === "") {
      return setShowValidation(true);
    }

    if (category === "") {
      return setShowValidation(true);
    }

    if (price === "") {
      return setShowValidation(true);
    }

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

  const showErrorMessage = (msg) => {
    return (
      <>
        <div>{msg}</div>
      </>
    );
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
        {showValidation && name === ""
              ? showErrorMessage("Product Name Required")
              : null}
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {showValidation && desc === ""
              ? showErrorMessage("Product Name Required")
              : null}
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {showValidation && price === ""
              ? showErrorMessage("Product Name Required")
              : null}
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {showValidation && category === ""
              ? showErrorMessage("Product Name Required")
              : null}
      </div>
      <button onClick={addproduct}>Add Product</button>
    </div>
  );
};

export default Addproduct;
