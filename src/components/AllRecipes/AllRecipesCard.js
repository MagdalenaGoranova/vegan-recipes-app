
export default function AllRecipesCard({card}) {
    return (
    <div id="recipes-card-wrapper">

        <div className="recipes-inner-card">

            <div id="recipes-img-container">
                <img src={card.img} alt='recipe-img'/>
            </div>

            <div id="recipe-title">
                <h2>{card.title}</h2>
            </div>

            <div id="recipes-top-details">

                <div className="recipe-author">
                <p><i className="fa-solid fa-user"></i>{card.author}</p>
                </div>

                <div className="recipe-category">
                <p><i className="fa-solid fa-tag"></i>{card.category}</p>
                </div>

                <div className="recipe-level">
                <p><i className="fa-solid fa-user-graduate"></i>{card.level}</p>
                </div>

            </div>

            <div className="body">
                <p>{card.body}</p>
            </div>

   
            <div id="recipes-bottom-details">
      
            
                <div className="recipe-details">
                <p><i className="fa-regular fa-clock"></i>{card.time}</p>
                </div>
        
                <div className="recipe-details">
                <p><i className="fa-solid fa-people-group"></i>{card.servingSize}</p>
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
            <div className="recipes-start-btn"><a href="/">Details<i className="fas fa-long-arrow-alt-right"></i></a></div>

        </div>

  
    </div>
       
    )
}