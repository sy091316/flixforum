import React, { useState, useContext, Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
//import { Modal, Button, Form } from "react-bootstrap";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";

function Forum() {
    // holds the login status of the user
    const {loginStatus} = useContext(CategoryContext);
    // holds data of the show that was picked by the user
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    // used to display the data of the selected show
    const [displayShow, setDisplayedShow] = useState(false);
    // used for creating posts
    const [show, setShow] = useState(false);
    // grabs the member info from the local storage
    const curr = localStorage.getItem('member');
    // used to move between home and forum pages
    const navigate = useNavigate();
    console.log("this is currently selected: ", selectedShow);
    // holds the fetch URL to grab the show that was picked
    const singleShow = 'https://netflix-data.p.rapidapi.com/search/?query='+ selectedShow +'&limit_titles=1&limit_suggestions=1';
    useEffect(() => {
        fetch(singleShow, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': '2c0524d1f3msha9fb62d0bf2cad7p11368bjsn299a80d5fc29',
                'X-RapidAPI-Host': 'netflix-data.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then((data) => {
            const convert_list = data.titles;
            console.log(convert_list[0]);
            setDisplayedShow(convert_list[0]);
        })
        .catch(() => {
            setDisplayedShow([]);
        })
    }, []);

    return (
        <>
        <div className="forumspage">
            <div className="navigation-bar">
                <button type="button" className="logo-flixforum" onClick={() => navigate("/")}>FLIXFORUM</button>
            </div>
            <br></br>
            <div className = "show-title">{displayShow && <div>{displayShow.jawSummary.title} </div>}</div>
            <div className="show-season">{displayShow && <div>Season {displayShow.jawSummary.seasonCount}</div>}</div>
            <div className="show-episode">Episode x</div>
            <br></br>
            <div className="tvshowpicture">
                {displayShow && <img src={displayShow.jawSummary.backgroundImage.url}></img>}
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