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
export const register = async (email, password) => {
    const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        
    });

    let jsonResult = await response.json();
    console.log(jsonResult);

    if(response.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    }
}

