import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import "./ShowCard.css";
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from "@material-ui/icons";

// MAJORITY OF CODE COMES FROM THIS VIDEO FOR DISPLAYING THE SHOWS
// https://www.youtube.com/watch?v=FzWG8jiw4XM&ab_channel=LamaDev
// Right/Left Arrow UI 
// https://www.youtube.com/watch?v=FzWG8jiw4XM 
// https://www.tabnine.com/code/javascript/classes/react-icons/MdChevronRight
// API comes from
// https://rapidapi.com/herosAPI/api/netflix-data/ 
function ShowCard() {
    // holds the list of any Netflix show grabbed from the API
    const [list, setList] = useState([]);
    // handles how far you scroll through list of shows
    const [listPos, setListPos] = useState(0);
    // holds the Netflix shows with > 1 season
    const [seasonList, setSeaList] = useState([]);
    // handles the positioning of the shows when navigating for > 1 season
    const [seasonPos, setSeaPos] = useState(0);
    // holds the Netflix shows with A in the title
    const [showAList, setShowAList] = useState([]);
    // handles the positioning of the shows when navigating shows with A
    const [showAPos, setShowAPos] = useState(0);
    const [movieList, setMovieList] = useState([]);
    const [moviePos, setMoviePos] = useState(0);
    // handles updating the position of the shows cards
    const showRef = useRef();
    const seasonRef = useRef();
    const showARef = useRef();
    const movieRef = useRef();
    // navigates to different pages of the application
    const navigate = useNavigate();

    // handles the arrow usage for moving show card
    const handleClick = (direction, pos, setPos, ref) => {
        // holds the distance to travel between each show card when button is clicked
        let distance = ref.current.getBoundingClientRect().x - 50;
        if (direction === "left" && pos > 0) {
          setPos(pos - 1);
          ref.current.style.transform = `translateX(${275 + distance}px)`;
        }
        if (direction === "right" && pos < 5) {
          setPos(pos + 1);
          ref.current.style.transform = `translateX(${-275 + distance}px)`;
        }
    };
    
    // use this function to render new rows of shows (or movies will need to readjust if so)
    const renderShowCards = (shows) => {
        return (
            <div className="list-cards" key={shows.summary.id}>
                <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
                    <CardActionArea key={shows.summary.id} onClick={ () => {
                                localStorage.setItem('showID', JSON.stringify(shows.summary.id));
                                localStorage.setItem('title', JSON.stringify(shows.jawSummary.title));
                                localStorage.setItem('showImage', shows.jawSummary.backgroundImage.url);
                                localStorage.setItem('season', "");
                                localStorage.setItem('episode', "");
                                navigate("/forum");
                            }
                        }>
                        <CardMedia
                            component="img"
                            image={shows.jawSummary.backgroundImage.url}
                            height='120'
                            alt="show image"
                        />
                        <CardContent>
                            <Typography 
                                gutterBottom variant="subtitle1"
                                sx={{color: "white", fontSize: "18px", fontWeight:700, align:'left', fontFamily:"Arial"}}>
                                {shows.jawSummary.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }

    // useEffect is used to get the shows but not repeatedly unless this page is navigated to
    // updates list with random Netflix shows and shows that have > 1 season
    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=25&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then((json) => {
            const convert_list = json.titles;
            // sets list of Netflix shows grabbed from API
            setList(convert_list);
            setSeaList(convert_list);
            setMovieList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    // used to grab the shows that have A in their name
    useEffect(() => {
        fetch('https://netflix-data.p.rapidapi.com/search/?query=A&limit_titles=18&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then((json) => {
            const convert_list = json.titles;
            // sets the list of Netflix shows with A in title from API
            setShowAList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return(
        <div className="list">
            <div className="recommend"><b>Popular Shows on Netflix</b></div>
            <div className="wrapper">
                <div className="slider arrowboxleft" onClick={()=> handleClick("left", listPos, setListPos, showRef)}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                <div className="container" ref={showRef} >
                    {list.map((show) => (show.summary.type === 'show' ? renderShowCards(show) : null))}
                </div>
                <div className="slider arrowboxright" onClick={() => handleClick("right", listPos, setListPos, showRef)}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
            <div className="recommend"><b>Shows With More than One Season</b></div>
            <div className="wrapper">
                <div className="slider arrowboxleft" onClick={() => handleClick("left", seasonPos, setSeaPos, seasonRef)}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                <div className="container" ref={seasonRef}>
                    {seasonList.map((show) => (show.summary.type === 'show' ? renderShowCards(show) : null))}
                </div>
                <div className="slider arrowboxright" onClick={() => handleClick("right", seasonPos, setSeaPos, seasonRef)}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
            <div className="recommend"><b>Shows A in the Name</b></div>
            <div className="wrapper">
                <div className="slider arrowboxleft" onClick={() => handleClick("left", showAPos, setShowAPos, showARef)}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                <div className="container" ref={showARef}>
                    {showAList.map((show) => (show.summary.type === 'show' ? renderShowCards(show) : null))}
                </div>
                <div className="slider arrowboxright" onClick={() => handleClick("right", showAPos, setShowAPos, showARef)}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
            {/* ADDED MOVIE SECTION, WILL NEED TO UPDATE FORUM PAGE FOR IT TO WORK*/}
            <div className="recommend"><b>Movies</b></div>
            <div className="wrapper">
                <div className="slider arrowboxleft" onClick={()=> handleClick("left", moviePos, setMoviePos, movieRef)}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                <div className="container" ref={movieRef} >
                    {movieList.map((show) => (show.summary.type === 'movie' ? renderShowCards(show) : null))}
                </div>
                <div className="slider arrowboxright" onClick={() => handleClick("right", moviePos, setMoviePos, movieRef)}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
        </div>
    );
}

export default ShowCard;