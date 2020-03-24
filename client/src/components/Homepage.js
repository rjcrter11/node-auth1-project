import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")

      .then((res) => {
        console.log("get users successful", res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="homepage-container">
      <h2>Placeholder for users</h2>
      <h3>Welcome !</h3>
    </div>
  );
};

export default Homepage;
