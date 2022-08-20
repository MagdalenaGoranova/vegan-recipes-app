import { NavLink, useParams  } from "react-router-dom";
import { useState, useEffect, useContext} from "react";

import * as ratingService from '../../services/ratingService';
import * as commentsService from '../../services/commentsService';
import { AuthContext } from '../../contexts/AuthContext';
import * as ratingHandler from '../../helpers/RatingHandler';
import '../MyRecipes/MyRecipes.css'

export default function UserRecipesCard ({userRecipe}) {

    const [rating, setRating] = useState(0);

    const [commentsCount, setCommentsCount] = useState(0);

    const {user} = useContext(AuthContext);

    useEffect(() => {
        ratingService.getRate(userRecipe._id)
            .then(result => {
                console.log(result);
                let sum = result.reduce((x, y) => { 
                    return x + Number(y.rateRecipe)
                }, 0); 
                let averageRating = sum / result.length;
                setRating(averageRating.toFixed(2));   
            })
            .catch(err => {
                console.log(err);
            })
    }, [userRecipe._id]);

    useEffect(() => {
        commentsService.getCommentsCount(userRecipe._id)
            .then(result => {
                setCommentsCount(result);
            })
    }, [userRecipe._id]);

    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={userRecipe.img} alt='recipe-img'/>
            </div>

            <div id="all-recipe-title" className="all-recipes-title">
                <h4>{userRecipe.title}</h4>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <NavLink to={`/profile/${userRecipe._ownerId}`}><i className="fa-solid fa-user"></i>{userRecipe.author}</NavLink>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{userRecipe.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{userRecipe.level}</p>
                </div>

            </div>

            <div id="recipes-bottom-details">
      
            
                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{userRecipe.hours && userRecipe.hours !== 0 ? userRecipe.minutes && userRecipe.minutes !== 0 ? userRecipe.hours + 'h' + ':' + userRecipe.minutes + 'min': userRecipe.hours + 'h': userRecipe.minutes + 'min'}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{userRecipe.servingSize}</p>
                </div>

                <div className="recipe-details">
                <p><i className="fa-solid fa-comments"></i>{commentsCount}</p>
                </div>

                <div className="recipe-rating-all-recipes">
                    <p className='stars-all-recipes'>{ratingHandler.stars(rating).map(x => x)}</p>
                </div>

            </div>
            <NavLink to={`/recipe/details/${userRecipe._id}`} className="my-recipes-details-btn">Details<i className="fas fa-long-arrow-alt-right"></i></NavLink>
            

        </div>

  
    </div>
       
    )
}