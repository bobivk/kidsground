import '../../static/stylesheets/navbar.css'
import '../../static/stylesheets/styles.css'
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import Cookies from 'js-cookie'

export const Navbar = () => {

    if (Cookies.get("user")) {
        return (
            <nav>
                <div className="home-wrapper">
                    <Link to="/" refresh="true"><div> <a onClick={() => { window.scrollTo(0, 0) }}> Начало </a> </div></Link>
                </div>
                <div className="map-wrapper">
                    <div><HashLink to="/#map"> Карта </HashLink></div>
                </div>
                <div className="about-us-wrapper">
                    <div><HashLink to="/#about-us">За нас</HashLink></div>
                </div>
                <div className="profile-wrapper">
                    <Link to="/profile">Профил</Link>
                </div>
                <div className="logout-wrapper">
                    <div>
                        <a onClick={() => { Cookies.remove("user"); window.location.reload(); }}> Изход </a>
                    </div>
                </div>
                <div className="site-logo">
                    <Link to="/"><img src="logo_site.png" alt="site logo" onClick={() => { window.scrollTo(0, 0) }} /></Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className="home-wrapper">
                    <Link to="/" refresh="true"><div> <a onClick={() => { window.scrollTo(0, 0) }}> Начало </a> </div></Link>
                </div>
                <div className="map-wrapper">
                    {/* bug found if on login page clicking this wont take you anywhere */}
                    <div><HashLink to="/#map"> Карта </HashLink></div>
                </div>
                <div className="about-us-wrapper">
                    <div><HashLink to="/#about-us">За нас</HashLink></div>
                </div>
                <div className="login-wrapper">
                    <div>
                        {/* <!-- when it says "Вход" -> <i class="fa-solid fa-user"></i> ? -->
                        <!-- <i class="fa-solid fa-arrow-right-from-bracket"></i> Изход -->
                        <!-- <button id="logout-btn" onclick="logout()">Вход</button> --> */}
                        <Link to="/login">Вход</Link>
                    </div>
                </div>
                <div className="site-logo">
                    <Link to="/"><img src="logo_site.png" alt="site logo" onClick={() => { window.scrollTo(0, 0) }} /></Link>
                </div>
            </nav>
        )
    }

}