import { useState, useEffect } from 'react';
import './Home.css';
import HomeCarousel from './HomeCarousel';
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

            <section id="main" className='home-recipes'>
                <p className='home-recipes-title'>Here you can find...</p>
                <div className='home-categories'>
                     <HomeCarousel />
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
                    <div className='info-about'>
                        <p>What is veganism? </p>
                        <ul className='info-about-ul'>
                        <li><i class="fa-solid fa-seedling"></i>Veganism is a way of living that excludes as far as is possible and practical all animal products. That means vegans eat plant-based foods and wear clothes that do not come from animals, such as fur, leather, silk, and feathers. It also means choosing cruelty-free household products and toiletries</li>
                        <li><i class="fa-solid fa-seedling"></i>Today, people choose to become vegan for a variety of reasons but most common is that they do not want to cause suffering to animals, they want to reduce their climate impact and protect the planet, or they want to improve their health.</li>
                        </ul>
                    </div>
                    <div className='info-about'>
                        <p>History</p>
                        <ul className='info-about-ul'>
                            <li><i class="fa-solid fa-seedling"></i>While veganism is a fairly recent concept designed to best protect animals, the history of eating plant-based food and refraining from harming animals unnecessarily goes back millenia.</li>
                            <li><i class="fa-solid fa-seedling"></i>The term “vegan” was created in 1944 by Donald Watson — an English animal rights advocate and founder of The Vegan Society — to describe a person who avoids using animals for ethical reasons.</li>
                            <li><i class="fa-solid fa-seedling"></i>Traces of vegan/plant-based diets and beliefs dat back to ancient Egipt, India, Japan, Greece and more</li>
                        </ul>
                    </div>
                    <div className='info-about'>
                    <p>Plant-based VS Vegan</p>
                    <ul className='info-about-ul'>
                            <li><i class="fa-solid fa-seedling"></i>The diets of our ancestors, wherever they lived, may not have been vegan as we know that concept today, but in many cases they were plant-based.</li>
                            <li><i class="fa-solid fa-seedling"></i>In the 1980s, Dr. T. Colin Campbell introduced the world of nutrition science to the term “plant-based diet” to define a low fat, high fiber, vegetable-based diet that focused on health and not ethics.</li>
                            <li><i class="fa-solid fa-seedling"></i>Being plant-based typically refers specifically to ones diet alone while being vegan reaches beyond diet and also describes the lifestyle that one chooses to lead on a daily basis.</li>
                        </ul>
                    </div>
                </div>
                
                <a href="#home" className='to-top-btn'><i class="fa-solid fa-arrow-up"></i></a>
            </section>
            
        </div>

    )
}