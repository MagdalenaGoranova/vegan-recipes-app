import * as recipeService from '../../services/recipeService';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuth } from '../../HOC/isAuth';

 function RecipeDetails() {

    const [recipe, setRecipe] = useState({});

    let { id } = useParams();

    useEffect(() => {
        recipeService.getOne(id)
            .then(result => {
                setRecipe(result);
                
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);
    console.log(recipe);

    return (
        <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={recipe.img} alt='recipe-img'/>
            </div>

            <div id="recipe-title">
                <h2>{recipe.title}</h2>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <p><i className="fa-solid fa-user"></i>{recipe.author}</p>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{recipe.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{recipe.level}</p>
                </div>

            </div>

            <div className="body">
                <p>{recipe.body}</p>
            </div>

   
            <div id="recipes-bottom-details">
      
            
                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{recipe.time}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{recipe.servingSize}</p>
                </div>

                <div className="recipe-details">
                <p><i className="fa-solid fa-comments"></i>12</p>
                </div>

                <div className="recipe-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                </div>

            </div>

        </div>
    </div>
    )
}
export default isAuth(RecipeDetails)