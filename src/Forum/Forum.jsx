import React, { useState, useContext, Component, useEffect } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
//import { Modal, Button, Form } from "react-bootstrap";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import { display } from "@mui/system";


function Forum() {
    const {loginStatus} = useContext(CategoryContext);
    const {selectedShow, setSingleShow} = useContext(CategoryContext);
    const [displayShow, setDisplayedShow] = useState(false);
    const curr = localStorage.getItem('member');
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    // const singleShow = 'https://netflix-data.p.rapidapi.com/search/?query='+ selectedShow +'&limit_titles=3&limit_suggestions=1';
    React.useEffect(() => {
        // const singleShow = 'https://netflix-data.p.rapidapi.com/search/?query=stranger%20things&limit_titles=3&limit_suggestions=1';
        const singleShow = 'https://netflix-data.p.rapidapi.com/search/?query='+ selectedShow +'&limit_titles=3&limit_suggestions=1';
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