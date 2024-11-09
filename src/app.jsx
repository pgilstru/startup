import React from 'react';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
    <div className='body'>
        <header>
            <img className='logo-img' alt='grocerease' src='/grocerease_logo.png' width='325'/>
            <div className='userinfo-and-nav'>
            {/* <!-- username and logout button --> */}
            <span className="user-info">
                Signed in as:
                <span><strong> username</strong></span>
                <span className="logout-form"><LogoutButton /></span>
            </span>
            {/* <!-- nav bar --> */}
            <nav>
                <menu>
                    <li className="nav-item"><NavLink to="">Home</NavLink></li>
                    <li className="nav-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdxF9-nQRfsREiYeliNuDmM2D5pE-gWiKYrkJL2qSX9mdyv9g/viewform?usp=sf_link">Report an Issue</a></li>
                    {/* <li className="nav-item"><a href="index.html">Home</a></li>
                    <li className="nav-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdxF9-nQRfsREiYeliNuDmM2D5pE-gWiKYrkJL2qSX9mdyv9g/viewform?usp=sf_link">Report an Issue</a></li> */}
                </menu>
            </nav>
            </div>
        </header>

        {/* <main>App components here</main> */}
        {/* to */}

        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
        navigate('/login'); //redirect to login page
    }
    return (
      <Button className="logout-button btn btn-sm btn-dark" onClick={handleLogout}>
        Logout
      </Button>
    );
  }