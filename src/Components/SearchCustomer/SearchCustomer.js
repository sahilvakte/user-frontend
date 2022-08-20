import React, { useEffect, useState } from "react";
import axios from "axios";

function SearchCustomer() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [addcustomer, setAddcustomer] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/customerapi/showcustomer"
      );
      await setPosts(response.data.response);
      await setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div>
      <h3>Search Bar</h3>
      <input
        type="text"
        placeholder="search...."
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
              value.firstname.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => (
            <h5
              onClick={() => {
                setAddcustomer([...addcustomer, item]);
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
