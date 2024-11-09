import React from 'react';
import './login.css';

export function Login() {
    return (
    <main className="loginMain">
        <div>
          <h2>Login</h2>
        </div>
    
        <hr/>
    
        <form className="login-form" method="get" action="index.html">
            <div className="form-email form-part">
                <label for="email">Email: </label>
                <input type="text" className="login-form-input" id="email" name="email" placeholder="email" required />
            </div>
            <div className="form-password form-part">
                <label for="password">Password: </label>
                <input type="password" className="login-form-input" id="password" name="password" placeholder="password" required />
            </div>
            <div className="form-part">
              <label></label>
              <button type="submit" className="login-button btn btn-sm btn-outline-secondary">Login</button>
            </div>
        </form>
    
        <div className="noacc">
          Don't have an account?
          <button className="create-button btn btn-sm btn-outline-secondary" type="submit">Create Account</button>
        </div>
    
    </main>
        // <main className='text-center'>
        //     <div>login displayed here</div>
        // </main>
    );
}