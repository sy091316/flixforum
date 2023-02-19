import React , { useState } from 'react';
import { useNavigate } from "react-router";
import "./searchbar.css";
//import image1, { ReactComponent as img1} from "./searchiconwhite.svg";



export const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("clicked enter");
            navigate("/searchResult", {state: {message: searchInput}});
        }
    };


    return (
        <>
       {/* <img src={image1} alt="img1" width="100%" height="100%" /> */}
        <div className = "seach-bar-2"> 
        <form className = "search-bar">
        <input className= "search-bar"
            size="50"
            type="text"
            placeholder="Enter a TV show"
            onChange={handleChange}
            onKeyUp={handleKeyPress}
            value={searchInput} />
        </form>
        </div> 
        </>

    );
} 

export default Search;