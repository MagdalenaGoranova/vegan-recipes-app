import './Login.css'
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import { useNotificationContext } from '../../contexts/NotificationsContext'; 

export default function Login() {

  const ref = useRef();
  
  const {login} = useContext(AuthContext);

  const { addAlert, addToast } = useNotificationContext();

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

function loginHandler(e) {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let email = formData.get('email');  
  let password = formData.get('password');

  authService.login(email, password)
  .then((authData) => {
    login(authData);
    addAlert('You are logged in', 'success')

    navigate('/home');
  })
  .catch(err => {
    addToast('Login or password don\'t match!');
    console.log(err);

  })
}
  return (

<section className="vh-70">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card style-br">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://beamingbaker.com/wp-content/uploads/2017/05/Triple-Berry-Smoothie-5-Ingredient-Paleo-Vegan-Gluten-Free-Dairy-Free-1.jpg"
                alt="login form" className="img-fluid"/>
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form method="POST" onSubmit={(e) => loginHandler(e)}>
                  <h5 className="fw-normal mb-3 pb-3 login-title" style={{letterSpacing: '1px'}}>Log into your account</h5>

                  <div className="form-outline mb-4">
                    <label className="form-label label" htmlFor="form2Example17">Email address</label>
                    <input type="email" id="form2Example17" name="email" className="form-control form-control-lg input-email" />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                    <input type="password" id="form2Example27" name="password" className="form-control form-control-lg" ref={ref}/>
                    <i className="fa-solid fa-eye-slash" onClick={(e)=> togglePassword(e)}></i>
                  </div>

                  <div className=" mb-4">
                    <button className="btn btn-lg btn-block login-btn" type="submit">Login</button>
                  </div>

                  <p className="mb-5 pb-lg-2" style={{color:'#047a46'}}>Don't have an account? <a href="/register"
                      style={{color: '#047a46'}}>Register here</a></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




)
} 