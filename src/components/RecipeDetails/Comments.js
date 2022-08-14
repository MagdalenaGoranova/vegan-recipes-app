import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import * as profileService from '../../services/profileService';


function Comments({comment}) {

    let [profile, setProfile] = useState([]); 

    let { user } = useContext(AuthContext); 


    useEffect(() => {
        profileService.getProfile(user.accessToken, comment._ownerId)
        .then(result => {
            setProfile(result[0])
        })

    }, [user.accessToken, comment._ownerId]);

    if(profile == undefined) {
        return <p>Loading..</p>
    }

   

    return (
        <div className="comment-container">
            <p><span>{profile.username}</span> says:</p>
            <p>{comment.comment} <i class="fa-regular fa-trash-can" ></i></p>
           
        </div>
    )
}      
export default Comments;
