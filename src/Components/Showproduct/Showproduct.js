import React, { useEffect, useState } from "react";

function Showproduct() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/prodapi/showproduct").then((result) => {
      result.json().then((resp) => {
        
        console.warn("result",resp.response)
        setData(resp.response);
      });
    });
  }, []);
  // console.warn(data);

  return (
    <div>
      <h1>Hellllo</h1>
      <table>
        <tr>
          <td>Name</td>
          <td>Description</td>
          <td>Category</td>
          <td>Price</td>
        </tr>
        {data.map((item) => 
          <tr>
            <td>{item.name}</td>
            <td>{item.desc}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default Showproduct;
