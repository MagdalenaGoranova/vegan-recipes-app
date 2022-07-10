const baseUrl = 'http://localhost:3030';

export const login = async (email, password) => {
    const response = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        
    });

    let jsonResult = await response.json();

    if(response.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}
export const register = async (firstName, lastName, email, password, username, info, image) => {
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email, password, username, info, image})
        
    });

    let jsonResult = await response.json();
    console.log(jsonResult);

    if(response.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}
export const getMyProfileInfo = async(authToken) => {
    const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
            'X-Authorization': authToken
        }  
    });

    let jsonResult = await response.json();
    console.log(jsonResult);

    if(response.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}
export const logout = async(authToken) => {
    const response = await fetch(`${baseUrl}/users/logout`, {
        headers: {
            'X-Authorization': authToken
        }
      
    });
    console.log(response);  
}


