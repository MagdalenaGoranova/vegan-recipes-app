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