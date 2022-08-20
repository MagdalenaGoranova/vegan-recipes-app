import Dropdown from 'react-bootstrap/Dropdown';

import { useState } from 'react';

import * as recipeService from '../../services/recipeService';

let categories = ['All', 'Breakfast', "Lunch", 'Dinner', 'Soup', 'Salad', 'Snack', 'Side', 'Bevarage', "Bread", 'Dessert'];

function CategoriesNav({updateCards}) {

    const [isClicked, setIsClicked] = useState(categories[0]); 

    function changeCategoryHandler(x) {
        setIsClicked(x);
        if(x == 'All') {
            recipeService.getAll()
            .then(result => {
                updateCards(result);
            })
        } else {
        recipeService.getRecipeByCategory(x.toLowerCase())
        .then(result => {
            updateCards(result);
        })
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

export default CategoriesNav;