import { NavLink } from "react-router-dom";

export default function HomeCard({card}) {
    return (
    <div id="card-wrapper">

        <div className="inner-card">

            <div id="img-container">
                <img src={card.img} alt='recipe-img'/>
            </div>

            <div id="top-details">

                <div id="title">
                <h2>{card.title}</h2>
                </div>

                <div className="author">
                <p><i className="fa-solid fa-user"></i>{card.author}</p>
                </div>
            </div>
   
            <div id="bottom-details">
      
                <div className="details">
                <h3><i className="fa-solid fa-user-graduate"></i>{card.level}</h3>
                </div>
        
                <div className="details">
                <h3><i className="fa-regular fa-clock"></i>{card.time}</h3>
                </div>
        
                <div className="details">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
                </div>

                <div className="details">
                <h3><i className="fa-solid fa-people-group"></i>{card.servingSize}</h3>
                </div>

                <div className="details">
                <h3><i className="fa-solid fa-tag"></i>{card.category}</h3>
                </div>

                <div className="details">
                <h3><i className="fa-solid fa-comments"></i>12</h3>
                </div>

                <div className="start-btn">
                    <NavLink to={`/recipe/details/${card._id}`}>Details<i className="fas fa-long-arrow-alt-right"></i></NavLink>
                </div>
      
            </div>

        </div>

  
    </div>
       
    )
}