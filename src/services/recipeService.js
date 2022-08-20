const baseUrl = 'https://softuni-server-practice.herokuapp.com';

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes`);

    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const createRecipe = async(recipeData, authToken) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(recipeData)
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const getOne = async (recipeId) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes/${recipeId}`);
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const getMyRecipes = async(ownerId, authToken) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes?where=_ownerId%3D%22${ownerId}%22`, {
        headers: {
            'X-Authorization': authToken
        }
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
    
}
export const getUserRecipes = async(ownerId, authToken) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes?where=_ownerId%3D%22${ownerId}%22`, {
        headers: {
            'X-Authorization': authToken
        }
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
    
}
export const getMyRecipesCount = async(ownerId, authToken,) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes?where=_ownerId%3D%22${ownerId}%22&count`, {
        headers: {
            'X-Authorization': authToken
        }
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }

}

export const deleteRecipe = async(recipeId, authToken) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': authToken
        }
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
    
}
export const editRecipe = async(recipeId, authToken, recipeData) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(recipeData)
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
    
}
export const getRecipeByCategory = async(category) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes?where=category%3D%22${category}%22`, {
    });
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }

}







