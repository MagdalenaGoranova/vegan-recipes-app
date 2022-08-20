import * as recipeService from '../../services/recipeService';
import * as ratingService from '../../services/ratingService';
import * as commentsService from '../../services/commentsService';
import * as ratingHandler from '../../helpers/RatingHandler';


import { AuthContext } from '../../contexts/AuthContext';
import './RecipeDetails.css'

import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Comments from './Comments';


 function RecipeDetails() {

    const [recipe, setRecipe] = useState({instructions:[], ingredients:[]});

    const [rateRecipe, setRateRecipe] = useState(0);

    const [rating, setRating] = useState(0);

    const [hasRated, setHasRated] = useState(false);

    const [comments, setComments] = useState([]);

    const [commentsCount, setCommentsCount] = useState(0);


    let { id } = useParams();

    let { user } = useContext(AuthContext); 


    useEffect(() => {
        console.log(id);
        recipeService.getOne(id)
            .then(result => {
                console.log(result);
                setRecipe(result);
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    useEffect(() => {
        ratingService.getRate(id)
            .then(result => {
                console.log(result);
                if(result.length > 0) {
                    let sum = result.reduce((x, y) => { 
                        return x + Number(y.rateRecipe)
                    }, 0); 
                    let averageRating = sum / result.length;
                    setRating(averageRating.toFixed(1));
                    let filtered = result.filter(x => x._ownerId == user._id); 
                    if(filtered.length > 0 ) {
                        setHasRated(true);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [id, user._id, hasRated, rating, rateRecipe]);

    useEffect(() => {
        commentsService.getComments(id)
            .then(result => {
                console.log(result);
                setComments(result)
            })
            .catch(err => {
                console.log(err);
            })
        commentsService.getCommentsCount(id)
            .then(result => {
                setCommentsCount(result);
            })
    }, [id]);


    function saveRate(e) {
        setRateRecipe(e.target.value);   
    }
    
    function rate() {
       if(rateRecipe > 0 && rateRecipe <= 5){
        ratingService.rateRecipe(user.accessToken, {id, rateRecipe})
            .then(result => {
            })
            setHasRated(true);
        } else {
            alert('Rating should be a number between 1 and 5');
        }
    }

    function comment(e) {
       let comment = e.currentTarget.parentElement.childNodes[0].value;

       commentsService.commentRecipe(user.accessToken, {id, comment})
       .then(result => {
        setComments(oldState => ([
            ...oldState, 
            result, 
        ]))
        setCommentsCount(oldState => oldState + 1);
       })
       e.currentTarget.parentElement.childNodes[0].value = '';
       
    }
    function showInputField(e) {
       let inputField = e.target.parentElement.parentElement.childNodes[1];
       if(inputField.className == 'input-field hidden') {
        inputField.classList.remove('hidden');
       } else {
        inputField.classList.add('hidden');
       }
    }

    return (
        <div className='recipe-details-container'>

            <div className='recipe-details-all'>

                <div className='recipe-details-div'>
                    {recipe._ownerId == user._id 
                    ? 
                    <h3 className="recipe-title">{recipe.title}<NavLink to={`/recipe/edit/${recipe._id}`}>Edit<i className="fa-solid fa-pen"></i></NavLink></h3>
                    : <h3 className="recipe-title">{recipe.title}</h3>}

                    <div className='recipe-details-initial-info'>

                        <div className='initial-info'>
                            <div className="recipe-rating">
                                    <p className='stars'>{ratingHandler.stars(rating).map(x => x)}</p>
                                    <p className='rating'>{rating}/5</p>

                                { recipe._ownerId != user._id && user._id
                                ? !hasRated
                                    ? ( <>
                                        <input className="rate-input" onBlur={(e) => saveRate(e)} type="number" defaultValue={rateRecipe}/><span>/5</span>
                                        <button  className="rate-btn" onClick={(e) => rate(e)}>Rate</button>
                                        </>)
                                    : <p className='rate-msg'>You have rated this recipe</p>
                                : ''}
                            </div>

                            <p className='description-text'>{recipe.description}</p>

                            <div className='details'>
                                <p className='details-text'><span>Author:</span>{recipe.author}</p>
                                <p className='details-text'><span>Prep time:</span>
                                {recipe.hours && recipe.hours !== 0 ? recipe.minutes && recipe.minutes !== 0 ? recipe.hours + 'h' + ':' + recipe.minutes + 'min': recipe.hours + 'h': recipe.minutes + 'min'}</p>
                                <p className='details-text'><span>Serving size:</span>{recipe.servingSize}</p>
                                <p className='details-text'><span>Category:</span>{recipe.category}</p>
                                <p className='details-text'><span>Level:</span>{recipe.level}</p>
                            </div>

                        </div>

                        <div className='recipe-img'>
                                <img src={recipe.img} alt="recipeImage"/>
                        </div>
                    </div>

                </div>

                <div className='recipe-details-additional-info'>

                        <section className="recipe-ingredients">
                            <h3>Ingredients</h3>
                            <ul>
                                {recipe.ingredients.map(x => 
                                    <li key={x.ingredient}>
                                    <i className="fa-solid fa-basket-shopping"></i>
                                    <span>{x.quantity} {x.measures}</span>{x.ingredient}</li>
                                )}
                            </ul>      
                        </section>

                        <section className="recipe-instructions">
                            <h3>Method</h3>
                            <ul>
                                {recipe.instructions.map((x, i) => 
                                    <li key={x}>
                                    <span>Step {i + 1}:</span>{x}</li>
                                )}
                            </ul> 
                        </section>
                </div>

            </div>
            <div className='comments-container'>
                <h3>Comments</h3>
                <section className='all-comments'>
                    <p className='comments-count'>This recipe has {commentsCount} comments so far!</p>
                    <div className='comments'>{comments.map(x => <Comments key={x._id} comment={x}/> )}</div>
                   
                </section>
                {user._id 
                    ? <section className='comment-input'>
                    <p>Leave a comment<i className="fa-solid fa-comment-medical" onClick={(e) => showInputField(e)}></i></p>
                    <div className='input-field hidden'>
                    <textarea></textarea>
                    <button onClick={e=> comment(e)}>Comment</button>
                    </div>
                    </section>
                : <p className='no-user-message'>You need to register or login to leave a comment and rate this recipe!</p> }
                
            </div>
        </div>
       
    
    )
}
export default RecipeDetails