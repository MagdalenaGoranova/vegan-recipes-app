import { NavLink } from "react-router-dom";


export default function AllRecipesCardDummy({recipe}) {

    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={recipe.img} alt='recipe-img'/>
            </div>

            <div id="all-recipes-title" className="all-recipes-title">
                <h4>{recipe.title}</h4>
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
   
            <div id="recipes-bottom-details">

                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{recipe.hours && recipe.hours > 0 ? recipe.minutes && recipe.minutes > 0 ? recipe.hours + 'h' + ':' + recipe.minutes + 'min': recipe.hours + 'h': recipe.minutes + 'min'}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{recipe.servingSize}</p>
                </div>

                <div className="recipe-details">
                <p><i className="fa-solid fa-comments"></i>1</p>
                </div>

                <div className="recipe-rating-all-recipes">
                    <p className='stars-all-recipes'></p>
                </div>
                

            </div>
            

        </div>

  
    </div>
       
    )
}