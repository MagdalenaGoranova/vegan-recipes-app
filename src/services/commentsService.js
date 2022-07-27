const baseUrl = 'http://localhost:3030'; 

export const commentRecipe = async(authToken, commentData) => {
    const response = await fetch(`${baseUrl}/data/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(commentData)
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const getComments = async(authToken, recipeId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=id%3D%22${recipeId}%22`, {
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
export const getCommentsCount = async(authToken, recipeId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=id%3D%22${recipeId}%22&count`, {
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