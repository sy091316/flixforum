import React from "react";
import { useNavigate } from "react-router";
import Search from '../Searchbar/searchbar';
import ShowCard from "../ShowCard/ShowCard";
import Logo from "../Logo/logo";
import './Home.css';

/** Citations
 * Frontend Login Page: https://www.youtube.com/watch?v=Y-XW9m8qOis
 * Backend Login Page: https://www.youtube.com/watch?v=W-sZo6Gtx_E , https://www.youtube.com/watch?v=W8jySpfRUDY 
 */
const Home = () => {
  // grabs the currently logged in member
  const curr = localStorage.getItem('member');
  // handles when user clicks the logout button
  // removes member from local storage
  const logout = () => {
    localStorage.removeItem('member');
    navigate("/")
  };

  const navigate = useNavigate();
  return (
    <>
      <div className = 'homepage'>
        <div className = 'logo'>
          <Logo/> 
        </div>
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
      <ShowCard/>
    </>
  );
};
  
export default Home;