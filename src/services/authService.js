const baseUrl = 'https://softuni-server-practice.herokuapp.com';

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
export const register = async (email, password, username, fullName, profileImg, info) => {
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, username, fullName, profileImg, info})
        
    });

    let jsonResult = await response.json();
    

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
    return response
    // let jsonResult = await response.json();


    // if(response.ok) {
    //     return jsonResult;
    // } else {
    //     throw jsonResult.message;
    // }
   
}


