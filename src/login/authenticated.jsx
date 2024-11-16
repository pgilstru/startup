import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './login.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch('/api/auth/logout', {
            method: 'delete',
        })
          .catch(() => {
            // logout failed
          })
          .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
          });
    }

    return (
        <div>
            <div>{props.userName}</div>
            <Button onClick={() => navigate('/home')}>
                Home
            </Button>
            <Button onClick={() => logout()}>
                Logout
            </Button>
        </div>
    )
}