import './Register.css'
import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';
import { useNotificationContext } from '../../contexts/NotificationsContext'; 

import { useContext, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router';


export default function Register() {

  const ref = useRef(null);

  const {login} = useContext(AuthContext);

  const { addAlert } = useNotificationContext();
  
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
    let username = formData.get('username');
  
    authService.register(email, password, username)
    .then((authData) => {
      login(authData)
      profileService.createProfile(authData, authData.accessToken)
        .then(result => {
         
          navigate(`/profile/${result._ownerId}`);
          addAlert(`Welcome, ${username}! You have successfully created a profile`, 'success');
          

        })
    })
    .catch(err => {
      

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
                        <label className="form-label" htmlFor="form3Example3">Email</label>
                        <input type="email" id="form3Example3" className="form-control" name="email"/>
                      </div>
        
                     
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input type="password" id="form3Example4" className="form-control" name="password" ref={ref}/>
                        <i class="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
          

                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Username</label>
                        <input type="text" id="form3Example3" className="form-control" name="username"/>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block mb-4 register-btn" >
                        Register
                      </button>
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