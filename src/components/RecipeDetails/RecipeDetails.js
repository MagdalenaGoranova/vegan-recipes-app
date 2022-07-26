import * as recipeService from '../../services/recipeService';
import * as ratingService from '../../services/ratingService';
import { AuthContext } from '../../contexts/AuthContext';
import './RecipeDetails.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { isAuth } from '../../HOC/isAuth';

 function RecipeDetails() {

    const [recipe, setRecipe] = useState({instructions:[], ingredients:[]});

    const [rateRecipe, setRateRecipe] = useState('');

    const [rating, setRating] = useState('');

    const [hasRated, setHasRated] = useState(false);

    let { id } = useParams();

    let { user } = useContext(AuthContext); 


    useEffect(() => {
        recipeService.getOne(id)
            .then(result => {
                setRecipe(result);
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    useEffect(() => {
        ratingService.getRate(user.accessToken, id)
            .then(result => {
                let sum = result.reduce((x, y) => { 
                    return x + Number(y.rateRecipe)
                }, 0); 
                let averageRating = sum / result.length;
                console.log(averageRating.toFixed(1));
                setRating(averageRating.toFixed(1));
                let filtered = result.filter(x => x._ownerId == user._id); 
                console.log(filtered);
                if(filtered.length > 0 ) {
                    setHasRated(true);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [id, user.accessToken, user._id]);
    
    function saveRate(e) {
        setRateRecipe(e.target.value);   
    }
    
    function rate() {
       if(rateRecipe > 0 && rateRecipe <= 5){
        ratingService.rateRecipe(user.accessToken, {id, rateRecipe})
            .then(result => {
                console.log(result);

            })
        } else {
            alert('Rating should be a number between 1 and 5');
        }
    }
    function stars(number) {
        let starsArr = [];
        for (let index = 6; index > 1; index--) {
            if(number > index) {
                starsArr.push(<i className="far fa-star"></i>)
            
            } else {
                starsArr.push(<i className="fas fa-star"></i>);
                
            }  
        }
        return starsArr
    }

    return (
        <>
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-page">
            <section className="side-details-div">
                <div className="recipe-img">
                    <img src={recipe.img} alt="recipeImage"/>
                </div>  
            </section>
            <section className='recipe-details' >
                    <h2>Recipe Details</h2>
                    <p><span>Recipe Author</span>{recipe.author}</p>
                    <p><span>Category</span>{recipe.category}</p>
                    <p><span>Difficulty level</span>{recipe.level}</p>
                    <p><span>Time for preparation</span>{recipe.hours}h: {recipe.minutes}min</p>
                    <p><span>Serving size</span>{recipe.servingSize}</p>
                    <p><span>Description</span>{recipe.body}</p>


            <div className="recipe-rating">
                {stars(rating).map(x => x)}
                <p>{rating}/5</p>
            </div>

                   
                    {!hasRated 
                    ? ( <><label>Rate recipe: </label>
                    <p><input onBlur={(e) => saveRate(e)} type="number" defaultValue={rateRecipe}/>/5</p>
                    <button onClick={(e) => rate(e)}>Rate</button></>)
                    : <p>You have rated this recipe</p>}
                    
            </section>
            <div className="recipe-additional-details">
                <section className="recipe-ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe.ingredients.map(x => 
                            <li key={x.ingredient}>
                            <span>{x.ingredient}</span> - {x.quantity} {x.measures}</li>
                        )}
                    </ul>
                    
                </section>
                <section className="recipe-instructions">
                    <h2>Method</h2>
                    <ul>
                        {recipe.instructions.map((x, i) => 
                            <li key={x}>
                            Step {i + 1}: <span>{x}</span></li>
                        )}
                    </ul>
                    
                </section>
            </div>
            
        
        </div>
    </>
    )
}
export default isAuth(RecipeDetails)