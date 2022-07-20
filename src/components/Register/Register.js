import './Register.css'
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router';


export default function Register() {

  const {login} = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  function registerHandler(e) {
    e.preventDefault();
  
    let formData = new FormData(e.currentTarget);
  
    let email = formData.get('email');  
    let password = formData.get('password');
    let username = formData.get('username');
  
    authService.register(email, password, username)
    .then((authData) => {
      login(authData)
      profileService.createProfile(authData, authData.accessToken)
        .then(result => {
          console.log(result);
          navigate(`/profile/${result._id}`);
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
                    <form method='POST' onSubmit={(e) => registerHandler(e)}>
                      
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                        <input type="email" id="form3Example3" className="form-control" name="email"/>
                      </div>
        
                     
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input type="password" id="form3Example4" className="form-control" name="password"/>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Add username</label>
                        <input type="text" id="form3Example3" className="form-control" name="username"/>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Register
                      </button>
        
                      <div className="text-center">
                        <p>or register with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-facebook-f"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-google"></i>
                        </button>
        
                        <button type="button" className="btn btn-link btn-floating mx-1">
                          <i className="fab fa-twitter"></i>
                        </button>
        
                      </div>
                    </form>
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