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

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const {login} = useContext(AuthContext);

  const { addAlert, addToast } = useNotificationContext();

  const [validate, setValidate] = useState({
    email: {isValid: false, isInvalid: false},
    password: {isValid: false, isInvalid: false},
    repeatPass: {isValid: false, isInvalid: false},
    username: {isValid: false, isInvalid: false},
    fullName: {isValid: false, isInvalid: false},
  });

  const navigate = useNavigate();

  function togglePassword(e) {
    if(ref1.current.type == 'password') {
      ref1.current.type = 'text';
      e.target.className = 'fa-solid fa-eye';
    } else {
      ref1.current.type = 'password';
      e.target.className = 'fa-solid fa-eye-slash';
    }

  }
  function toggleRePassword(e) {
    if(ref2.current.type == 'password') {
      ref2.current.type = 'text';
      e.target.className = 'fa-solid fa-eye';
    } else {
      ref2.current.type = 'password';
      e.target.className = 'fa-solid fa-eye-slash';
    }
  }
  function validateInput(e) {
    if(e.currentTarget.name == 'email') {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if(e.currentTarget.value == '' || !e.currentTarget.value.match(emailRegex) ) {
      setValidate(oldState => ({
        ...oldState,
          email: {
          isInvalid: true,
          isValid: false,
        } 
      }))
    } else {
      setValidate(oldState => ({
        ...oldState,
          email: {
          isInvalid: false,
          isValid: true,
        } 
      }))
    }

    }
    if(e.currentTarget.name == 'password') {
      if(e.currentTarget.value == '' || e.currentTarget.value.length < 8) {
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

    }
    if(e.currentTarget.name == 're-password') {
      if(e.currentTarget.value == '' || e.currentTarget.value.length < 8) {
        setValidate(oldState => ({
          ...oldState,
            repeatPass: {
            isInvalid: true,
            isValid: false,
          } 
        }))
      } else {
        setValidate(oldState => ({
          ...oldState,
            repeatPass: {
            isInvalid: false,
            isValid: true,
          } 
        }))
      }

    }
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

    if(validate.email.isValid && validate.password.isValid && validate.username.isValid && validate.fullName.isValid && validate.repeatPass.isValid && password == repeatPass) {
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
    } else {
      addToast('Password and Repeat password should be the same!')
    }

  }
    return (
        <section className="text-center text-lg-start">
          
          <div className="container py-4">
            <div className="row g-0 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card cascading-right style-img">
                  <div className="card-body p-5 shadow-5 text-center">
                    <h2 className="fw-bold mb-5">Register</h2>
                    <Form method='POST' onSubmit={(e) => registerHandler(e)} className="register-form">
                      
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example3">Email</Form.Label>
                        <Form.Control type="email" id="form3Example3" className="form-control" name="email" isValid={validate.email.isValid} isInvalid={validate.email.isInvalid} onBlur={(e) => validateInput(e)}/>
                      {validate.email.isInvalid 
                      ? <Form.Text id="not-required-img"className="form-text-error" muted>
                        Email should be valid - e.g johnsmith@gmail.com
                        </Form.Text>
                      : ''
                      }
                      </Form.Group>
        
                     
                      <Form.Group className="form-outline mb-4">
                        <Form.Label className="form-label" htmlFor="form3Example4">Password</Form.Label>
                        <Form.Control type="password" id="form3Example4" className="form-control" name="password" ref={ref1} isValid={validate.password.isValid} isInvalid={validate.password.isInvalid} onBlur={(e) => validateInput(e)}/>
                        <i className="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                        {validate.password.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Password should be at least 8 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example4"> Repeat password</Form.Label>
                        <Form.Control type="password" id="form3Example5" className="form-control" name="re-password" ref={ref2} isValid={validate.repeatPass.isValid} isInvalid={validate.repeatPass.isInvalid}  onBlur={(e) => validateInput(e)}/>
                        <i className="fa-solid fa-eye-slash" onClick={(e)=> toggleRePassword(e)}></i>
                        {validate.repeatPass.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Password should be at least 8 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Username</Form.Label>
                        <Form.Control type="text" id="form3Example6" className="form-control" name="username" isValid={validate.username.isValid} isInvalid={validate.username.isInvalid} onBlur={(e) => validateInput(e)}/>
                        {validate.username.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Username should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4 names">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Full name</Form.Label>
                        <Form.Control type="text" id="form3Example7" className="form-control" name="fullName" isValid={validate.fullName.isValid} isInvalid={validate.fullName.isInvalid} onBlur={(e) => validateInput(e)}/>
                        {validate.fullName.isInvalid 
                        ? <Form.Text id="not-required-img"className="form-text-error" muted>
                          Full name should be at least 3 character
                          </Form.Text>
                        : ''
                        }
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">Profile Picture</Form.Label>
                        <Form.Control type="url" id="form3Example8" className="form-control" name="profile-img" />
                        <Form.Text id="not-required-img"className="form-text" muted>
                          * Not required
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="form-outline mb-4">
                        <Form.Label  className="form-label" htmlFor="form3Example3">About you</Form.Label>
                        <Form.Control as='textarea' type="text" id="form3Example9" className="form-control" name="about-you" />
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