import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const handleLogout = () => {
    fetch('/api/auth/logout', {
        method: 'delete',
    })
    .catch(() => {
        // logout failed
        console.error('logout failed');
      })
      .finally(() => {
        localStorage.removeItem('userName');
        setAuthState(AuthState.Unauthenticated);
        setUserName('');
      });
  };

  return (
    <BrowserRouter>
    <div className='body'>
        <header>
            <img className='logo-img' alt='grocerease' src='/grocerease_logo.png' width='325'/>
            <div className='userinfo-and-nav'>
            {/* <!-- username and logout button --> */}
            <span className="user-info">
                Signed in as:
                {authState === AuthState.Unauthenticated ? (
                    <span><strong> Not signed in</strong></span>
                ) : (
                    <span><strong> {userName}</strong></span>
                )}
                {/* Signed in as:
                <span><strong> {userName}</strong></span> */}
                <span className="logout-form">
                    {authState === AuthState.Authenticated && (
                        <LogoutButton onLogout={handleLogout} />
                    )}
                    {/* <LogoutButton /> */}
                </span>
            </span>
            {/* <!-- nav bar --> */}
            <nav>
                <menu>
                    <li className="nav-item">
                        <NavLink to=''>Login</NavLink>
                    </li>
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item">
                            <NavLink to="home">Home</NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink to="/about">About</NavLink>
                    </li>
                </menu>
            </nav>
            </div>
        </header>

        {/* <main>App components here</main> */}
        {/* to */}

        <Routes>
            <Route path="/" element={
                <Login 
                    userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                    }}
                 />
            } 
             exact
            />
            <Route path="/home" element={
                <ProtectedRoute authState={authState}>
                    <Home userName={userName} />
                </ProtectedRoute>
            }/>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
            <div className="div-main">
                <span className="myInfo">Penelope Gilstrap</span>
                <a className="myInfo" href="https://github.com/pgilstru/startup.git">GitHub</a>
            </div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

function NotFound() {
    return <main className='text-center'>404: Return to sender. Address unknown.</main>;
  }

export function LogoutButton({ onLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };
    return (
      <Button className="logout-button btn btn-sm btn-dark" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

function ProtectedRoute({ authState, children }) {
    if (authState !== AuthState.Authenticated) {
        console.error('must authenticate to access home page');
        return (
            <div className='text-center'>
                <h2>You need to log in first</h2>
                <p>In order to access this page, please login</p>
            </div>
        )
    }
    return children;
}

export default App;