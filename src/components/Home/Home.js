import { useState, useEffect } from 'react';
import './Home.css';
import HomeCard from './HomeCard';
import * as recipeService from '../../services/recipeService';
import { NavLink } from 'react-router-dom';

export default function Home() {

    const  [cards, setCards] = useState({});

    useEffect(() => {
        recipeService.getAll()
        .then(result => {
            setCards(result);
        })

    },[]);

    return (
        <div className="home-page">
            <section className='home-header'> 
                <p className='home-header-text'>Your vegan diet made easier...</p>
                <button className='all-recipes-btn'><NavLink to={'/all-recipes'}>View our recipes<i class="fa-solid fa-arrow-right"></i></NavLink></button>
                <a href="#main" className='home-btn'><i class="fa-solid fa-angle-down"></i></a>
            </section>
            <section id="main" className='home-main'>
                <div className='home-latest-recipes'>
                   <div className='home-latest-recipes-title'>
                    <p>Start with checking out our latest recipes</p>
                   </div>
                   <div className='home-latest-recipes-cards'>
                        {cards.length > 0 
                        ? cards.slice(-3).map(x => <HomeCard key={x._id} card={x}/>)
                        : <p>No Recipes Available yet.</p>
                        }
                        
                   </div>
                 
                
                </div>
                
            </section>
             
        </div>
    )
}