const baseUrl = 'https://softuni-server-practice.herokuapp.com'; 

export const rateRecipe = async(authToken, ratingData) => {
    const response = await fetch(`${baseUrl}/data/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(ratingData)
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const getRate = async(recipeId) => {
    const response = await fetch(`${baseUrl}/data/ratings?where=id%3D%22${recipeId}%22`, {
    });
    if(response.status !== 200) {
        console.log(response.status);
    } else {
        const result = await response.json()
        if(response.ok) {
            return result;
        } else {
            throw result.message;
        }
    }

}