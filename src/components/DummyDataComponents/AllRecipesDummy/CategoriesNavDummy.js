import Dropdown from 'react-bootstrap/Dropdown';

import { useState } from 'react';

import * as recipeService from '../../../services/recipeService';

let categories = ['All', 'Breakfast', "Lunch", 'Dinner', 'Soup', 'Salad', 'Snack', 'Side', 'Bevarage', "Bread", 'Dessert'];

function CategoriesNavDummy({updateCards}) {

    const [isClicked, setIsClicked] = useState(categories[0]); 
    const [recipes, setRecipes] = useState({})

    function changeCategoryHandler(x) {
        setIsClicked(x);
        if(x == 'All') {
            recipeService.getAllDummy()
            .then(result => {
                setRecipes(Object.values(result));
                updateCards(Object.values(result));
            })
        } else if (x == 'Breakfast'){
          let breakfastRecipes = recipes.filter(x =>x.category == 'Breakfast'); 
          updateCards(breakfastRecipes);
        }else if (x == 'Lunch'){
          let lunchRecipes = recipes.filter(x =>x.category == 'Lunch'); 
          updateCards(lunchRecipes);
        }else if (x == 'Dinner'){
          let dinnerRecipes = recipes.filter(x =>x.category == 'Dinner'); 
          updateCards(dinnerRecipes);
        }else if (x == 'Soup'){
          let soupRecipes = recipes.filter(x =>x.category == 'Soup'); 
          updateCards(soupRecipes);
        }else if (x == 'Salad'){
          let saladRecipes = recipes.filter(x =>x.category == 'Salad'); 
          updateCards(saladRecipes);
        } else if (x == 'Snack'){
          let snackRecipes = recipes.filter(x =>x.category == 'Snack'); 
          updateCards(snackRecipes);
        }else if (x == 'Side'){
          let sideRecipes = recipes.filter(x =>x.category == 'Side'); 
          updateCards(sideRecipes);
        }else if (x == 'Bevarage'){
          let bevarageRecipes = recipes.filter(x =>x.category == 'Bevarages'); 
          updateCards(bevarageRecipes);
        }else if (x == 'Dessert'){
          let dessertRecipes = recipes.filter(x =>x.category == 'Dessert'); 
          updateCards(dessertRecipes);
        }else if (x == 'Bread'){
          let breadRecipes = recipes.filter(x =>x.category == 'Breads'); 
          updateCards(breadRecipes);
        }

  
        

    }
    return (
    <Dropdown className="dropdown-menu-categories">
        <p className='sort-by'>Sort by: </p>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {isClicked}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories.map(x =><Dropdown.Item key={x} as="button" onClick={() => changeCategoryHandler(x)}>{x}</Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoriesNavDummy;