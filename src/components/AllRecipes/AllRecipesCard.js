import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import * as ratingService from '../../services/ratingService';
import * as commentsService from '../../services/commentsService';
import { AuthContext } from '../../contexts/AuthContext';
import * as ratingHandler from '../../helpers/RatingHandler';


import './AllRecipes.css'

export default function AllRecipesCard({card}) {

    const [rating, setRating] = useState(0);

    const [commentsCount, setCommentsCount] = useState(0);

    let { user } = useContext(AuthContext); 

    useEffect(() => {
        ratingService.getRate(card._id)
            .then(result => {
                if(result.length > 0) {
                    let sum = result.reduce((x, y) => { 
                        return x + Number(y.rateRecipe)
                    }, 0); 
                    let averageRating = sum / result.length;
                    setRating(averageRating.toFixed(2));   
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [card._id]);

    useEffect(() => {
        commentsService.getCommentsCount(card._id)
            .then(result => {
                setCommentsCount(result);
            })
    }, [card._id]);

    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={card.img} alt='recipe-img'/>
            </div>

            <div id="all-recipes-title" className="all-recipes-title">
                <h4>{card.title}</h4>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <NavLink to={`/profile/${card._ownerId}`}><i className="fa-solid fa-user"></i>{card.author}</NavLink>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{card.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{card.level}</p>
                </div>

            </div>
   
            <div id="recipes-bottom-details">

                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{card.hours && card.hours !== 0 ? card.minutes && card.minutes !== 0 ? card.hours + 'h' + ':' + card.minutes + 'min': card.hours + 'h': card.minutes + 'min'}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{card.servingSize}</p>
                </div>

                <div className="recipe-details">
                <p><i className="fa-solid fa-comments"></i>{commentsCount}</p>
                </div>

                <div className="recipe-rating-all-recipes">
                    <p className='stars-all-recipes'>{ratingHandler.stars(rating).map(x => x)}</p>
                </div>
                

            </div>
            <NavLink to={`/recipe/details/${card._id}`} className="all-recipes-details-btn">Details<i className="fas fa-long-arrow-alt-right"></i></NavLink>

        </div>

  
    </div>
       
    )
}