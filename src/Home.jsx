import React, { useState, useContext } from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { useNavigate } from "react-router";
import CategoryContext from "./CategoryContext";
import Search from './searchbar';
import './Home.css';

/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */



const Home = () => {
  const {loginStatus, setLoginStatus} = useContext(CategoryContext);
  console.log(loginStatus);

  const curr = localStorage.getItem('member');
  const logout = () => {
    setLoginStatus(false);
    localStorage.removeItem('member');
    console.log(loginStatus);
  };

  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page:</h1>
      
      <br />
      <div classname='App'>
              <Search/>
      </div>
          {/* Endpoint to route to About component */}
          {
            (loginStatus || curr) ?  
              <button type ="button" class = "btn success" onClick={logout}>Log Out</button> : 
              <button type ="button" class = "btn success" onClick={() => navigate("/login")}>Log In</button>
          }
            <button type ="button" class = "btn info" onClick={() => navigate("/forum")}>forums</button>
    </div>
  );
};
  
export default Home;