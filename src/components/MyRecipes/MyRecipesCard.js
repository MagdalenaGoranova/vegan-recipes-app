import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import * as ratingService from '../../services/ratingService';
import * as commentsService from '../../services/commentsService';
import { AuthContext } from '../../contexts/AuthContext';
import * as ratingHandler from '../../helpers/RatingHandler';
import './MyRecipes.css'

export default function MyRecipesCard ({myRecipe, deleteMyRecipe}) {

    const [rating, setRating] = useState(0);

    const [commentsCount, setCommentsCount] = useState(0);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        ratingService.getRate(myRecipe._id)
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
    }, [myRecipe._id]);

    useEffect(() => {
        commentsService.getCommentsCount(myRecipe._id)
            .then(result => {
                setCommentsCount(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [myRecipe._id]);

    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={myRecipe.img} alt='recipe-img'/>
            </div>

            <div id="all-recipe-title" className="all-recipes-title">
                <h4>{myRecipe.title}</h4>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <NavLink to={`/profile/${myRecipe._ownerId}`}><i className="fa-solid fa-user"></i>{myRecipe.author}</NavLink>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{myRecipe.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{myRecipe.level}</p>
                </div>

            </div>

            <div id="recipes-bottom-details">
      
            
                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{myRecipe.hours && myRecipe.hours > 0 ? myRecipe.minutes && myRecipe.minutes > 0 ? myRecipe.hours + 'h' + ':' + myRecipe.minutes + 'min': myRecipe.hours + 'h': myRecipe.minutes + 'min'}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{myRecipe.servingSize}</p>
                </div>

                <div className="recipe-details">
                <p><i className="fa-solid fa-comments"></i>{commentsCount}</p>
                </div>

                <div className="recipe-rating-all-recipes">
                    <p className='stars-all-recipes'>{ratingHandler.stars(rating).map(x => x)}</p>
                </div>

            </div>
            <NavLink to={`/recipe/details/${myRecipe._id}`} className="my-recipes-details-btn">Details<i className="fas fa-long-arrow-alt-right"></i></NavLink>
            
           <button onClick={() => deleteMyRecipe(myRecipe._id, user.accessToken)} className="delete-my-recipe-btn"><i className="fa-solid fa-trash-can"></i></button>

        </div>

  
    </div>
       
    )
}