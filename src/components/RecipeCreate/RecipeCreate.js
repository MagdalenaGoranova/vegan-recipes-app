import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import './RecipeCreate.css';
import * as recipeService from '../../services/recipeService';
import { AuthContext } from '../../contexts/AuthContext';



export default function RecipeCreate() {

    const user = useContext(AuthContext);
    console.log({user});

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        step: 1,
        title: '',
        description: '',
        level: '',
        servingSize: '',
        time: '',
        category: '',
        img: '',
        ingredients: [],
        instructions: []
    })
    

    function nextStepHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget.parentElement);

        if (e.currentTarget.parentElement.className === 'step-1') {

        let title = formData.get('recipe-title');
        let description = formData.get('description');
        let level = formData.get('level');
        let servingSize = formData.get('servingSize');
        let time = formData.get('time');
        let category = formData.get('category');
        let img = formData.get('img');

        setRecipe({
            ...recipe,
            title: title,
            description: description,
            level: level, 
            servingSize: servingSize,
            time: time,
            category: category,
            img: img,
            step:recipe.step + 1,
        });
        }
        if (e.currentTarget.parentElement.className === 'step-2') {

            setRecipe({
                ...recipe,
                step:recipe.step + 1,
            });

        }
        //TODO: add submit on the whole form and send all data
        if (e.currentTarget.parentElement.className === 'step-3') {
            

        }
    } 
    function previousStepHandler(e) {
       
        setRecipe({
            ...recipe,
            step:recipe.step - 1,
        });
    
    }
    function addIngredientsHandler(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget.parentElement);
       
        let ingredient = formData.get('ingredient');
        let quantity = formData.get('quantity');
        let measures = formData.get('measures');
        

        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, {ingredient, quantity, measures}]
            
        });
        //console.log(recipe);
       
    }
    function addInstructionsHandler(e){
        e.preventDefault();

        let formData = new FormData(e.currentTarget.parentElement);
        let instruction = formData.get('instruction');

        setRecipe({
            ...recipe,
            instructions: [...recipe.instructions, instruction]
        });
        //console.log(recipe);

    }
    function createRecipeHandler(e) {
        console.log(recipe);

        recipeService.createRecipe(recipe, user.user.accessToken)
        .then((result) => {
            console.log(result);
            navigate('/all-recipes');
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <section className="create-recipe-container">
                {recipe.step === 1 ? (
                    <form className="step-1">
                         <h1 className='page-title'>Step 1: Add all the initial information about your recipe</h1>
                            <div className="recipe-title">
                                <label htmlFor="recipe-title">Add Title</label>
                                <input type="text" id="title" name="recipe-title" placeholder='e.g.Carrot Banana Bread' defaultValue={recipe.title} required/>
                            </div>

                            <div className="description">
                                <label htmlFor="description">Add a short description</label>
                                <input type="textarea" id="description" name="description" placeholder='e.g.Healthy vegan banana bread made with carrots' required />
                            </div>

                            <div className="level">
                                <label htmlFor="level">Choose difficulty level</label>
                                <label htmlFor="beginners">
                                    <input type="radio" id="beginners" name="level" value="beginners" defaultChecked />
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
                                <input type="number" id="servingSize" name="servingSize" placeholder='e.g.8' required/>-
                                <input type="number" id="servingSize" name="servingSize" placeholder='e.g.10'/>
                            </div>

                            <div className="time">
                                <label htmlFor="time">Total cooking time</label>
                                <input type="number" id="hours" name="time" placeholder='hours' required/>:
                                <input type="number" id="minutes" name="time" placeholder='minutes' required/>

                            </div>

                            <div className="category">
                                <label htmlFor="category">Choose a category</label>
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
                                <label htmlFor="img">Add an image link</label>
                                <input type="url" id="img" name="img" required/>
                            </div>
                            <button type="submit" onClick={(e)=> nextStepHandler(e)}>Next</button>
                    </form>
                ) : recipe.step === 2 ? (
                    <form className="step-2">
                             <h1 className='page-title'>Step 2: Add all ingredi</h1>
                             <h3>Add ingredients one by one pressing the '+' button</h3>
                            <label htmlFor="ingredient">Add ingredient
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
                            <button type="submit" onClick={(e)=> addIngredientsHandler(e)} className='add-ingredient-btn'>+</button>
                            <h3>When you have added ALL the neccessary ingredients press Next to go to the next step</h3>
                            <h3>Press Previous if you want to go back to the prevous step and add or correct something</h3>
                        <button onClick={(e)=> previousStepHandler(e)}>Previous</button>
                        <button type="submit" onClick={(e)=> nextStepHandler(e)}>Next</button>
                    </form>

                ) : (
                    <form className="step-3">
                            <h1 className='page-title'>Create a recipe: Step 3</h1>
                            <h3>Add simple instrucions/steps one by one pressing the '+' button</h3>
                            <label htmlFor="instruction">Add an instruction/step
                                <input type="text" id="instruction" name="instruction" placeholder='e.g Step 1: Preheat oven on 175 degrees C.' required/>
                            </label>
                            <button type="submit" onClick={(e)=> addInstructionsHandler(e)} className='add-instruction-btn'>+</button>
                       
                            <h3>When you have added ALL the neccessary instructions and your recipe is completed press Create to add recipe to the website</h3>
                            <h3>Press Previous if you want to go back to the prevous step and add or correct something</h3>
                            <button onClick={(e)=> previousStepHandler(e)}>Previous</button>
                        <button className='create-btn' onClick={(e)=> createRecipeHandler(e)}>Create</button>
                    </form>
                )}


            </section>
    )

}