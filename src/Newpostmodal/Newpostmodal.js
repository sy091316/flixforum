import React, { useState } from "react";
import Axios from 'axios'
import '../Newpostmodal/Newpostmodal.css'
import close from '../img/close-button.png';

//Modal: https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
// DB format based on
// https://gist.github.com/mrdaemon/1446020

export const Newpostmodal = (props) => {
    // to use to grab forum_id from DB 
    // grab the show title of the forum user is on
    const show_title = localStorage.getItem('title'); 

    //getting the season the user chose on froum page and making it an Int
    const string_season_number = localStorage.getItem('season'); 
    const season_number = Number(string_season_number);
    // console.log("season number ", season_number);

    //getting the episode the user chose on forum page and making it an Int
    const string_episode_number = localStorage.getItem('episode');
    const episode_number = Number(string_episode_number);
    // console.log("episode number ", episode_number);

    // getting user ID
    const string_user_id = localStorage.getItem('member');
    const user_id = Number(string_user_id);
    //user_id = parseInt(user_id, 10);
    //console.log("user_id", user_id);

    // getting post title and content 
    const [postInput, setPostInput] = useState("");
    const [postTitleInput, setPostTitleInput] = useState("");

    if(!props.show) {
        return null
    }

    //axios call to database with user and forum information
    const newpostmodal = () => {
        console.log("inside new post modal and clicked submit");
        Axios.post('http://localhost:3001/newpostmodal', {
          posttitle: postTitleInput,  
          postcontent: postInput,
          userid: user_id,
          showtitle: show_title,
          season: season_number,
          episode: episode_number,
        })
    }

    // if user is writing in the post-title text box, save the value
    const handleChangePostTitle = (e) => {
        e.preventDefault();
        setPostTitleInput(e.target.value);
        // console.log('title:', postTitleInput);
    };

    //if user is writing in the post text box, save the value
    const handleChangePost = (e) => {
        e.preventDefault();
        setPostInput(e.target.value);
        // console.log('post:', postInput);
    };

    return (
        <>
        <form>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">New Post Forum</h4>
                    <img className="buttonclose" src={close} alt="X" width="26" height="26" onClick={props.onClose}/>
                </div>
                {/* Text box for title of post */}
                <div className="comment-title">
                <textarea
                    className = "comment-title-box"
                    type="text"
                    maxLength = "50"
                    placeholder="Enter your post title here"
                    onChange={handleChangePostTitle}
                    value={postTitleInput} 
                    required/>
                </div>
                {/* Text box for post */}
                <div className="modal-post">
                <textarea
                    className = "post-box"
                    type="text"
                    maxLength = "256"
                    placeholder="Enter your post here"
                    onChange={handleChangePost}
                    value={postInput}
                    required/>
                </div>
                {/* submit button which triggers Axios post */}
                <div className="modal-footer">
                  <button onClick = {newpostmodal} className="buttonsubmit">Submit</button>
                </div>
            </div>
        </div>
        </form>
        </>
    )
}

export default Newpostmodal;