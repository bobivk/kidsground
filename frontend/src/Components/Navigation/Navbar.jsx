import '../../static/stylesheets/navbar.css'
import '../../static/stylesheets/styles.css'
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';

export const Navbar = () => {

    if(localStorage.getItem("user")) {
        return (
            <nav>
                <div className="home-wrapper">                
                        <Link to="/" refresh="true"><div> <a onClick={() => {window.scrollTo(0, 0)}}> Начало </a> </div></Link>
                </div>
                <div className="map-wrapper">
                    {/* bug found if on login page clicking this wont take you anywhere */}
                    <div><HashLink to="/#map"> Карта </HashLink></div>
                </div>
                <div className="about-us-wrapper">
                    <div><HashLink to="/#about-us">За проекта</HashLink></div>
                </div>
                <div className="profile-wrapper">
                    <Link to="/#about-us">Профил</Link>
                </div>
                <div className="logout-wrapper">
                    <div>
                        {/* <!-- when it says "Вход" -> <i class="fa-solid fa-user"></i> ? -->
                        <!-- <i class="fa-solid fa-arrow-right-from-bracket"></i> Изход -->
                        <!-- <button id="logout-btn" onclick="logout()">Вход</button> --> */}
                         <a onClick={() => {localStorage.removeItem("user"); window.location.reload();}}> Изход </a>
                    </div>
                </div>
                <div>
                    <Link to="/"><img className="site-logo" src="logo_site.png" alt="site logo" onClick={() => {window.scrollTo(0, 0)}} /></Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className="home-wrapper">                
                        <Link to="/" refresh="true"><div> <a onClick={() => {window.scrollTo(0, 0)}}> Начало </a> </div></Link>
                </div>
                <div className="map-wrapper">
                    {/* bug found if on login page clicking this wont take you anywhere */}
                    <div><HashLink to="/#map"> Карта </HashLink></div>
                </div>
                <div className="about-us-wrapper">
                    <div><HashLink to="/#about-us">За проекта</HashLink></div>
                </div>
                <div className="login-wrapper">
                    <div>
                        {/* <!-- when it says "Вход" -> <i class="fa-solid fa-user"></i> ? -->
                        <!-- <i class="fa-solid fa-arrow-right-from-bracket"></i> Изход -->
                        <!-- <button id="logout-btn" onclick="logout()">Вход</button> --> */}
                         <Link to="/login"><a> Вход </a></Link>
                    </div>
                </div>
                <Link to="/"><img className="site-logo" src="logo_site.png" alt="site logo" onClick={() => {window.scrollTo(0, 0)}} /></Link>
            </nav>
        )
    }
    
}