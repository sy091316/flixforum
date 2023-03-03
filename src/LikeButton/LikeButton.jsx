import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [activeBtn, setActiveBtn] = useState("none");

  // retrieve the number of likes and dislikes
  useEffect(()=>{
    Axios.post("http://localhost:3001/totalLikes", {
      typeOfLike: 'likes'
    }).then((response) => {
        if(response.data.message) {
            console.log(response.data.message);
        } else {
            setLikeCount(response.data[0].likes)
            console.log(response)
        }
    });
  });

  useEffect(()=>{
    Axios.post("http://localhost:3001/totalDislikes").then((response) => {
      if(response.data.message) {
          console.log(response.data.message);
      } else {
          setDislikeCount(response.data[0].dislikes)
          console.log(response)
      }
    });
  });
  
  // handle all the logic when pressing like button and all the diff cases
  const handleLikeClick = () => {
    if (activeBtn === "none") {
      // update the DB
      Axios.post("http://localhost:3001/addLike").then((response) => {});
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
    }

    if (activeBtn === 'like'){ // take away a like if the user presses the like button again
      Axios.post("http://localhost:3001/subLike").then((response) => {});
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      //console.log(response)
    }

    if (activeBtn === "dislike") {
      // update the DB
      Axios.post("http://localhost:3001/addLike").then((response) => {});
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      //console.log(response)
      
      Axios.post("http://localhost:3001/subDislike").then((response) => {});
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
      //console.log(response)
    }
  };

  // handle all the logic when pressing dislike button and all the diff cases
  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      // update the DB
      Axios.post("http://localhost:3001/addDislike").then((response) => {});
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      //console.log(response)
    }
    
    if (activeBtn === 'dislike'){
      Axios.post("http://localhost:3001/subDislike").then((response) => {});
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      //console.log(response)
    }

    if (activeBtn === "like") {
      Axios.post("http://localhost:3001/addDislike").then((response) => {});
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      //console.log(response)

      Axios.post("http://localhost:3001/subLike").then((response) => {});
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
      //console.log(response)
    }
  };


  return (
    <div className="container">
      <div className="btn-container">
        <button
          className={`btn ${activeBtn === 'like' ? 'like-active' : ''}`}
          onClick={handleLikeClick}
        >
          <span className="material-symbols-rounded"></span>
          Like {likeCount}
        </button>

        <button
          className={`btn ${activeBtn === 'dislike' ? 'dislike-active' : ''}`}
          onClick={handleDisikeClick}
        >
          <span className="material-symbols-rounded"></span>
          Dislike {dislikeCount}
        </button>
      </div>
    </div>
  );
}

export default LikeButton;