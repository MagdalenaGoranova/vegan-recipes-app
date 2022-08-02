import { NavLink } from "react-router-dom";

import { useContext } from "react";
import './Header.css';
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService'
import { useNotificationContext } from "../../contexts/NotificationsContext";

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    const { addToast } = useNotificationContext();
    

    function logoutHandler() {
        authService.logout(user.accessToken)
        .then(res => {
            addToast('You are logged out', "success");
            logout();

        })
       
    }
    return (
        <header>
            <article className="logo">
                <h1 className="logo-title"><NavLink to={'/home'}>Healthy Vegan Recipes.</NavLink></h1>
            </article>  
            {user.email ?
                <nav className="header-nav">
                <div className="dropdown">
                <button className="header-btn"></button>
                    <div className="dropdown-content">
                        <p className="greeting">Welcome, {user.username}</p>
                        <NavLink to={`/profile/${user._id}`}>My Profile</NavLink>
                        <NavLink to="/my-recipes">My Recipes</NavLink>
                        <NavLink to="/create-recipe">Create Recipe</NavLink>
                        <NavLink onClick={logoutHandler} to="/home">Logout</NavLink>
                    </div>
                </div>
            </nav>
               
                : (
                    <nav className="header-nav">
                        <ul>
                            <li><NavLink to="/login">Log in</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                            
                        </ul>
                    </nav>
                

                )
            }
            
            
        </header>
    )
}