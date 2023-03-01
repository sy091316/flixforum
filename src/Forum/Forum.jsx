import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import "./Forumpage.css";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea, CardContent, CardMedia } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Logo from "../Logo/logo";

// https://codesandbox.io/s/edmekk?file=/demo.tsx
function Forum() {
    // holds the login status of the user
    const {loginStatus} = useContext(CategoryContext);
    // holds data of the show that was picked by the user
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    const [seasonList, setSeasonList] = useState([]);
    const [currSeason, setCurrSeason] = useState('');
    const [episodeList, setEpisodeList] = useState([]);
    const [currEp, setCurrEp] = useState('');
    const [forumList, setForumList] = useState([]);
    // used for creating posts
    const [show, setShow] = useState(false);
    // grabs the member info from the local storage
    const curr = localStorage.getItem('member');
    const ID = localStorage.getItem('showID');
    const Title = localStorage.getItem('title');
    const Image = localStorage.getItem('showImage');

    //getting the title the user chose on froum page and making it an Int
    const title_forum = localStorage.getItem('title'); 

    //getting the season the user chose on froum page and making it an Int
    const string_season_number = localStorage.getItem('season'); 
    const season_number_forum = Number(string_season_number);

    //getting the episode the user chose on forum page and making it an Int
    const string_episode_number = localStorage.getItem('episode');
    const episode_number_forum = Number(string_episode_number);

    // getting user ID
    const string_user_id = localStorage.getItem('member');
    const user_id_forum = Number(string_user_id);
    // used to move between home and forum pages
    const navigate = useNavigate();
    
    // gets the forum posts associated with current show's season and episode
    const forum = () => {
        Axios.get('http://localhost:3001/forum', {
            params: {
                userid_forum: user_id_forum,
                showtitle_forum: title_forum,
                season_forum: season_number_forum,
                episode_forum: episode_number_forum,
            }
        })

        .then(response => {
            console.log("response inside of forum", response.data);
            setForumList(response.data);
        })
    }

    // fetches the seasons of the selected show
    const seasonQuery = 'https://netflix-data.p.rapidapi.com/title/seasons/?ids='+ ID +'&offset=0&limit=25';
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
            // console.log('convert season: ', convert_season);
            setSeasonList(convert_season.seasons);
        })
        .catch(err => {
            console.log(err);
        })
    }, [seasonQuery]);
    // gets the episodes of the currently selected season
    const episodeQuery = 'https://netflix-data.p.rapidapi.com/season/episodes/?ids='+ currSeason +'&offset=0&limit=25';
    useEffect(() => {
        fetch(episodeQuery, {
            method: 'GET',
	        headers: {
                'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
                'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
	        }
        })
        .then(response => response.json())
        .then((json) => {
            // console.log('episodes: ', json[0]);
            const convert_epi = json[0].episodes;
            setEpisodeList(convert_epi);
        })
        .catch(err => {
            console.log(err);
        })
    }, [episodeQuery]);

    return (
        <>
        <div className="forumspage">
        <Logo/>
            {/* <br></br> */}
            <button onClick = {forum} className="buttonsubmit">GO</button>
            <div className="tvshowpicture">
                {Image && <img 
                src={Image}
                alt={Title}
                height='380'
                width='750'
                ></img>}
            </div>
            <div className = "show-title">{Title && <div>{Title}</div>}</div>
            <div className="dropdownSeason">
                <Box sx={{minWidth: 20}}>
                <FormControl fullWidth>
                    <InputLabel id="seasonPicker" style={{color: '#FFFFFF'}}>Season</InputLabel>
                    <Select
                    value={currSeason}
                    label="seasonSelector"
                    style={{backgroundColor: '#414141', color: '#FFFFFF', width: 175}}
                    onChange={e => {setCurrSeason(e.target.value);localStorage.setItem('season', JSON.stringify(e.target.value))}}
                    >
                    {seasonList.map((season) => (
                        <MenuItem 
                            style={{backgroundColor: '#414141', color:'#FFFFFF'}}
                            value={season.seasonId}
                            key={season.seasonId}
                        >
                        {season.shortName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </div>
            <div className="dropdownEpisode">
                <Box sx={{minWidth: 20}}>
                    <FormControl fullWidth>
                        <InputLabel id="episodePicker" style={{color: '#FFFFFF'}}>Episodes</InputLabel>
                        <Select
                            value={currEp}
                            label="episodeSelector"
                            style={{backgroundColor: '#414141', color: '#FFFFFF', width: 400}}
                            onChange={e =>{setCurrEp(e.target.value); localStorage.setItem('episode', JSON.stringify(e.target.value))}}
                        >
                            {/* {console.log(episodeList)} */}
                        {episodeList.map((episode) => (
                            <MenuItem 
                                style={{backgroundColor: '#414141', color:'#FFFFFF'}}
                                value={episode.summary.id}
                                key={episode.summary.id}
                            >
                                {episode.title}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            {/* <div style={{color: '#FFFFFF'}}>{currEp && <div>curr episode: {currEp}</div>}</div> */}
            <div style={{color: '#FFFFFF'}}>
                {forumList.map((comments) => (
                    <Card sx={{width: 400, height: 160, ml: 1}}>
                        <CardContent>
                            {<div>user name: {comments.user_name}</div>}
                            {<div>title of post: {comments.title}</div>}
                            {<div>content of post: {comments.content}</div>}
                            {<div>the user's id "backend stuff": {comments.user_id}</div>}
                        </CardContent>
                    </Card>
                ))}
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