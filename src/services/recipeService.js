const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes`);
    return await response.json();
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
    return await response.json();
}
export const getOne = async (recipeId) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes/${recipeId}`);
    return await response.json();
}
export const getMyRecipes = async(ownerId, authToken) => {
    const response = await fetch(`${baseUrl}/data/vegan-recipes?where=_ownerId%3D%22${ownerId}%22`, {
        headers: {
            'X-Authorization': authToken
        }
    });
    return await response.json();
    
}