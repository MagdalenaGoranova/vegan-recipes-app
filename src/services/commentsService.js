const baseUrl = 'https://softuni-server-practice.herokuapp.com'; 

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
export const getComments = async(recipeId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=id%3D%22${recipeId}%22`, {
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
export const getCommentsCount = async(recipeId) => {
    const response = await fetch(`${baseUrl}/data/comments?where=id%3D%22${recipeId}%22&count`, {
        
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