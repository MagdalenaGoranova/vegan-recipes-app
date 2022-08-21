import { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { AuthContext } from '../../contexts/AuthContext';
import './Profile.css';
import * as profileService from '../../services/profileService';
import * as recipeService from '../../services/recipeService';
import UserRecipesCard from './UserRecipesCard';

function Profile() {

    const [profile, setProfile] = useState({});

    const [myRecipesCount, setMyRecipesCount] = useState(0);

    const [userRecipes, setUserRecipes] = useState([]);

    const [isHidden, setIsHidden] = useState(true);

    let {user } = useContext(AuthContext);

    let { id } = useParams(); 
   

    useEffect(() => {
        profileService.getProfile(user.accessToken, id)
        .then(result => {
            setProfile(result[0]);
            
        })
        .catch(err => {
            
        })

    }, [id, user.accessToken])

    useEffect(() => {
        recipeService.getMyRecipesCount(id, user.accessToken)
            .then(result => {
                setMyRecipesCount(result);
            })
            .catch(err => {  
            })

    }, [id, user.accessToken]);


    useEffect(() => {
        recipeService.getUserRecipes(id, user.accessToken)
            .then(result => {
                setUserRecipes(result);
            })
            .catch(err => {
            })

    }, [id, user.accessToken]);

    function showRecipes() {
        setIsHidden(!isHidden);
    }

    return (
         <div className="profile-page">
                <section className="side-profile-div">
                <div className="profile-card">
                    {!profile.profileImg
                    ? <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1" alt='user'/>
                    : (<img src={profile.profileImg} alt='user'/>)}
                    
                
                </div> 
                {user._id == profile._ownerId 
                        ? <div className='owner-profile-info'>
                            <h4 className="username"><span>Welcome,</span> {profile.username}
                            </h4>
                            
                            <p>Full name: {profile.fullName} </p>
                            
                            <p>{ profile.info != '' ? 'About you:' + ' ' + profile.info : ''}</p>

                            <NavLink className="edit-btn" to='edit-profile'><i className="fa-solid fa-user-pen"></i>Edit Profile</NavLink>
                            
                        </div> 
                        :    <div className='user-profile-info'>
                            <h4 className="username"><span>Username:</span> {profile.username}</h4>
                            <p>Full name: {profile.fullName}</p>
                            <p>{ profile.info != '' ? 'About' + ' ' + profile.username + ':' + ' ' + profile.info : ''}</p>
                            <p>User has created: {myRecipesCount} recipes</p>
                            </div>
                } 
            </section>
            {user._id !== profile._ownerId 
            ? <div className='user-recipes-container'>
                <p className='user-recipes-container-title'>Show {profile.username}'s recipes<i className={`fa-solid ${isHidden ? 'fa-chevron-down' : 'fa-chevron-up'}`} onClick={() => showRecipes()}></i></p>
                <div className={`user-recipes ${isHidden ? 'hidden': ''}` }>
                    {userRecipes.length > 0
                        ? <section className="recipes-container">
                            {userRecipes.map(recipe => <UserRecipesCard key={recipe._id} userRecipe={recipe} />)}
                        </section>
                
                        : <h1 className='no-recipes'>No recipes to show yet!</h1>
                    }
                </div>
            </div>
            : ''}

         </div> 
        
    )
    
    
}
export default Profile;