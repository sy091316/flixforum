import React, { useState, useContext, Component } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Forumpage.css";
//import { Modal, Button, Form } from "react-bootstrap";
import Modal from '../Newpostmodal/Newpostmodal';
import CategoryContext from "../CategoryContext";
import Logo from "../logo";


export const Forum = () => {
    const {loginStatus} = useContext(CategoryContext);
    const curr = localStorage.getItem('member');

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
        return (
   
            <>
            <div className="forumspage">
                <Logo/>
                {/* <div className="navigation-bar">
                    <button type="button" className="logo-flixforum" onClick={() => navigate("/")}>FLIXFORUM</button>
                </div> */}
                <br></br>
                <div className = "show-title">Title</div>
                <div className="show-season">Season x</div>
                <div className="show-episode">Episode x</div>
                <br></br>
                <div className="tvshowpicture">
                  TVshowPicture
                  <br></br>
                  Current ID: {curr}
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