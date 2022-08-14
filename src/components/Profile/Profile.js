import { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { AuthContext } from '../../contexts/AuthContext';
import './Profile.css';
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
         <div className="profile-page">
                <section className="side-profile-div">
                <div className="profile-card">
                    {profile.hasOwnProperty('profileImg') 
                    ? (<img src={profile.profileImg} alt='user'/>)
                    : <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1" alt='user'/>}
                
                </div> 
                {user._id == profile._ownerId 
                        ? <div className='owner-profile-info'>
                            <h4 className="username"><span>Welcome,</span> {profile.username}
                            </h4>
                            
                            <p>Full name: {profile.fullName} </p>
                            
                            <p>{ profile.info != '' ? 'About you:' + ' ' + profile.info : ''}</p>

                            <NavLink className="edit-btn" to='edit-profile'><i class="fa-solid fa-user-pen"></i>Edit Profile</NavLink>
                            
                        </div> 
                        :    <div className='user-profile-info'>
                            <h4 className="username"><span>Username:</span> {profile.username}</h4>
                            <p>Full name: {profile.fullName}</p>
                            <p>{ profile.info != '' ? 'About' + profile.username + ':' + ' ' + profile.info : ''}</p>
                        </div>
                } 
            </section>
         </div> 
        
    )
    
    
}
export default Profile;