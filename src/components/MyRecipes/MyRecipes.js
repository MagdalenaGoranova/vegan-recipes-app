import { useState, useEffect } from 'react';
import MyRecipesCard from './MyRecipesCard';
import * as recipeService from '../../services/recipeService';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";


export default function MyRecipes() {
    const { user } = useContext(AuthContext);
    const [myRecipes, setMyRecipes] = useState([]);
    useEffect(() => {
        recipeService.getMyRecipes(user._id, user.accessToken)
        .then(result => {
            setMyRecipes(result);
        })

    }, [user._id, user.accessToken]);

    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h2 className='recipes-header-title'>My Recipes</h2>
            </div>
            {myRecipes.length > 0
                ?  (
                <section className="recipes-container">
                    {myRecipes.map(recipe => <MyRecipesCard key={recipe._id} myRecipe={recipe}/>)}
                 </section>
                )
                : <h1 className='no-recipes'>You don't have recipes!</h1>
            }     
        </div>
    )
    
}