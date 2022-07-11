import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
        const [user, setUser] = useState({});

        const login = (authData) => {
            setUser(authData);
        };

    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    );

}