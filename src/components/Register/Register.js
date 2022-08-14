import './Register.css'
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';
import { useNotificationContext } from '../../contexts/NotificationsContext'; 


import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Register() {

  const ref = useRef(null);

  const {login} = useContext(AuthContext);

  const { addAlert, addToast } = useNotificationContext();

  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  
  const navigate = useNavigate();

  function togglePassword(e) {
    if(ref.current.type == 'password') {
      ref.current.type = 'text';
      e.target.className = 'fa-solid fa-eye';
    } else {
      ref.current.type = 'password';
      e.target.className = 'fa-solid fa-eye-slash';
    }

  }
  
  function registerHandler(e) {
    e.preventDefault();
  
    let formData = new FormData(e.currentTarget);
  
    let email = formData.get('email');  
    let password = formData.get('password');
    let repeatPass = formData.get('re-password');
    let username = formData.get('username');
    let fullName = formData.get('fullName');
    let profileImg = formData.get('profile-img');
    let info = formData.get('about-you');

  
      authService.register(email, password, username, fullName, profileImg, info)
      .then((authData) => {
        login(authData)
        profileService.createProfile(authData, authData.accessToken)
          .then(result => {
            navigate(`/profile/${result._ownerId}`);
            addAlert(`Welcome, ${username}! You have successfully created a profile`, 'success');
          })
      })
      .catch(err => {
        console.log(err);
  
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
                    <h2 className="fw-bold mb-5">Register</h2>
                    <Form method='POST' onSubmit={(e) => registerHandler(e)}>
                      
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example3">Email</Form.Label>
                        <Form.Control type="email" id="form3Example3" className="form-control" name="email" />
                      </Form.Group>
        
                     
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example4">Password</Form.Label>
                        <Form.Control type="password" id="form3Example4" className="form-control" name="password" ref={ref}/>
                        <i class="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example4"> Repeat password</Form.Label>
                        <Form.Control type="password" id="form3Example4" className="form-control" name="re-password" ref={ref}/>
                        <i class="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Username</Form.Label>
                        <Form.Control type="text" id="form3Example3" className="form-control" name="username"/>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4 names">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Full name</Form.Label>
                        <Form.Control type="text" id="form3Example3" className="form-control" name="fullName"/>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Profile Picture</Form.Label>
                        <Form.Control type="url" id="form3Example3" className="form-control" name="profile-img"/>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">About you</Form.Label>
                        <Form.Control as='textarea' type="text" id="form3Example3" className="form-control" name="about-you"/>
                      </Form.Group>


                      <Button type="submit" className="btn btn-primary btn-block mb-4 register-btn" >
                        Register
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
        
              <div className="col-lg-6 mb-5 mb-lg-0">
                <img className="img-register" src="https://aseasyasapplepie.com/wp-content/uploads/2016/03/nourishing-vegan-buddha-bowl.jpg"
                  alt="" />
              </div>
            </div>
          </div>
        
        </section>
       
)
} 