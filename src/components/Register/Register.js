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

  const [validate, setValidate] = useState({
    email: {isValid: false, isInvalid: false},
    password: {isValid: false, isInvalid: false},
    username: {isValid: false, isInvalid: false},
    fullName: {isValid: false, isInvalid: false},
  });

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

    console.log(e.currentTarget);

    let email = formData.get('email');  
    let password = formData.get('password');
    let repeatPass = formData.get('re-password');
    let username = formData.get('username');
    let fullName = formData.get('fullName');
    let profileImg = formData.get('profile-img');
    let info = formData.get('about-you');

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if(email == '' || !email.match(emailRegex) ) {
      setValidate(oldState => ({
        ...oldState,
          email: {
          isInvalid: true,
          isValid: false,
        } 
      }))
    } else {
      console.log(email);
      setValidate(oldState => ({
        ...oldState,
          email: {
          isInvalid: false,
          isValid: true,
        } 
      }))
    }
    if(password == '' || password.length < 8 || repeatPass != password) {
      setValidate(oldState => ({
        ...oldState,
          password: {
          isInvalid: true,
          isValid: false,
        } 
      }))
    } else {
      setValidate(oldState => ({
        ...oldState,
          password: {
          isInvalid: false,
          isValid: true,
        } 
      }))
    }
    if(username == '' || username.length < 3 ) {
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
    if(fullName == '' || fullName.length < 3 ) {
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
    if(validate.email.isValid && validate.password.isValid && validate.username.isValid && validate.fullName.isValid) {
      console.log(email);
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
                    <Form method='POST' onSubmit={(e) => registerHandler(e)} className="register-form">
                      
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example3">Email</Form.Label>
                        <Form.Control type="email" id="form3Example3" className="form-control" name="email" isValid={validate.email.isValid} isInvalid={validate.email.isInvalid}/>
                      {validate.email.isInvalid 
                      ? <Form.Text id="not-required-img"className="form-text-error" muted>
                        Email should be valid - e.g johnsmith@gmail.com
                        </Form.Text>
                      : ''
                      }
                      </Form.Group>
        
                     
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example4">Password</Form.Label>
                        <Form.Control type="password" id="form3Example4" className="form-control" name="password" ref={ref} isValid={validate.password.isValid} isInvalid={validate.password.isInvalid}/>
                        <i class="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                        {validate.password.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Password should be at least 8 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example4"> Repeat password</Form.Label>
                        <Form.Control type="password" id="form3Example4" className="form-control" name="re-password" ref={ref} isValid={validate.password.isValid} isInvalid={validate.password.isInvalid}/>
                        <i class="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                        {validate.password.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Passwords should match 
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Username</Form.Label>
                        <Form.Control type="text" id="form3Example3" className="form-control" name="username" isValid={validate.username.isValid} isInvalid={validate.username.isInvalid}/>
                        {validate.username.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Username should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4 names">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Full name</Form.Label>
                        <Form.Control type="text" id="form3Example3" className="form-control" name="fullName" isValid={validate.fullName.isValid} isInvalid={validate.fullName.isInvalid}/>
                        {validate.fullName.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Full name should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Profile Picture</Form.Label>
                        <Form.Control type="url" id="form3Example3" className="form-control" name="profile-img" />
                        <Form.Text id="not-required-img"className="form-text" muted>
                          * Not required
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">About you</Form.Label>
                        <Form.Control as='textarea' type="text" id="form3Example3" className="form-control" name="about-you" />
                        <Form.Text id="not-required-info"  className="form-text" muted>
                          * Not required
                        </Form.Text>
                      </Form.Group>

                      <Button type="submit" className="btn btn-primary btn-block mb-4 register-btn">
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