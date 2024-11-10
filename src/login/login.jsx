import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

import 'bootstrap/dist/css/bootstrap.min.css';
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
          {authState === AuthState.Unauthenticated && (
            <Unauthenticated
              userName={userName}
              onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
              }}
            />
          )}
        </div>
    
    </main>
    );
}
