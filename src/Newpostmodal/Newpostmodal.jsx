import React, { useState } from "react";
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import '../Newpostmodal/Newpostmodal.css'
//import close from './close.svg';
import close from '../close.png';
//Modal: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

export const Newpostmodal = (props) => {
    const [postInput, setPostInput] = useState("");
    const [postTitleInput, setPostTitleInput] = useState("");
    if(!props.show) {
        return null
    }

    const handleChangePostTitle = (e) => {
        e.preventDefault();
        setPostTitleInput(e.target.value);
        // console.log('title:', postTitleInput);
    };

    const handleChangePost = (e) => {
        e.preventDefault();
        setPostInput(e.target.value);
        // console.log('post:', postInput);
    };

    return (
        <>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">New Post Forum</h4>
                    <img class="buttonclose" src={close} width="26" height="26" onClick={props.onClose}/> *
                </div>
                <div className="comment-title">
                <textarea
                    class = "comment-title-box"
                    type="text"
                    maxLength = "50"
                    placeholder="Enter your post title here"
                    onChange={handleChangePostTitle}
                    value={postTitleInput} />
                </div>
                <div className="modal-post">
                <textarea
                    class = "post-box"
                    type="text"
                    maxLength = "256"
                    placeholder="Enter your post here"
                    onChange={handleChangePost}
                    value={postInput} />
                </div>
                <div className="modal-footer">
                  <button className="buttonsubmit">Submit</button>
                    
                </div>
            </div>
        </div>
        </>
    )

}

export default Newpostmodal;