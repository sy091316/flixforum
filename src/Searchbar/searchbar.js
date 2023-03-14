import React , { useState } from 'react';
import { useNavigate } from "react-router";
import "./searchbar.css";
import searchbar from "./searchbar.png"

// Code for search bar inspired by 
// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js
// https://reactnavigation.org/docs/params/


export const Search = () => {
    // useState to store the search input
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // navigate to the search result page and send over the search input as a message
            navigate("/searchResult", {state: {message: searchInput}});
        }
    };
    return (
        <>
            <div className = "search-bar-icon">
                <img className="searchicon" src={searchbar} /> 
                <input className= "search-bar"
                    size="50"
                    type="text"
                    placeholder="Enter a TV show"
                    onChange={handleChange}
                    onKeyUp={handleKeyPress}
                    value={searchInput}
                />
            </div>
        </>
    );
} 

export default Search;