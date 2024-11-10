import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
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

  return (
    <BrowserRouter>
    <div className='body'>
        <header>
            <img className='logo-img' alt='grocerease' src='/grocerease_logo.png' width='325'/>
            <div className='userinfo-and-nav'>
            {/* <!-- username and logout button --> */}
            <span className="user-info">
                Signed in as:
                <span><strong> {userName}</strong></span>
                <span className="logout-form"><LogoutButton /></span>
            </span>
            {/* <!-- nav bar --> */}
            <nav>
                <menu>
                    <li className="nav-item"><NavLink to=''>Login</NavLink></li>
                    {authState === AuthState.Authentication && (
                        <li className="nav-item"><NavLink to="/home">Home</NavLink></li>
                    )}
                    <li className="nav-item"><NavLink to="/about">About</NavLink></li>
                    {/* <li className="nav-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdxF9-nQRfsREiYeliNuDmM2D5pE-gWiKYrkJL2qSX9mdyv9g/viewform?usp=sf_link">Report an Issue</a></li> */}
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
            <Route path="/home" element={<Home userName={userName} />} />
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

export function LogoutButton({ }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        // perform logout logic here, update when you start having users login
        localStorage.removeItem('userName');
        navigate('/login'); //redirect to login page
    }
    return (
      <Button className="logout-button btn btn-sm btn-dark" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

export default App;