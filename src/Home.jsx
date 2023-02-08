import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { useNavigate } from "react-router";
import './Home.css';
//Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
//Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page:</h1>
      <br />
          {/* Endpoint to route to About component */}
            <button type ="button" class = "btn success" onClick={() => navigate("/login")}>Log In</button>
    </div>
  );
};
  
export default Home;