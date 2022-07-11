import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const isAuth = (Component) => {
    const WrapperComponent = (props) => {
        const { user } = useContext(AuthContext);

        return user.accessToken 
        ? <Component {...props}/>
        : <Navigate to={'/login'}/>

    }
    return WrapperComponent
}