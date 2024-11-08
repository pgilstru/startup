import React from 'react';
// import { Home } from './login/home';
// import { Login } from './scores/login';
// import { Register } from './about/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body'>
        <header>
            <img className='logo-img' alt='grocerease' src='/grocerease_logo.png' width='325'/>
            <div className='userinfo-and-nav'>
            {/* <!-- username and logout button --> */}
            <span className="user-info">
                Signed in as:
                <span>username</span>
                <form className="logout-form" method="get" action="login.html">
                    <button className="logout-button btn btn-sm btn-dark" type="submit">Logout</button>
                </form>
            </span>
            {/* <!-- nav bar --> */}
            <nav>
                <menu>
                    <li className="nav-item"><a href="index.html">Home</a></li>
                    <li className="nav-item"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdxF9-nQRfsREiYeliNuDmM2D5pE-gWiKYrkJL2qSX9mdyv9g/viewform?usp=sf_link">Report an Issue</a></li>
                </menu>
            </nav>
            </div>
        </header>

        <main>App components here</main>

        <footer>
            <div className="div-main">
                <span className="myInfo">Penelope Gilstrap</span>
                <a className="myInfo" href="https://github.com/pgilstru/startup.git">GitHub</a>
            </div>
        </footer>
    </div>
  );
}