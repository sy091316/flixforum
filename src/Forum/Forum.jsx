import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
//import { Modal, Button, Form } from "react-bootstrap";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// https://codesandbox.io/s/edmekk?file=/demo.tsx

function Forum() {
    // holds the login status of the user
    const {loginStatus} = useContext(CategoryContext);
    // holds data of the show that was picked by the user
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    const [seasonList, setSeasonList] = useState([]);
    const [currSeason, setCurrSeason] = useState('');
    // used for creating posts
    const [show, setShow] = useState(false);
    // grabs the member info from the local storage
    const curr = localStorage.getItem('member');
    // used to move between home and forum pages
    const navigate = useNavigate();

    // fetches the seasons of the selected show
    const seasonQuery = 'https://netflix-data.p.rapidapi.com/title/seasons/?ids='+ selectedShow.summary.id +'&offset=0&limit=25';
    // grabs the seasons of a show
    useEffect(() => {
        fetch(seasonQuery, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
                'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then((json) => {
            const convert_season = json[0];
            console.log('convert season: ', convert_season);
            setSeasonList(convert_season.seasons);
        })
        .catch(err => {
            console.log(err)
        })
    }, [seasonQuery]);

    return (
        <>
        <div className="forumspage">
            <div className="navigation-bar">
                <button type="button" className="logo-flixforum" onClick={() => navigate("/")}>FLIXFORUM</button>
            </div>
            <br></br>
            <div className = "show-title">{selectedShow && <div>{selectedShow.jawSummary.title} </div>}</div>
            {console.log("currSeason: ", currSeason)}
            <Box sx={{ minWidth: 20 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{color: '#FFFFFF'}}>Season</InputLabel>
                <Select
                value={currSeason}
                label="seasonSelector"
                style={{backgroundColor: '#414141', color: '#FFFFFF', width: 175}}
                onChange={e => setCurrSeason(e.target.value)}
                >
                {/* creates the list of seasons a show has*/}
                {seasonList.map((season) => (
                    <MenuItem 
                        value={season.seasonId}
                        key={season.seasonId}
                    >
                    {season.shortName}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>















            <br></br>
            <div className="tvshowpicture">
                {selectedShow && <img 
                src={selectedShow.jawSummary.backgroundImage.url}
                alt={selectedShow.jawSummary.title}
                ></img>}
                {/* <br></br>
                Current ID: {curr} */}
            </div>
            
            {
                (loginStatus || curr) ? 
                <div className="newpost">
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="newpost-button" onClick={() => setShow(true)}>New Post</button>
                    <Modal onClose = {() => setShow(false)} show={show}/>
                </div> : 
                // redirect to login if not logged in
                <div className="newpost">
                    <br></br>
                    <br></br>
                    <br></br>
                    <button type ="button" class = "btn success" onClick={() => navigate("/login")}>New Post</button>
                </div> 
            }
        </div>
        </>
    )
}

export default Forum;