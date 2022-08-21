import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import './RecipeCreate.css';
import { AuthContext } from '../../contexts/AuthContext';
import * as recipeService from '../../services/recipeService';
import { useNotificationContext } from '../../contexts/NotificationsContext'; 


function RecipeCreate() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { addAlert, addToast } = useNotificationContext();

    const [recipe, setRecipe] = useState({
        step: 1,
        author: user.username,
        title: '',
        description: '',
        level: 'beginners',
        servingSize: '',
        hours: '',
        minutes:'',
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
            let hours = formData.get('hours');
            let minutes = formData.get('minutes');
            let category = formData.get('category');
            let img = formData.get('img');

            let isValid = true; 

            if(title == '') {
                addToast('Title is required!');
                isValid = false; 
            }
            if(description == '') {
                addToast('Description is required!');
                isValid = false; 

            }
            if(servingSize == '') {
                addToast('Serving size is required!');
                isValid = false; 
            }
            if(hours == '' && minutes == '') {
                addToast('Hours or minutes are required!');
                isValid = false; 
            }
            if(img == '') {
                addToast('Image url is required!');
                isValid = false; 
            }
            if(minutes > 59  ||  minutes < 0) {
                addToast('Minutes range should be between 1 and 59');
                isValid = false; 
            }
            if (isValid) {
                setRecipe({
                    ...recipe,
                    author: user.username,
                    title: title,
                    description: description,
                    level: level,
                    servingSize: servingSize,
                    hours: hours,
                    minutes: minutes,
                    category: category,
                    img: img,
                    step: recipe.step + 1,
                });
            }
            
        }
        if (e.currentTarget.parentElement.className === 'step-2') {

            setRecipe({
                ...recipe,
                step: recipe.step + 1,
            });

        }
    }
    function previousStepHandler(e) {

        setRecipe({
            ...recipe,
            step: recipe.step - 1,
        });

    }
    function addIngredientsHandler(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget.parentElement);

        let ingredient = formData.get('ingredient');
        let quantity = formData.get('quantity');
        let measures = formData.get('measures');

        let isValid = true; 

        if(ingredient == '') {
            addToast('Ingredient is required!')
            isValid = false; 
        }
        if(quantity == '') {
            addToast('Quantity is required!')
            isValid = false; 
        }
        if(measures == '') {
            addToast('Measure is required!')
            isValid = false; 
        }
        if(recipe.ingredients.length > 0) {
            isValid = true; 
        }
        if((recipe.ingredients.filter(x => x.ingredient == ingredient)).length > 0) {
            addToast('Ingredient is already added!')
            isValid= false; 

        }
        if (isValid) {
            setRecipe({
                ...recipe,
                ingredients: [...recipe.ingredients, { ingredient, quantity, measures }]
    
            });
        }
        e.currentTarget.parentElement.reset();
    }
    function addInstructionsHandler(e) {
        e.preventDefault();

        let formData = new FormData(e.currentTarget.parentElement);
        let instruction = formData.get('instruction');

        let isValid = true; 

        if(instruction == '') {
            addToast('Instruction is required!')
            isValid = false; 
        }
        if(recipe.instructions.length > 0) {
            isValid = true;
        }
        if(recipe.instructions.includes(instruction)) {
            addToast('Instruction is already added!')
            isValid= false; 

        }
        if(isValid) {
            setRecipe({
                ...recipe,
                instructions: [...recipe.instructions, instruction]
            });
        }
        e.currentTarget.parentElement.reset();
    }
    function createRecipeHandler(e) {
        e.preventDefault();
        recipeService.createRecipe(recipe, user.accessToken)
            .then((result) => {
                navigate('/all-recipes');
                addAlert('You successfully created a recipe!', 'success');
            })
            .catch(err => {
                console.log(err);
            })
    }
    function deleteInstruction(e) {
        e.preventDefault();
        let currentInstruction = e.currentTarget.parentElement.textContent;
        setRecipe(oldState => ({...oldState, instructions: recipe.instructions.filter(x =>  x !== currentInstruction)}))   
         
    }
    function deleteIngredient(e) {
        e.preventDefault();
        let currentIngredient = e.currentTarget.parentElement.childNodes[0].textContent;
        setRecipe(oldState => ({...oldState, ingredients: recipe.ingredients.filter(x =>  x.ingredient !== currentIngredient)}))  
    }
    function checkRadioButton(level) {
        if(level == 'beginners') {
            return <Form.Group className="mb-3">
                <Form.Label>Difficulty level</Form.Label>
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Beginners`}
                name="level"
                value={'beginners'}
                defaultChecked
                />
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Intermediate`}
                name="level"
                value={'intermediate'}
                />
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Advanced`}
                name="level"
                value={'advanced'}
                />         
            </Form.Group>
        }
        if(level == 'intermediate') {
            return <Form.Group className="mb-3">
                <Form.Label>Difficulty level</Form.Label>
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Beginners`}
                name="level"
                value={'beginners'}
               
                />
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Intermediate`}
                name="level"
                value={'intermediate'}
                defaultChecked
                />
                <Form.Check 
                type={'radio'}
                id={`default-radio`}
                label={`Advanced`}
                name="level"
                value={'advanced'}
                />         
            </Form.Group>

        }
        if(level == 'advanced') {
            return <Form.Group className="mb-3">
            <Form.Label>Difficulty level</Form.Label>
            <Form.Check 
            type={'radio'}
            id={`default-radio`}
            label={`Beginners`}
            name="level"
            value={'beginners'}
           
            />
            <Form.Check 
            type={'radio'}
            id={`default-radio`}
            label={`Intermediate`}
            name="level"
            value={'intermediate'}
            
            />
            <Form.Check 
            type={'radio'}
            id={`default-radio`}
            label={`Advanced`}
            name="level"
            value={'advanced'}
            defaultChecked
            />         
        </Form.Group>
        }
    }

    return (
        <section className="create-recipe-container">
            {recipe.step === 1 ? (
                <div className='step-1-div'>
                    <h3 className='step1-title'>Add the initial information about your recipe</h3>
                    <Form className='step-1'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="e.g. Carrot Banana Bread" name="recipe-title" defaultValue={recipe.title}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" type="text" placeholder="e.g.Healthy vegan banana bread made with carrots" name="description" defaultValue={recipe.description}/>
                        </Form.Group>

                        {checkRadioButton(recipe.level)}
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Serving size</Form.Label>
                            <Form.Control type="number" placeholder="e.g.2" name="servingSize" defaultValue={recipe.servingSize}/>
                        </Form.Group>
                        <Form.Group className="mb-3 time" controlId="formBasicEmail">
                            <Form.Label>Cooking Time</Form.Label>
                            <Form.Control type="number" placeholder="hours" name="hours" defaultValue={recipe.hours}/>
                            <p>:</p>
                            <Form.Control type="number" placeholder="minutes" name="minutes" defaultValue={recipe.minutes} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name='category' defaultValue={recipe.category}>
                            <option value="dinner">Dinner</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="snack">Snack</option>
                            <option value="salad">Salad</option>
                            <option value="side">Side</option>
                            <option value="bread">Bread</option>
                            <option value="bevarage">Bevarage</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control type="url"  name="img" defaultValue={recipe.img}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="next-btn" onClick={(e) => nextStepHandler(e)}>
                            Next
                        </Button>
                    </Form>
                    </div>
                
            ) : recipe.step === 2 ? (
                <div className='step-2-div'>
                <h3 className='step2-title'>Add all ingredients</h3>
                <div className='div-to-flex'>
                <Form className='step-2'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ingredient</Form.Label>
                                <Form.Control type="text" placeholder="Carrots" name="ingredient"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="3" name="quantity"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Measurement</Form.Label>
                                <Form.Select aria-label="Default select example" name='measures'>
                                <option value="cups">Cups</option>
                                <option value="grams">Grams</option>
                                <option value="singles">Singles</option>
                                <option value="teaspoons">Teaspoons</option>
                                <option value="tablespoons">Tablespoons</option>
                                </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="add-btn" onClick={(e) => addIngredientsHandler(e)}>
                           Add ingredient
                    </Button>
                    <Button variant="primary" type="submit" className="previous-btn"onClick={(e) => previousStepHandler(e)}>
                            Previous
                    </Button>
                    <Button variant="primary" type="submit" className="next-btn" onClick={(e) => nextStepHandler(e)}>
                            Next
                    </Button>

                </Form>
                <div className='ul-container'>
                    <p>Ingredients</p>
                <ul className='ingredients-ul'>
                        {recipe.ingredients.map(recipe => <li key={recipe.ingredient}>{recipe.ingredient} - {recipe.quantity} {recipe.measures}
                            <button className='del-btn' onClick={(e) => deleteIngredient(e)}><i className="fa-solid fa-trash-can"></i></button>
                        </li>)}
                </ul>
                </div>

                </div>
                </div>

            ) : (
                <div className='step-3-div'>
                    <h3 className='step-3-title'>Add all instructions</h3>
                    <div className='div-to-flex'>
                    <Form className='step-3'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Instruction/Step</Form.Label>
                            <Form.Control type="text" placeholder="Preheat the oven on 200 degrees" name="instruction"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="add-btn" onClick={(e) => addInstructionsHandler(e)}>
                          Add instruction
                    </Button>
                    <Button variant="primary" type="submit" className="previous-btn" onClick={(e) => previousStepHandler(e)}>
                            Previous
                    </Button>
                    <Button variant="primary" type="submit" className='create-btn' onClick={(e) => createRecipeHandler(e)}>
                           Create
                    </Button>
                    </Form>
                    <div className='ul-container'>
                    <p>Instructions</p>
                    <ul className="instructions-ul">
                        {recipe.instructions.map(instruction => <li key={instruction}>{instruction}
                            <button className='del-btn' onClick={(e) => deleteInstruction(e)}><i className="fa-solid fa-trash-can"></i></button>
                        </li>)}
                    </ul>
                    </div>
                </div>
                </div>
            )}


        </section>
    )

}
export default RecipeCreate;
