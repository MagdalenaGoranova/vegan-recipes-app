import * as recipeService from '../../services/recipeService';
import './RecipeDetails.css'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuth } from '../../HOC/isAuth';

 function RecipeDetails() {

    const [recipe, setRecipe] = useState({instructions:[], ingredients:[]});

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
                    <p><span>Time for preparation</span>{recipe.time}</p>
                    <p><span>Serving size</span>{recipe.servingSize}</p>
                    <p><span>Description</span>{recipe.body}</p>
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