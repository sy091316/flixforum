import React, { useState, useContext } from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { useNavigate } from "react-router";
import CategoryContext from "../CategoryContext";
import Search from '../Searchbar/searchbar';
import './Home.css';
import Logo from "../Logo/logo";

/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */
const Home = () => {
  const curr = localStorage.getItem('member');
  const logout = () => {
    localStorage.removeItem('member');
    navigate("/")
  };

  const navigate = useNavigate();
  return (
    <>
      <div className = 'homepage'>
        <div className = 'logo'>
          <Logo/> </div>
          <br />
          <div className = "search-and-login">
            <div className='search-bar'>
                    <Search/>
            </div>
            <div className = "login-buttons">
              {/* Login/Logout button based on if the user's logged in status */}
                {/* Endpoint to route to About component */}
                {
                  (curr) ?  
                    <button type="button" className="btn success" onClick={logout}>Log Out</button> : 
                    <button type="button" className="btn success" onClick={() => navigate("/login")}>Log In</button>
                }
            </div>
          </div>
      </div>
    </>
  );
};
  
export default Home;