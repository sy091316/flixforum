import React, { useState, Component } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
//import { Modal, Button, Form } from "react-bootstrap";
import Modal from '../Newpostmodal/Newpostmodal';


export const Forum = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
        return (
   
            <>
            <div className="forumspage">
                <div className="navigation-bar">
                    <button type="button" className="logo-flixforum" onClick={() => navigate("/")}>FLIXFORUM</button>
                </div>
                <br></br>
                <div className="tvshowpicture">
                  TVshowPicture
                </div>
                
                <div className="newpost">
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="button info" onClick={() => setShow(true)}>+New Post</button>
                    <Modal onClose = {() => setShow(false)} show={show}/>
                </div>
            </div>

            </>
        )

}

export default Forum;