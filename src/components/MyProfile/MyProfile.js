import { useContext } from "react";

import './MyProfile.css';
import { AuthContext } from "../../contexts/AuthContext";
import { isAuth } from "../../HOC/isAuth";

 function MyProfile() {
    const { user } = useContext(AuthContext);
    return (
        <>
        <h1 className="profile-title">My profile information</h1>
        <div className="profile-page">
            <section className="side-profile-div">
                <div className="profile-img">
                    <img src={user.image} alt="profileImage"/>
                    <h4 className="username"><i className="fa-solid fa-user"></i>{user.username}</h4>
                </div>  
            </section>
            <section className="profile-info">
                <p><span>First Name:</span>{user.firstName}</p>
                <p><span>Last Name:</span>{user.lastName}</p>
                <p><span>Email:</span>{user.email}</p>
                <p><span>About you:</span>{user.info}</p>
            </section>
            
        
        </div>
    </>
        
    )
    
    
}
export default isAuth(MyProfile);