import { useEffect, useState, useContext } from 'react';


import { AuthContext } from '../../contexts/AuthContext';
import './MyProfile.css';
import {isAuth} from '../../HOC/isAuth';
import * as profileService from '../../services/profileService';



 function MyProfile() {

    const [profile, setProfile] = useState({});
    let {user } = useContext(AuthContext);
   

    useEffect(() => {
        profileService.getMyProfile(user.accessToken, user._id)
        .then(result => {
            console.log(result);
            setProfile(result[0]);
            
        })
        .catch(err => {
            console.log(err);
        })

    }, [user._id, user.accessToken])
    return (
        <>
        <h1 className="profile-title">My profile information</h1>
        <div className="profile-page">
            <section className="side-profile-div">
                <div className="profile-img">
                    <h4 className="username"><i className="fa-solid fa-user"></i>{profile.username}</h4>
                    <p><span>Email:</span>{profile.email}</p>
                </div>  
            </section>
            <section className="profile-info">
               
               
            </section>
            
        
        </div>
    </>
        
    )
    
    
}
export default isAuth(MyProfile);