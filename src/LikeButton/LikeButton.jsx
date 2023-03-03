import React, { useState } from 'react';
import Axios from 'axios'

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);

  const [activeBtn, setActiveBtn] = useState("none");
  const [numLikes,setnumLikes]=useState(1);

  // retrieve the number of likes from the database for a specific post
  const handleLikes = () => {
    Axios.post("http://localhost:3001/numLikes").then((response) => {
        if(response.data.message) {
            console.log(response.data.message);
        } else {
            setnumLikes(response.data[0].likes)
            console.log(response)
        }
    });
  }

  const handleLikeClick = () => {
    // need to do an axios post instead of using useState()
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1); //"UPDATE Posts SET likes = likes + 1 WHERE id = ?"
      setActiveBtn("like");
      return;
    }

    if (activeBtn === 'like'){
      setLikeCount(likeCount - 1); //"UPDATE Posts SET likes = likes - 1 WHERE id = ?"
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1); //"UPDATE Posts SET likes = likes + 1 WHERE id = ?"
      setDislikeCount(dislikeCount - 1); //"UPDATE Posts SET dislikes = dislikes - 1 WHERE id = ?"
      setActiveBtn("like");
    }
  };

  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }
    
    if (activeBtn === 'dislike'){
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };


  return (
    <div className="container">
      <div className="btn-container">
        <button
          className={`btn ${activeBtn === 'like' ? 'like-active' : ''}`}
          onClick={handleLikes}
        >
          <span className="material-symbols-rounded"></span>
          Like {numLikes}
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