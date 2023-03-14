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
function ShowCard() {
    const [list, setList] = useState([]);
    // handles how far you scroll through list of shows
    const [listPos, setListPos] = useState(0);
    const [comList, setComList] = useState([]);
    const [comPos, setComPos] = useState(0);
    const [origList, setOrigList] = useState([]);
    const [origPos, setOrigPos] = useState(0);
    // handles updating the position of the shows cards
    const showRef = useRef();
    const navigate = useNavigate();
    // function processes click on left and right buttons
    const handleClick = (direction) => {
        // holds the distance to travel between each show card when
        // button is clicked
        let distance = showRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && listPos > 0) {
            setListPos(listPos - 1);
            showRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if (direction === "right" && listPos < 5) {
            setListPos(listPos + 1);
            showRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }
    // useEffect is used to get the shows but not repeatedly unless this page
    // is navigated to
    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=15&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        // sets the
        .then((json) => {
            const convert_list = json.titles;
            setList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query=A&limit_titles=15&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        // sets the
        .then((json) => {
            const convert_list = json.titles;
            setOrigList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        // fetches random shows from Netflix API
        fetch('https://netflix-data.p.rapidapi.com/search/?query=&limit_titles=15&limit_suggestions=1', {
            "method": "GET",
            "headers": {
            'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
            'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        // sets the
        .then((json) => {
            const convert_list = json.titles;
            setComList(convert_list);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    return(
        <div className="list">
            <br></br>
            <br></br>
            <div className="recommend"><b>Popular on Netflix</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClick("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow" onClick={()=>handleClick("left")}/>
                </div>
                <div className="container" ref={showRef} >
                    {list.map((show) => (
                        show.summary.type === 'show' ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
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
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClick("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow" onClick={()=>handleClick("right")}/>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="recommend"><b>Shows With More than One Season</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClick("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow" onClick={()=>handleClick("left")}/>
                </div>
                <div className="container" >
                    {comList.map((show) => (
                        show.summary.type === 'show' && show.jawSummary.seasonCount > 2 ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
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
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClick("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow" onClick={()=>handleClick("right")}/>
                </div>
            </div>

            <br></br>
            <br></br>
            <div className="recommend"><b>Shows A in the Name</b></div>
            <br></br>
            <div className="wrapper">
                {/* Left arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxleft" onClick={()=>handleClick("left")}>
                    <ArrowBackIosOutlined className="slider leftarrow" onClick={()=>handleClick("left")}/>
                </div>
                <div className="container" >
                    {origList.map((show) => (
                        show.summary.type === 'show' ?
                        <div className="list-cards" key={show.summary.id}>
                            <Card sx={{width: 275, height: 200, ml: 1, backgroundColor: "#43465e"}}>
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
                        </div>
                        : null
                    ))}
                </div>
                {/* Right arrow button for scrolling a list of tv shows */}
                <div className="slider arrowboxright" onClick={()=>handleClick("right")}>
                    <ArrowForwardIosOutlined className="slider rightarrow" onClick={()=>handleClick("right")}/>
                </div>
            </div>
        </div>
    );
}

export default ShowCard;