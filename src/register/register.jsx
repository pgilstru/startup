import React from 'react';
import './register.css';

export function Register() {
    return (
    <main>
        <div>
          <h2>Register</h2>
        </div>
    
        <hr/>
    
        <form className="register-form" method="get" action="login.html">
            <div className="form-part">
                <label for="email">Email: </label>
                <input type="text" className="register-form-input" id="email" name="email" placeholder="email" required/>
            </div>
            <div className="form-part">
                <label for="password">Password: </label>
                <input type="password" className="register-form-input" id="password" name="password" placeholder="password" required/>
            </div>
            <div className="confirm-pw">
              <div className="form-part">
                  <label for="confirm_password">Confirm Password: </label>
                  <input type="password" className="register-form-input" id="confirm_password" name="confirm_password" placeholder="re-enter password" required/>
              </div>
            </div>
            <div className="form-part">
              <label></label>
              <button type="submit" class="register-button btn btn-sm btn-outline-secondary">Create Account</button>
            </div>
        </form>
    
        <div className="haveacc">
          Already have an account?
          <button className="login-button btn btn-sm btn-outline-secondary" type="submit">Login</button>
        </div>
    
    </main>
    );
}