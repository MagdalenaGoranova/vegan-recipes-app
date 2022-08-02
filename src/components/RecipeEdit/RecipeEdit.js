import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeEdit.css'
import { AuthContext } from "../../contexts/AuthContext";

import * as recipeService from '../../services/recipeService';

function RecipeEdit() {

    let { id } = useParams();

    let { user } = useContext(AuthContext);

    let navigate = useNavigate();

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
    let currentIngredient = e.currentTarget.parentElement.childNodes[0].textContent;
    setRecipe(oldState => ({...oldState, ingredients: recipe.ingredients.filter(x =>  x.ingredient !== currentIngredient)}))  
    
}


function deleteInstruction(e) {
    e.preventDefault();
    let currentInstruction = e.currentTarget.parentElement.childNodes[3].textContent;
    setRecipe(oldState => ({...oldState, instructions: recipe.instructions.filter(x =>  x !== currentInstruction)}))  
     
}
function getFormData(e) {
    e.preventDefault();
    let formData  = new FormData(e.currentTarget.parentElement);

    let title = formData.get('recipe-title');
    let description = formData.get('description');
    let level = formData.get('level');
    let servingSize = formData.get('servingSize');
    let time = formData.get('time');
    let category = formData.get('category');
    let img = formData.get('img');

    setRecipe( oldState => ({
        ...oldState, 
        ...recipe,
        author: user.username,
        title: title,
        description: description,
        level: level, 
        servingSize: servingSize,
        time: time,
        category: category,
        img: img,
    })); 
}

function editSubmitHandler() {

    recipeService.editRecipe(id, user.accessToken, recipe)
    .then(result => {
        console.log(result);
        navigate('/my-recipes')
        
    })
}

    return (
        <section className="edit-recipe-container">
                    <form className="step-1-form" >
                         <h1 className='step-title'>Edit step 1</h1>
                            <div className="edit-recipe-title">
                                <label htmlFor="recipe-title">Title</label>
                                <input type="text" id="title" name="recipe-title" placeholder='e.g.Carrot Banana Bread' defaultValue={recipe.title} required />
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
                                <input type="number" id="servingSize" name="servingSize" placeholder='e.g.8' defaultValue={recipe.servingSize}required/>
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
                                <input type="url" id="img" name="img" defaultValue={recipe.img}/>
                            </div>
                            <button className="edit-submit-btn" onClick={(e) => getFormData(e)}>Save changes</button>
                    </form>

                    <div className="step-2">

                    <h1 className='step-title'>Edit step 2</h1>
                        <h4 className="step-info">Remove or add new ingredients here:</h4>
                            <ul className="ingredients-list">
                                {recipe.ingredients.map((x) =>
                                <li key={x.ingredient}>
                                    <span>{x.ingredient}</span> - {x.quantity} {x.measures}
                                    <button onClick={(e) => deleteIngredient(e)}><i class="fa-solid fa-trash-can"></i></button>
                                </li>)}
                            </ul>
                        <form className="step-2-form">
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
                        <h1 className='step-title'>Edit step 3</h1>
                        <h4 className="step-info">Remove or add new instructions here:</h4>
                            <ul className="instructions-list">
                                {recipe.instructions.map((x, i) => 
                                <li key={x}>
                                    Step {i + 1}: <span>{x}</span>
                                    <button onClick={(e) => deleteInstruction(e)}><i class="fa-solid fa-trash-can"></i></button>
                                </li>)}
                            </ul>
                        <form className="step-3-form">
                            <label htmlFor="instruction">Add new instruction/step: 
                                <input type="text" id="instruction" name="instruction" placeholder='e.g Step 1: Preheat oven on 175 degrees C.' required/>
                            </label>
                            <button onClick={(e) => addNewInstruction(e)}>+</button>
                        </form>
                    </div>
                    <button className="edit-submit-btn" onClick={(e) => editSubmitHandler(e)}>Save changes</button>
            </section>
    )
    
}
export default RecipeEdit;
