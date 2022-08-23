import { useState, useEffect } from 'react';
import '../../AllRecipes/AllRecipes.css';
import * as recipeService from '../../../services/recipeService';
import AllRecipesCardDummy from './AllRecipesCardDummy';
import CategoriesNavDummy from './CategoriesNavDummy';


export default function AllRecipesDummy() {

    const [recipes, setRecipes] = useState({});

    useEffect(() => {
        recipeService.getAllDummy()
        .then(result => {
            setRecipes(Object.values(result));
        })
    },[]); 

    function updateCards(value) {
        setRecipes(value);

    }

    return (
        <div className="recipes-page">

             <CategoriesNavDummy updateCards={updateCards}/>
            {recipes.length > 0
                ?  (
                <section className="recipes-container">
                    {recipes.map(recipe => <AllRecipesCardDummy key={recipe._id} recipe={recipe} />)}
                 </section> 
                )
                : <h1 className='no-recipes-msg'>No recipes available!</h1>
            }  
            
        </div>
    )





}