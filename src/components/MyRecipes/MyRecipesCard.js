import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function MyRecipesCard ({myRecipe, deleteMyRecipe}) {

    const {user} = useContext(AuthContext);

    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={myRecipe.img} alt='recipe-img'/>
            </div>

            <div id="recipe-title">
                <h2>{myRecipe.title}</h2>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <p><i className="fa-solid fa-user"></i>{myRecipe.author}</p>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{myRecipe.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{myRecipe.level}</p>
                </div>

            </div>

            <div className="body">
                <p>{myRecipe.body}</p>
            </div>

   
            <div id="recipes-bottom-details">
      
            
                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{myRecipe.time}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{myRecipe.servingSize}</p>
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
            <NavLink to={`/recipe/details/${myRecipe._id}`}>Details<i className="fas fa-long-arrow-alt-right"></i></NavLink>
            <div className="recipes-start-btn"><NavLink to="/">Edit</NavLink></div>
            
           <button onClick={() => deleteMyRecipe(myRecipe._id, user.accessToken)}>Delete</button>

        </div>

  
    </div>
       
    )
}