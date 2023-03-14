import React, { useState, useEffect } from 'react';
import Axios from 'axios'

const RatingButton = () => {
    const [rating, setRating] = useState(0);

    const [activeBtn, setActiveBtn] = useState("none");



    return (
        <div className="star-rating">
        {[...Array(5)].map((star) => {
            return (
                <span className="star">&#9733;</span>
            );
        })}
        </div>
    );
};

export default RatingButton;