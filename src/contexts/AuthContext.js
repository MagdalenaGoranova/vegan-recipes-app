import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
        const [user, setUser] = useState({});

        const login = (authData) => {
            setUser(authData);
        };
        const logout = () => {
            setUser({});
        }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}