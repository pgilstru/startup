import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
    return (
    <main className="loginMain">
        <div>
          <h2>Login</h2>
        </div>
    
        <hr/>

        <div>
          {authState === AuthState.Authenticated && (
            <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
          )}
        </div>
    
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
          <span><CreateButton /></span>
        </div>
    
    </main>
    );
}

export function CreateButton({ }) {
  const navigate = useNavigate();
  const handleReRoute = () => {
    navigate('/register/register'); //redirect to register page
  }
  return (
    <Button type="button" className="create-button btn btn-sm btn-outline-secondary btn btn-light" onClick={handleReRoute}>
      Create Account
    </Button>
  );
}
