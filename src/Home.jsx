import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";
  
const Home = () => {
  return (
    <div>
      <h1>Home Page:</h1>
      <br />
      <li>
          {/* Endpoint to route to About component */}
          <Link to="/">Home</Link> <br></br>
          <Link to="/login">Login</Link>
        </li>
    </div>
  );
};
  
export default Home;