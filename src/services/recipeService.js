const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/jsonstore/vegan-recipes`);
    return await response.json();
}
export const createRecipe = async(recipeData) => {
    const response = await fetch(`${baseUrl}/collectionss/vegan-recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': 'accessToken'
        },
        body: JSON.stringify(recipeData)
    })
    return await response.json();
}
