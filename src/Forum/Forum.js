import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import "./Forumpage.css";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Logo from "../Logo/logo";
import LikeButton from "../LikeButton/LikeButton";

// https://codesandbox.io/s/edmekk?file=/demo.tsx
function Forum() {
    // holds the selected season that stays when refreshing or making new post
    let defaultSeason = "";
    // holds the selected episode that stays when refreshing or making new post
    let defaultEpisode = "";
    // checks if there is a season and episode selected previously
    if (localStorage.getItem('season') && localStorage.getItem('episode')) {
        defaultSeason = localStorage.getItem('season');
        defaultEpisode = localStorage.getItem('episode');
    }
    // handles and holds the list of seasons from the selected show
    const [seasonList, setSeasonList] = useState([]);
    // handles and holds the season id of a show
    const [currSeason, setCurrSeason] = useState(defaultSeason);
    // handles and holds the list of episodes from the selected season of show
    const [episodeList, setEpisodeList] = useState([]);
    // handles and holds the selected episode id of a show
    const [currEp, setCurrEp] = useState(defaultEpisode);
    // holds the list of forum posts associated with the select season
    // and episode
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
            <div className="tvshowpicture">
                {Image && <img 
                src={Image}
                alt={Title}
                height='380'
                width='750'
                ></img>}
            </div>
            <br></br>
            <div className = "show-title">{Title && <div>{Title}</div>}</div>
            <br></br>
                <div className="dropdownSeason">
                    <Box sx={{minWidth: 20}}>
                    <FormControl fullWidth>
                        <InputLabel id="seasonPicker" style={{color: '#FFFFFF'}}><b>Season</b></InputLabel>
                        <Select
                        value={currSeason}
                        label="seasonSelector"
                        style={{backgroundColor: '#43465e', color: '#FFFFFF', width: 175}}
                        onChange={e => {setCurrSeason(e.target.value);localStorage.setItem('season', JSON.stringify(e.target.value))}}
                        >
                        {seasonList.map((season) => (
                            <MenuItem 
                                style={{backgroundColor: '#43465e', color:'#FFFFFF'}}
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
            <br></br>
            <div className = "go-episode-menu-newpost">
                <div className="dropdownEpisode">
                    <Box sx={{minWidth: 20}}>
                        <FormControl fullWidth>
                            <InputLabel id="episodePicker" style={{color: '#FFFFFF'}}><b>Episodes</b></InputLabel>
                            <Select
                                value={currEp}
                                label="episodeSelector"
                                style={{backgroundColor: '#43465e', color: '#FFFFFF', width: 400}}
                                onChange={e =>{setCurrEp(e.target.value); localStorage.setItem('episode', JSON.stringify(e.target.value))}}
                            >
                            {episodeList.map((episode) => (
                                <MenuItem 
                                    style={{backgroundColor: '#43465e', color:'#FFFFFF'}}
                                    value={episode.summary.id}
                                    key={episode.summary.id}
                                >
                                    {episode.title}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <button onClick = {forum} className="button-go">GO</button>
                    {
                        (episode_number_forum) ? 
                            <div className="newpost-logic">
                                {
                                    (curr) ? 
                                    <div className="newpost">
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <button className="newpost-button" onClick={() => setShow(true)}><b>New Post</b></button>
                                        <Modal onClose = {() => setShow(false)} show={show}/>
                                    </div> :
                                    <div className="newpost">
                                        <br></br>
                                        <button type ="button" class = "newpost-button" onClick={() => navigate("/login")}><b>New Post</b></button>
                                    </div> 
                                }
                            </div>
                        :
                        <h1></h1>
                    }
                </div>
            </div>
            <div className = "forum-posts">
                {forumList && forumList.slice(1).map((comments) => (
                    <Card className = "post-cards"sx={{width:750, height: 153, ml: 1}}>
                        <CardContent className = "post-cards-content">
                            {<div className="display-username">{comments.user_name}</div>}
                            {<div className="display-title"> {comments.title}</div>}
                            {<div className="display-content"> {comments.content}</div>}
                            <LikeButton 
                                forum_id = {comments.forum_id}
                                post_id = {comments.post_id}
                                user_id = {curr}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        </>
    )
}

export default Forum;