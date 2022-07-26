import { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';


import { AuthContext } from '../../contexts/AuthContext';
import './Profile.css';
import {isAuth} from '../../HOC/isAuth';
import * as profileService from '../../services/profileService';

function Profile() {

    const [profile, setProfile] = useState({});
    let {user } = useContext(AuthContext);

    let { id } = useParams(); 
   

    useEffect(() => {
        profileService.getProfile(user.accessToken, id)
        .then(result => {
            console.log(result);
            setProfile(result[0]);
            
        })
        .catch(err => {
            console.log(err);
        })

    }, [id, user.accessToken])
    console.log(profile);
    // TODO: Check if own profile to show different info and buttons 
    return (
        <>
        <div className="profile-page">
            <section className="side-profile-div">
                <div className="profile-card">
                    {profile.hasOwnProperty('imgUrl') 
                    ? (<img src={profile.imgUrl} alt='user'/>)
                    : <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1" alt='user'/>}
                   
                </div> 
                <div className='profile-info'>
                    <h4 className="username">Hello, {profile.username}</h4>
                    <p>First name: {profile.firstName}</p>
                    <p>Last name: {profile.lastName}</p>
                    <p>About you: {profile.aboutYou}</p>


                    <NavLink to='edit-profile'><i class="fa-solid fa-user-pen"></i>Edit profile</NavLink>
                </div>
            </section>
        </div>
    </>
        
    )
    
    
}
export default isAuth(Profile);