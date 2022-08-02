import { useContext } from "react"
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext"


const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    return user.email 
    ? <Outlet />
    : <Navigate to={'/login'}/>
}
export default PrivateRoute