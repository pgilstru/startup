import React from 'react';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        loginOrCreate('/api/auth/login');
        // localStorage.setItem('userName', userName);
        // props.onLogin(userName);
    }

    async function createUser() {
        loginOrCreate('/api/auth/create');
        // localStorage.setItem('userName', userName);
        // props.onLogin(userName);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
        }
    }

    return (
        <>
        <div>
            <div className="form-email form-part">
                {/* <span className="emailInput">Email: </span> */}
                <label for="email">Email: </label>
                <input type="text" className="login-form-input" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="email" />
                {/* <input type="text" className="login-form-input" id="email" name="email" placeholder="email" required /> */}
            </div>
            <div className="form-password form-part">
                {/* <span className="passwordInput">Password: </span> */}
                <label for="password">Password: </label>
                <input type="password" className="login-form-input" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                {/* <input type="password" className="login-form-input" id="password" name="password" placeholder="password" required /> */}
            </div>
            <span className="buttons">
            <Button variant="primary" className="login-button btn btn-sm btn-outline-secondary btn btn-light" onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </Button>
            <Button variant="secondary" className="create-button btn btn-sm btn-outline-secondary btn btn-light" onClick={() => createUser()} disabled={!userName || !password}>
                Create Account
            </Button>
            </span>
        </div>
        </>
    );
}
