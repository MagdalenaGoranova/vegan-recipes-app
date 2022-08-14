import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './RecipeEdit.css'
import { AuthContext } from "../../contexts/AuthContext";
import * as recipeService from '../../services/recipeService';
import { useNotificationContext } from '../../contexts/NotificationsContext'; 

function RecipeEdit() {

    let { id } = useParams();

    let { user } = useContext(AuthContext);

    let navigate = useNavigate();

    const { addAlert, addToast } = useNotificationContext();

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

    let isValid = true; 

    if((recipe.ingredients.filter(x => x.ingredient == ingredient)).length > 0) {
        addToast('Ingredient is already added!')
        isValid= false; 
    }
    
    if(isValid) {
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, {ingredient, quantity, measures}]
            
        });
    }
    e.currentTarget.parentElement.reset();
  
}

function addNewInstruction(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget.parentElement);
    let instruction = formData.get('instruction');

    let isValid = true; 
    
    if(recipe.instructions.includes(instruction)) {
        addToast('Instruction is already added!');
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
function deleteIngredient(e) {
    let currentIngredient = e.currentTarget.parentElement.childNodes[1].textContent;
    setRecipe(oldState => ({...oldState, ingredients: recipe.ingredients.filter(x =>  x.ingredient !== currentIngredient)}))  
    
}

function deleteInstruction(e) {
    e.preventDefault();
    
    let currentInstruction = e.currentTarget.parentElement.childNodes[1].textContent;
    setRecipe(oldState => ({...oldState, instructions: recipe.instructions.filter(x =>  x !== currentInstruction)}))  
     
}
function handleChange(e) {
    let value = e.currentTarget.value;
    let name = e.currentTarget.name;
    let obj = {};
    obj[name] = value;
    setRecipe({
        ...recipe, 
        ...obj,
    })

}
function editSubmitHandler() {

    let isValid = true; 

    if(recipe.title == '') {
        addToast('Title is required!');
        isValid = false; 
    }
    if(recipe.description == '') {
        addToast('Description is required!');
        isValid = false; 

    }
    if(recipe.servingSize == '') {
        addToast('Serving size is required!');
        isValid = false; 
    }
    if(recipe.hours == '' && recipe.minutes == '') {
        addToast('Hours or minutes are required!');
        isValid = false; 
    }
    if(recipe.img == '') {
        addToast('Image url is required!');
        isValid = false; 
    }
    if(recipe.minutes > 59  && recipe.minutes < 0) {
        addToast('Minutes range should be between 0 and 59');
        isValid = false; 
    }
    if(recipe.ingredients.length == 0) {
        addToast('You should have at least 1 ingredient');
        isValid = false; 

    }
    if(recipe.instructions.length == 0) {
        addToast('You should have at least 1 instruction/step');
        isValid = false; 

    }
    if(isValid) {
        recipeService.editRecipe(recipe._id, user.accessToken, recipe)
    .then(result => {
        console.log(result);
        navigate(`/recipe/details/${recipe._id}`)
        addAlert('You successfully edited your recipe!', 'success');
        console.log(recipe);
        
    })

    }
    
}
    return (
        <div className="edit-page">
        <section className="edit-recipe-container">
            <div className="step-1-edit">
            <Form className="step1-edit-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={recipe.title} onChange={(e) => handleChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea"  type="text" name="description" value={recipe.description} onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author"  value={recipe.author} disabled/>
                </Form.Group>
                <Form.Group className="mb-3 time" controlId="formBasicEmail">
                            <Form.Label>Cooking Time</Form.Label>
                            <Form.Control type="number" placeholder="hours" name="hours" value={recipe.hours} onChange={(e) => handleChange(e)} />
                            <p>:</p>
                            <Form.Control type="number" placeholder="minutes" name="minutes" value={recipe.minutes} onChange={(e) => handleChange(e)} />
                        </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Serving size</Form.Label>
                    <Form.Control type="text" name="servingSize" value={recipe.servingSize} onChange={(e) => handleChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Default select example" name='category' value={recipe.category} onChange={(e) => handleChange(e)}>
                            <option value="dinner">Dinner</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="snack">Snack</option>
                            <option value="salad">Salad</option>
                        </Form.Select>
                    </Form.Group>
                <Form.Group className="mb-3">
                        <Form.Label>Difficulty level</Form.Label>
                        <Form.Check 
                            type={'radio'}
                            id={`default-radio`}
                            label={`Beginners`}
                            name="level"
                            value="beginners"
                            checked={recipe.level == 'beginners'}
                            onChange={(e) => handleChange(e)}
                           
                        />
                        <Form.Check 
                            type={'radio'}
                            id={`default-radio`}
                            label={`Intermediate`}
                            name="level"
                            value='intermediate'
                            checked= {recipe.level == 'intermediate'}
                            onChange={(e) => handleChange(e)}
                            />
                        <Form.Check 
                            type={'radio'}
                            id={`default-radio`}
                            label={`Advanced`}
                            name="level"
                            value='advanced'
                            checked = {recipe.level == 'advanced'}
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control type="url"  name="img" value={recipe.img} onChange={(e) => handleChange(e)} />
                    </Form.Group>
                </Form>
                <div className="recipe-img">
                    <img src={recipe.img} alt="recipe-img"/>
                </div>
            </div>

            <div className="step-2-edit">
                <div className="ingredients-continer">
                <Form className="step2-edit-form">
                    <Form.Group className="mb-3 ingredients-form" controlId="formBasicPassword">
                            <Form.Control type="text" name="ingredient" placeholder="Ingredient"/>
                            <Form.Control type="text" name="quantity" placeholder="Quantity"/>
                            <Form.Select aria-label="Default select example" name='measures' placeholder="Measurement">
                            <option value="cups">Cups</option>
                            <option value="grams">Grams</option>
                            <option value="singles">Singles</option>
                            </Form.Select>
                        </Form.Group>
                   <Button variant="primary" type="submit" className="add-btn-edit" onClick={(e) => addNewIngredient(e)}>
                        +
                    </Button>
                </Form>
                <ul className="ingredients-list">
                                {recipe.ingredients.map((x) =>
                                <li key={x.ingredient}>
                                    <span>{x.quantity} {x.measures}</span>{x.ingredient}
                                    <Button className="delete-btn-edit" onClick={(e) => deleteIngredient(e)}>-</Button>
                                </li>)}
                </ul>
                </div>

            </div>
                    
            <div className="step-3-edit">
                <Form className="step3-edit-form">
                    <Form.Group className="mb-3 instructions-form" controlId="formBasicPassword">
                        <Form.Control type="text" name="instruction" placeholder="Instruction/Step"/>
                    </Form.Group>
                     <Button variant="primary" type="submit"  className="add-btn-edit" onClick={(e) => addNewInstruction(e)}>
                        +
                    </Button>
                </Form>

                <ul className="instructions-list">
                                {recipe.instructions.map((x, i) => 
                                <li key={x}>
                                    <span>Step {i + 1}:</span>{x}
                                    <Button className="delete-btn-edit" onClick={(e) => deleteInstruction(e)}>-</Button>
                                </li>)}
                </ul>
            </div>
                    <Button className="edit-submit-btn" variant="primary" type="submit" onClick={(e) => editSubmitHandler(e)}>Edit</Button>
            </section>
        </div>
    )
    
}
export default RecipeEdit;
