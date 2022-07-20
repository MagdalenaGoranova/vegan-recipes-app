const baseUrl = 'http://localhost:3030'; 

export const createProfile = async(profileData, authToken) => {
    const response = await fetch(`${baseUrl}/data/profiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(profileData)
    })
    return await response.json();
}
export const getMyProfile = async(authToken, userId) => {
    const response = await fetch(`${baseUrl}/data/profiles?where=_ownerId%3D%22${userId}%22`, {
        headers: {
            'X-Authorization': authToken
        }
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}