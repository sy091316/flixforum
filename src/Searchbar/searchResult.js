import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import Search from './searchbar';
import "./searchbar.css";
import Logo from "../Logo/logo";
import "./searchResult.css"

// MAJORITY OF CODE COMES FROM THIS VIDEO FOR DISPLAYING THE SHOWS
// https://www.youtube.com/watch?v=FzWG8jiw4XM&ab_channel=LamaDev
function SearchResult() {
    // grad the search bar input and store it in a the query variable
    const result = useLocation();
    let query = ''
    if (result.state) {
        // console.log(JSON.stringify(result.state.message))
        query = JSON.stringify(result.state.message)
    };

    // note: the code below is almost the same code as the showcard.js code except for the change
    // where the API fetch call now has the query concatenated in it to only display certain shows

    // list to display the shows
    const [list, setList] = useState([]);
 
    // handles updating the position of the shows cards
    const showRef = useRef();
    const navigate = useNavigate();
    // useEffect is used to get the shows but not repeatedly unless this page
    // is navigated to
    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query='+ query + '&limit_titles=5&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        // grabs only the titles from the json file
        .then((json) => {
            const convert_list = json.titles;
            setList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, [query]);

    return(
        <div className="list">
            <div className = "logo-searchbar">
                <Logo/>
                <div className='searchreseults-bar'>
                        <Search/>
                </div>
            </div>
            <br></br> 
            <div className="search-result-title"> Search Results:</div>
            <br></br>
            <div className="wrapper">
                <div className="container" ref={showRef}>
                    {list.map((show) => (
                        show.summary.type === 'show' ?
                        <div className="Searched-Shows" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
                                <CardActionArea  onClick={
                                        () => {
                                            localStorage.setItem('showID', JSON.stringify(show.summary.id));
                                            localStorage.setItem('title', JSON.stringify(show.jawSummary.title));
                                            localStorage.setItem('showImage', show.jawSummary.backgroundImage.url);
                                            localStorage.setItem('season', "");
                                            localStorage.setItem('episode', "");
                                            navigate("/forum");
                                        }
                                    }>
                                    <CardMedia
                                        component="img"
                                        image={show.jawSummary.backgroundImage.url}
                                        height='120'
                                        alt="show image"
                                    />
                                    <CardContent>
                                        <Typography 
                                            gutterBottom variant="subtitle1" 
                                            sx={{color: "white", fontSize: "18px", fontWeight:700, align:'left', fontFamily:"Arial"}}>
                                            {show.jawSummary.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        : null
                    ))}
                </div>
            </div>
        </div>
    );

}

export default SearchResult;