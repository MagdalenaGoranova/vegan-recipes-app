import { NavLink } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import './Header.css';
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService'
import { useNotificationContext } from "../../contexts/NotificationsContext";
import * as profileService from '../../services/profileService';
import TooltipPositionedExample from "../Notifications/Tooltip";

export default function Header() {

    const [profile, setProfile] = useState({});

    const { user, logout } = useContext(AuthContext);

    const { addToast } = useNotificationContext();

    useEffect(() => {
        if(user.accessToken) {
        profileService.getProfile(user.accessToken, user._id)
        .then(result => {
            setProfile(result[0]);
            
        })
        .catch(err => {
            console.log(err);
        })
        }

    }, [user._id, user.accessToken, profile.profileImg]);

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
                <img className="logo-img" src="/images/b8d1d291c74c4189c51457853b3c0350.png" alt="logo"/>
                <h1 className="logo-title"><NavLink to={'/home'}>Healthy Vegan Recipes.</NavLink></h1>
            </article>  
            {user.email ?
                <nav className="header-nav-private">
                    <ul>
                        <li className="private-nav-li"><NavLink to="/all-recipes">All Recipes</NavLink></li>
                        <li className="private-nav-li"><NavLink to="/my-recipes">My Recipes</NavLink></li>
                        <li className="private-nav-li"><NavLink to="/create-recipe">Create Recipe</NavLink></li>
                        <li className="logout-btn"><NavLink onClick={logoutHandler} to="/home">Logout</NavLink></li>     
                    </ul>
                        <TooltipPositionedExample>
                            <NavLink className={"header-btn"} to={`/profile/${user._id}`}  style={{backgroundImage:`url(${profile.profileImg ? profile.profileImg : '/images/default-user-image.png'})`}}>
                            </NavLink>
                        </TooltipPositionedExample>
                        
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