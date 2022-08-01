import { useState, useEffect } from 'react';
import './AllRecipes.css';
import AllRecipesCard from './AllRecipesCard';
import * as recipeService from '../../services/recipeService';

export default function AllRecipes() {

    const  [cards, setCards] = useState({});

    useEffect(() => {
        recipeService.getAll()
        .then(result => {
            setCards(result);
        })

    },[]);
    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h2 className='recipes-header-title'>All Recipes</h2>
            </div>
            {cards.length > 0
                ?  (
                <section className="recipes-container">
                    {cards.map(card => <AllRecipesCard key={card._id} card={card}/>)}
                 </section>
                )
                : <h1 className='no-recipes'>No recipes available!</h1>
            }     
        </div>
    )
}