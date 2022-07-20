import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import {isAuth} from '../../HOC/isAuth';
import * as profileService from '../../services/profileService';

function ProfileEdit() {
    const [profile, setProfile] = useState({});
    const { user } = useContext(AuthContext);
    const navigate  = useNavigate();

    useEffect(() => {
        profileService.getProfile(user.accessToken, user._id)
        .then(result => {
            setProfile(result[0]);
        })

    },[user.accessToken, user._id])

    function profileEditHandler(e) {
        e.preventDefault();
        console.log(e.currentTarget.parentElement);

        let formData = new FormData(e.currentTarget.parentElement);
        
        let username = formData.get('username');
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let aboutYou = formData.get('aboutYou');
        let imgUrl = formData.get('imgUrl');

        profileService.editProfile(profile._id, user.accessToken, {username, firstName, lastName, aboutYou, imgUrl})
        .then(result => {
            console.log(result);
            navigate(`/profile/${profile._id}`)
            
        })


    }


    return (
        <section className="text-center text-lg-start">
          
          <div className="container py-4">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right" 
                style={{
                    background: 'hsla(0, 0%, 100%, 0.55)',
                    backdropFilter: 'blur(30px)'
                }}>
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Edit profile</h2>
                    <form>
                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3"> Edit username</label>
                        <input type="text" id="form3Example3-2" className="form-control" name="username" defaultValue={profile.username} required/>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Add/Edit first name</label>
                        <input type="text" id="form3Example3-3" className="form-control" name="firstName" defaultValue={profile.firstName}required/>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Add/Edit last name</label>
                        <input type="text" id="form3Example3-4" className="form-control" name="lastName" defaultValue={profile.lastName} required/>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Edit/Add Information about you</label>
                        <input type="text" id="form3Example3-5" className="form-control" name="aboutYou" defaultValue={profile.aboutYou} required/>
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">Edit/Add photo</label>
                        <input type="text" id="form3Example3-6" className="form-control" name="imgUrl" defaultValue={profile.imgUrl} required/>
                      </div>

                      

                      <button onClick={(e )=>profileEditHandler(e)} type="submit" className="btn btn-primary btn-block mb-4">
                        Edit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </section>
    )
  
}
export default isAuth(ProfileEdit);