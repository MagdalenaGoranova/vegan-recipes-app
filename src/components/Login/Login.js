import './Login.css'

import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';

export default function Login({login}) {

  const navigate = useNavigate();

function loginHandler(e) {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);

  let email = formData.get('email');  
  let password = formData.get('password');

  authService.login(email, password)
  .then((authData) => {
    login(authData);

    navigate('/home');
  })
  .catch(err => {
    console.log(err);

  })
}
  return (

<section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: '1rem'}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://beamingbaker.com/wp-content/uploads/2017/05/Triple-Berry-Smoothie-5-Ingredient-Paleo-Vegan-Gluten-Free-Dairy-Free-1.jpg"
                alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form method="POST" onSubmit={(e) => loginHandler(e)}>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="email" id="form2Example17" name="email" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form2Example27" name="password" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example27">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <a className="small text-muted" href="/home">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{color:'#85224A'}}>Don't have an account? <a href="/register"
                      style={{color: '#85224A'}}>Register here</a></p>
                  <a href="#!" className="small text-muted">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
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