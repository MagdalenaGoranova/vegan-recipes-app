import { useState, useEffect } from 'react';
import MyRecipesCard from './MyRecipesCard';
import * as recipeService from '../../services/recipeService';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { isAuth } from '../../HOC/isAuth';


 function MyRecipes() {
    const { user } = useContext(AuthContext);
    const [myRecipes, setMyRecipes] = useState([]);
    useEffect(() => {
        recipeService.getMyRecipes(user._id, user.accessToken)
            .then(result => {
                setMyRecipes(result);
            })

    }, [user._id, user.accessToken]);

    function deleteMyRecipe(id, accessToken) {
        recipeService.deleteRecipe(id, accessToken)
            .then(result => {
                recipeService.getMyRecipes(user._id, user.accessToken)
                    .then(result => {
                        setMyRecipes(result);
                    })
            })
    }

    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h2 className='recipes-header-title'>My Recipes</h2>
            </div>
            {myRecipes.length > 0
                ? (
                    <section className="recipes-container">
                        {myRecipes.map(recipe => <MyRecipesCard key={recipe._id} myRecipe={recipe} deleteMyRecipe={deleteMyRecipe} />)}
                    </section>
                )
                : <h1 className='no-recipes'>You don't have recipes!</h1>
            }
        </div>
    )

}
export default isAuth(MyRecipes);