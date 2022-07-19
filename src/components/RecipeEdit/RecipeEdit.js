import { isAuth } from "../../HOC/isAuth"
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import './RecipeEdit.css'
import { AuthContext } from "../../contexts/AuthContext";

import * as recipeService from '../../services/recipeService';

function RecipeEdit() {

    let { id } = useParams();

    let { user } = useContext(AuthContext);

    const [recipe, setRecipe] = useState({ingredients:[], instructions:[]});

    useEffect(() => {
        recipeService.getOne(id)
        .then(result => {
            setRecipe(result)
        })
    },[id])

function addNewIngredient(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget.parentElement);
   
    let ingredient = formData.get('ingredient');
    let quantity = formData.get('quantity');
    let measures = formData.get('measures');
    
    setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, {ingredient, quantity, measures}]
        
    });
}

function addNewInstruction(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget.parentElement);
    let instruction = formData.get('instruction');

    setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, instruction]
    });       
}
function deleteIngredient(e) {
    let currentIngredient = e.currentTarget.parentElement.childNodes[0].value;
    setRecipe(oldState => ({...oldState, ingredients: recipe.ingredients.filter(x =>  x.ingredient !== currentIngredient)}))  
    
}
function editIngredient(e) {
    let currentIngredient = e.currentTarget.parentElement.childNodes[0].value;
    let currentQuantity = e.currentTarget.parentElement.childNodes[1].value;
    let currentMeasure = e.currentTarget.parentElement.childNodes[2].value;
    let index = recipe.ingredients.findIndex((x => x.ingredient == currentIngredient));
    let ingredients = recipe.ingredients;
    ingredients[index] = {ingredient: currentIngredient, quantity: currentQuantity, measures: currentMeasure};
    console.log();
    setRecipe(oldState => ({
        ...oldState,
        ingredients: ingredients,
    }))

    
}
console.log(recipe);


function deleteInstruction(e) {
    e.preventDefault();
    let currentInstruction = e.currentTarget.parentElement.childNodes[0].value;
    setRecipe(oldState => ({...oldState, instructions: recipe.instructions.filter(x =>  x !== currentInstruction)}))  
    console.log(recipe);
   
    
    
}


    return (
        <section className="create-recipe-container">
                    <form className="step-1">
                         <h1 className='page-title'>Edit step 1</h1>
                            <div className="recipe-title">
                                <label htmlFor="recipe-title">Title</label>
                                <input type="text" id="title" name="recipe-title" placeholder='e.g.Carrot Banana Bread' defaultValue={recipe.title} required/>
                            </div>

                            <div className="description">
                                <label htmlFor="description">Description</label>
                                <input type="textarea" id="description" name="description" placeholder='e.g.Healthy vegan banana bread made with carrots' defaultValue={recipe.description} required />
                            </div>

                            <div className="level">
                                <label htmlFor="level">Difficulty level</label>
                                <label htmlFor="beginners">
                                    <input type="radio" id="beginners" name="level" value="beginners"  />
                                    Beginners</label>
                                <label htmlFor="intermidiate">
                                    <input type="radio" id="intermidiate" name="level" value="intermidiate" />
                                    Intermidiate</label>
                                <label htmlFor="advanced">
                                    <input type="radio" id="advanced" name="level" value="advanced" />
                                    Advanced</label>
                            </div>

                            <div className="servingSize">
                                <label htmlFor="servingSize">Serving size</label>
                                <input type="number" id="servingSize" name="servingSize" placeholder='e.g.8' defaultValue={recipe.servingSize}required/>-
                                <input type="number" id="servingSize" name="servingSize" placeholder='e.g.10'/>
                            </div>

                            <div className="time">
                                <label htmlFor="time">Total cooking time</label>
                                <input type="number" id="hours" name="time" placeholder='hours' defaultValue={recipe.time} required/>:
                                <input type="number" id="minutes" name="time" placeholder='minutes' required/>

                            </div>

                            <div className="category">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category">
                                    <option value="dinner">Dinner</option>
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="snack">Snack</option>
                                    <option value="salad">Salad</option>
                                </select>
                            </div>

                            <div className="img">
                                <label htmlFor="img">Image link</label>
                                <input type="url" id="img" name="img" defaultValue={recipe.img}required/>
                            </div>
                    </form>

                    <div className="step-2">

                    <h1 className='page-title'>Edit step 2</h1>
                        <h3>Edit or remove and existing ingredient here:</h3>
                            <ul>
                                {recipe.ingredients.map((x) =>
                                <li key={x.ingredient}>
                                    <input type="text" id="ingredient" name="ingredient" placeholder='e.g.Carrots' defaultValue={x.ingredient} required/>
                                    <input type="number" id="quantity" name="quantity" placeholder='e.g.3' defaultValue={x.quantity} required/>
                                    <select name="measures" id="measures" defaultValue={x.measures}>
                                    <option value="cups">Cups</option>
                                    <option value="grams">Grams</option>
                                    <option value="singles">Singles</option>
                                </select>
                                <button onClick={(e) => editIngredient(e)}>Edit</button>
                                <button onClick={(e) => deleteIngredient(e)}>Delete</button>
                                    </li>)}
                            </ul>
                        <form className="step-2">
                            <label htmlFor="ingredient">Add a new ingredient
                                <input type="text" id="ingredient" name="ingredient" placeholder='e.g.Carrots' required/>
                            </label>

                            <label htmlFor="quantity">Select quantity
                                <input type="number" id="quantity" name="quantity" placeholder='e.g.3' required/>
                            </label>

                            <label htmlFor="measures">Select your measuring tool
                                <select name="measures" id="measures">
                                    <option value="cups">Cups</option>
                                    <option value="grams">Grams</option>
                                    <option value="singles">Singles</option>
                                </select>
                            </label>
                            <button onClick={(e) => addNewIngredient(e)}>+</button>
                        </form>

                    </div>
                    
                    <div className="step-3">
                        <h1 className='page-title'>Edit step 3</h1>
                        <h3>Edit or remove an existing instruction here:</h3>
                            <ul>
                                {recipe.instructions.map(x => <li key={x}>
                                    <input type="text" id="instruction" name="instruction" placeholder='e.g Step 1: Preheat oven on 175 degrees C.' defaultValue={x} required/>
                                    <button>Edit</button>
                                    <button onClick={(e) => deleteInstruction(e)}>Delete</button>
                                    </li>)}
                            </ul>
                        <form className="step-3">
                            <label htmlFor="instruction">Add new instruction/step: 
                                <input type="text" id="instruction" name="instruction" placeholder='e.g Step 1: Preheat oven on 175 degrees C.' required/>
                            </label>
                            <button onClick={(e) => addNewInstruction(e)}>+</button>
                        </form>
                    </div>
                   
            </section>
    )
    
}
export default isAuth(RecipeEdit);
