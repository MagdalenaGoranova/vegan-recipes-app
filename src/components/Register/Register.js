import './Register.css'
import * as authService from '../../services/authService';

import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function Register() {

  const {login} = useContext(AuthContext);

  const navigate = useNavigate();
  
  function registerHandler(e) {
    e.preventDefault();
  
    let formData = new FormData(e.currentTarget);
  
    //let firstName = formData.get('firstName');
    //let lastName = formData.get('lastName');
    let email = formData.get('email');  
    let password = formData.get('password');
    
  
    authService.register(email, password)
    .then((authData) => {
      console.log(authData);
      login(authData);
  
      navigate('/home');
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
                    <h2 className="fw-bold mb-5">Sign up now</h2>
                    <form method='POST' onSubmit={(e) => registerHandler(e)}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example1" className="form-control" name="firstName"/>
                            <label className="form-label" htmlFor="form3Example1">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input type="text" id="form3Example2" className="form-control" name="lastName"/>
                            <label className="form-label" htmlFor="form3Example2">Last name</label>
                          </div>
                        </div>
                      </div>
        
                      
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3" className="form-control" name="email"/>
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                      </div>
        
                     
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4" className="form-control" name="password"/>
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                      </div>
        
                      <button type="submit" className="btn btn-primary btn-block mb-4">
                        Sign up
                      </button>
        
                      <div className="text-center">
                        <p>or sign up with:</p>
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