import { NavLink } from "react-router-dom";

import { useContext } from "react";
import './Header.css';
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
    const { user } = useContext(AuthContext);
    return (
        <header>
            <article className="logo">
                <h1 className="logo-title">Healthy Vegan Recipes</h1>
            </article>  
            {user.email ?
                <nav className="header-nav">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/all-recipes">All Recipes</NavLink></li>
                </ul>
                <div className="dropdown">
                <button className="header-btn"></button>
                    <div className="dropdown-content">
                        <p className="greeting">Welcome, {user.email}</p>
                        <NavLink to="/my-profile">My Profile</NavLink>
                        <NavLink to="/my-recipes">My Recipes</NavLink>
                        <NavLink to="/create-recipe">Create Recipe</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                    </div>
                </div>
            </nav>
               
                : (
                    <nav className="header-nav">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/all-recipes">All Recipes</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </ul>
            </nav>
                

                )
            }
            
            
        </header>
    )
}