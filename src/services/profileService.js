const baseUrl = 'https://softuni-server-practice.herokuapp.com'; 

export const createProfile = async(profileData, authToken) => {
    const response = await fetch(`${baseUrl}/data/profiles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(profileData)
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}
export const getProfile = async(authToken, ownerId) => {
    const response = await fetch(`${baseUrl}/data/profiles?where=_ownerId%3D%22${ownerId}%22`, {
        headers: {
            'X-Authorization': authToken
        }
    })
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
export const editProfile = async(profileId, authToken, profileData) => {
    const response = await fetch(`${baseUrl}/data/profiles/${profileId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': authToken
        },
        body: JSON.stringify(profileData)
    })
    const result = await response.json()

    if(response.ok) {
        return result;
    } else {
        throw result.message;
    }
}

