import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';

import * as ratingService from '../../services/ratingService';
import * as commentsService from '../../services/commentsService';
import { AuthContext } from '../../contexts/AuthContext';
import * as ratingHandler from '../../helpers/RatingHandler';


import './HomeCard.css';

export default function HomeCard({card}) {

    const [commentsCount, setCommentsCount] = useState(0);
    const [rating, setRating] = useState(0);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        commentsService.getCommentsCount(user.accessToken, card._id)
            .then(result => {
                setCommentsCount(result);
            })
    }, [card._id, user.accessToken]);

    useEffect(() => {
        ratingService.getRate(user.accessToken, card._id)
            .then(result => {
                let sum = result.reduce((x, y) => { 
                    return x + Number(y.rateRecipe)
                }, 0); 
                let averageRating = sum / result.length;
                setRating(averageRating.toFixed(1));
            })
            .catch(err => {
                console.log(err);
            })
    }, [card._id, user.accessToken, user._id,]);

    
    return (    
        <div className="latest-recipe-card">
        <div className="latest-recipe-image" style={{backgroundImage:`url(${card.img})`}}>
            <div className="latest-recipe-overlay">
            <div className="latest-recipe-title">
                <h3 className="card-title">{card.title}</h3>
                <ul className="card-ul">
                    <li className="card-li"><i className="fa-regular fa-clock"></i>{card.hours ? card.hours+'h :' : ''}{card.minutes}min</li>
                    <li className="card-li"><i className="fa-solid fa-people-group"></i>{card.servingSize}</li>
                    <li className="card-li"><i className="fa-solid fa-comments"></i>{commentsCount}</li>
                    <li className="card-li"> 
                        {ratingHandler.stars(rating).map(x => x)}
                        <p>{rating}/5</p>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        <div className="latest-recipe-author">
            <a href='/' className="avatar-frame">
            <img src="http://www.gravatar.com/avatar/e971b1b59ef6876038eef74dfcb1b7a0?s=40" alt='profile-pic'/>{card.author}
            </a>
            <a href="/" className="details">Cook It</a>
        </div>
        </div>

    )
}