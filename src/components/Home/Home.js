import './Home.css';
import HomeCard from './HomeCard';

export default function Home({cards}) {
    return (
        <div className="home-page">
            <div className="latest-recipes-header">
                <h2 className='latest-recipes-header-title'>Our Latest Recipes</h2>
            </div>
            {cards.length > 0
                ?  (
                <section className="latest-recipes-container">
                    {cards.map(card => <HomeCard key={card._id} card={card}/>)}
                 </section>
                )
                : <h1 className='no-recipes'>No recipes available!</h1>
            }     
        </div>
    )
}