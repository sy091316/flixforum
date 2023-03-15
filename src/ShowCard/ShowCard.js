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
    // handles updating the position of the shows cards
    const showRef = useRef();
    const seasonRef = useRef();
    const showARef = useRef();
    // navigates to different pages of the application
    const navigate = useNavigate();
    // handles the arrow buttons for the first row of shows
    const handleClickAny = (direction) => {
        // holds the distance to travel between each show card when
        // button is clicked
        let distance = showRef.current.getBoundingClientRect().x - 50;
        // if left move to shows going left
        if (direction === "left" && listPos > 0) {
            setListPos(listPos - 1);
            showRef.current.style.transform = `translateX(${275 + distance}px)`
        }
        // if right move to shows going right
        if (direction === "right" && listPos < 5) {
            setListPos(listPos + 1);
            showRef.current.style.transform = `translateX(${-275 + distance}px)`
        }
    }
    // handles the arrow buttons for the second row of shows
    const handleClickMSeason = (direction) => {
        // holds the distance to travel between each show card when
        // button is clicked
        let distance = seasonRef.current.getBoundingClientRect().x - 50;
        // if left move to shows going left
        if (direction === "left" && seasonPos > 0) {
            setSeaPos(seasonPos - 1);
            seasonRef.current.style.transform = `translateX(${275 + distance}px)`
        }
        // if right move to shows going right
        if (direction === "right" && seasonPos < 5) {
            setSeaPos(seasonPos + 1);
            seasonRef.current.style.transform = `translateX(${-275 + distance}px)`
        }
    }
    // handles the arrow buttons for the third row of shows
    const handleClickAShow = (direction) => {
        // holds the distance to travel between each show card when
        // button is clicked
        let distance = showARef.current.getBoundingClientRect().x - 50;
        // if left move to shows going left
        if (direction === "left" && showAPos > 0) {
            setShowAPos(showAPos - 1);
            showARef.current.style.transform = `translateX(${275 + distance}px)`
        }
        // if right move to shows going right
        if (direction === "right" && showAPos < 5) {
            setShowAPos(showAPos + 1);
            showARef.current.style.transform = `translateX(${-275 + distance}px)`
        }
    }
    // useEffect is used to get the shows but not repeatedly unless this page
    // is navigated to
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
            <div className="recommend"><b>Popular on Netflix</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClickAny("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                {/* Maps out all the shows from the Netflix API into row of cards*/}
                <div className="container" ref={showRef} >
                    {list.map((show) => (
                        show.summary.type === 'show' ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
                                {/* sets the data that will passed to forum page*/}
                                <CardActionArea key={show.summary.id} onClick={ () => {
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
                        {/* if nothing is retrieved from API, show nothing*/}
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClickAny("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
            <div className="recommend"><b>Shows With More than One Season</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClickMSeason("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                {/* Maps out all the shows from the Netflix API with > 1 season into row of cards*/}
                <div className="container" ref={seasonRef}>
                    {seasonList.map((show) => (
                        show.summary.type === 'show' && show.jawSummary.seasonCount > 1 ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
                                {/* sets the data that will passed to forum page*/}
                                <CardActionArea onClick={ () => {
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
                        {/* if nothing is retrieved from API, show nothing*/}
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClickMSeason("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
            <div className="recommend"><b>Shows A in the Name</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClickAShow("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow"/>
                </div>
                {/* Maps out all the shows from the Netflix API with A in the title into row of cards*/}
                <div className="container" ref={showARef} >
                    {showAList.map((show) => (
                        show.summary.type === 'show' ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
                                {/* sets the data that will passed to forum page*/}
                                <CardActionArea onClick={ () => {
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
                        {/* if nothing is retrieved from API, show nothing*/}
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClickAShow("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow"/>
                </div>
            </div>
            <br></br>
        </div>
    );
}

export default ShowCard;