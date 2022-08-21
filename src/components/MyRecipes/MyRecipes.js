import { useState, useEffect } from 'react';
import MyRecipesCard from './MyRecipesCard';
import * as recipeService from '../../services/recipeService';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './MyRecipes.css'


 function MyRecipes() {
    
    const { user } = useContext(AuthContext);

    const [myRecipes, setMyRecipes] = useState([]);
    
    const [myRecipesCount, setMyRecipesCount] = useState(0);

    useEffect(() => {
        recipeService.getMyRecipes(user._id, user.accessToken)
            .then(result => {
                setMyRecipes(result);
            })
            .catch(err => {
                console.log(err);
            })

    }, [user._id, user.accessToken]);

    useEffect(() => {
        recipeService.getMyRecipesCount(user._id, user.accessToken)
            .then(result => {
                setMyRecipesCount(result);
            })
            .catch(err => {
                console.log(err);
            })

    }, [user._id, user.accessToken]);

    function deleteMyRecipe(id, accessToken) {
        recipeService.deleteRecipe(id, accessToken)
            .then(result => {
                recipeService.getMyRecipes(user._id, user.accessToken)
                    .then(result => {
                        setMyRecipes(result);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                recipeService.getMyRecipesCount(user._id, user.accessToken)
                    .then(result => {
                        setMyRecipesCount(result);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
            })
    }

    return (
        <div className="recipes-page">
            {myRecipes.length > 0
                ? (<>
                    <p className="recipes-container-title">You have created {myRecipesCount} recipes!</p>
                    <section className="recipes-container">
                        {myRecipes.map(recipe => <MyRecipesCard key={recipe._id} myRecipe={recipe} deleteMyRecipe={deleteMyRecipe} />)}
                    </section>
                    </>
                )
                : <h1 className='no-recipes-msg'>You don't have recipes yet!</h1>
                
            }
        </div>
    )

}
export default MyRecipes;