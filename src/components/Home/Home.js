import { useState, useEffect } from 'react';
import './Home.css';
import HomeCard from './HomeCard';
import * as recipeService from '../../services/recipeService';

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
            <div className='home-header'>
                
            </div>
             
        </div>
    )
}