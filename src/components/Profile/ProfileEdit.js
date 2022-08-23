import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import { AuthContext } from '../../contexts/AuthContext';
import * as profileService from '../../services/profileService';

function ProfileEdit() {
    const [profile, setProfile] = useState({});

    const { user } = useContext(AuthContext);

    const navigate  = useNavigate();

    const [validate, setValidate] = useState({
      username: {isValid: true, isInvalid: false},
      fullName: {isValid: true, isInvalid: false},
    });

    useEffect(() => {
        profileService.getProfile(user.accessToken, user._id)
        .then(result => {
            setProfile(result[0]);
        })

    },[user.accessToken, user._id])


    function validateInput(e) {
      if(e.currentTarget.name == 'username') {
        if(e.currentTarget.value == '' || e.currentTarget.value.length < 3 ) {
          setValidate(oldState => ({
            ...oldState,
            username: {
              isInvalid: true,
              isValid: false,
            } 
          }))
        } else {
          setValidate(oldState => ({
            ...oldState,
            username: {
              isInvalid: false,
              isValid: true,
            } 
          }))
        }

      }
      if(e.currentTarget.name == 'fullName') {
        if(e.currentTarget.value == '' || e.currentTarget.value.length < 3 ) {
          setValidate(oldState => ({
            ...oldState,
            fullName: {
              isInvalid: true,
              isValid: false,
            } 
          }))
        } else {
          setValidate(oldState => ({
            ...oldState,
            fullName: {
              isInvalid: false,
              isValid: true,
            } 
          }))
        }

      }
    }

    function profileEditHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget.parentElement);
        
        let username = formData.get('username');
        let fullName = formData.get('fullName');
        let info = formData.get('aboutYou');
        let profileImg = formData.get('profile-img');

        if(validate.username.isValid && validate.fullName.isValid) {
        profileService.editProfile(profile._id, user.accessToken, {username, fullName, info, profileImg})
        .then(result => {
            navigate(`/profile/${profile._ownerId}`)
            profileService.getProfile(user.accessToken, user._id)
            .then(result => {
                setProfile(result[0]);
            })
            
        })
      }


    }

    return (
        <section className="text-center text-lg-start">
          
          <div className="container py-4">
            <div className="row g-0 align-items-center profile-edit-page">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right" 
                style={{
                    background: 'hsla(0, 0%, 100%, 0.55)',
                    backdropFilter: 'blur(30px)'
                }}>
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Edit profile</h2>
                    <Form className="profile-edit-form">
                      <Form.Group className="form-outline mb-4">
                      <Form.Label className="form-label" htmlFor="form3Example3"> Edit username</Form.Label>
                        <Form.Control type="text" id="form3Example3-2" className="form-control" name="username" defaultValue={profile.username} required isValid={validate.username.isValid} isInvalid={validate.username.isInvalid} onBlur={(e) => validateInput(e)}/>
                        {validate.username.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Username should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group >

                      <Form.Group  className="form-outline mb-4">
                      <Form.Label className="form-label" htmlFor="form3Example3">Edit full name</Form.Label>
                        <Form.Control type="text" id="form3Example3-3" className="form-control" name="fullName" defaultValue={profile.fullName}required isValid={validate.fullName.isValid} isInvalid={validate.fullName.isInvalid} onBlur={(e) => validateInput(e)}/>
                        {validate.fullName.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Full name should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group >

                      <Form.Group  className="form-outline mb-4">
                      <Form.Label className="form-label" htmlFor="form3Example3">Edit about you</Form.Label>
                        <Form.Control type="text" id="form3Example3-5" className="form-control" name="aboutYou" defaultValue={profile.info} />
                        <Form.Text id="not-required-img"className="form-text" muted>
                          * Not required
                        </Form.Text>
                      </Form.Group >

                      <Form.Group  className="form-outline mb-4">
                      <Form.Label className="form-label" htmlFor="form3Example3">Edit profile picture</Form.Label>
                        <Form.Control type="text" id="form3Example3-6" className="form-control" name="profile-img" defaultValue={profile.profileImg} />
                        <Form.Text id="not-required-img"className="form-text" muted>
                          * Not required
                        </Form.Text>
                      </Form.Group >

                      <Button onClick={(e )=>profileEditHandler(e)} type="submit" className="btn btn-primary btn-block mb-4">
                        Edit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </section>
    )
  
}
export default ProfileEdit;