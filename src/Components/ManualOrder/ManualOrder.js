import React, { useEffect, useState } from "react";
import axios from "axios";

function ManualOrder() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
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
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => <h5 key={item.id}>{item.name}</h5>)
      )}
    </div>
  );
}

export default ManualOrder;
