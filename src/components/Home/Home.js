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
            <section className='home-header' id="home"> 
                <p className='home-header-text'>Your vegan diet made easier...</p>
                <button className='all-recipes-btn'><NavLink to={'/all-recipes'}>View our recipes<i class="fa-solid fa-arrow-right"></i></NavLink></button>
                <a href="#main" className='home-btn'><i class="fa-solid fa-angle-down"></i></a>
            </section>

            <section id="main" className='home-latest-recipes'>
                <p className='latest-recipes-title'>Start with checking out our latest recipes</p>
                <div className='latest-recipes-cards'>
                    {cards.length > 0 
                    ? cards.slice(-3).map(x => <HomeCard key={x._id} card={x}/>)
                    : <p>No Recipes Available yet.</p>
                    }   
                </div> 
                <a href="#about-us" className='about-us-btn'>About us<i class="fa-solid fa-angle-down"></i></a>
                
            </section>

            <section className='about-us' id='about-us'> 
                <div className='about-us-img'>
                    <img className="bottom-img"src='/images/e2dadd_625b95c517134d7b8aac76cb24bdde38_mv2.png' alt='about-us'/>
                </div>
                <div className='about-us-text'>
                    <p className='about-us-title'>You should know that... </p>
                    <ul className='about-us-list'>
                            <li className='about-us-li'><i class="fa-solid fa-seedling"></i>We give you a chance to share your own favorite recipes.</li>
                            <li className='about-us-li'><i class="fa-solid fa-seedling"></i>We are inspired by tasty and healthy food which is cruelty-free, plant-based and delicious.</li>
                            <li className='about-us-li'><i class="fa-solid fa-seedling"></i>Our recipes are here to accomodate all stages of your vegan journey- from beginners to long-time vegans- we have the recipes for you</li>
                            <li className='about-us-li'><i class="fa-solid fa-seedling"></i>Our mission is to inspire more people to try vegan recipes and maybe start their plant-based journey here</li>
                    </ul>
                </div>
                
                <a href="#info" className='info-btn'>If you want to know more about veganism<i class="fa-solid fa-angle-down"></i></a>
            </section>

            <section className='info-section' id='info'> 
                <p className='info-title'>Useful information about veganism and plant-based diets</p>
                <div className='info-text'>
                    <div>
                        <p>Nutritional facts</p>
                    </div>
                    <div>
                        <p>History</p>
                    </div>
                    <div>
                    <p>Plant-based VS Vegan</p>
                    </div>
                </div>
                <p className='more-info'> For more information and ideas: </p>
                <a href="#home" className='to-top-btn'><i class="fa-solid fa-arrow-up"></i></a>
            </section>
          
        </div>
    )
}