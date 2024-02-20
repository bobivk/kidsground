import '../../static/stylesheets/navbar.css'
import '../../static/stylesheets/styles.css'
import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
        <nav>
            <div className="home-wrapper">                
                    <Link to="/"><div> <a> Начало </a> </div></Link>
            </div>
            <div className="map-wrapper">
                {/* bug found if on login page clicking this wont take you anywhere */}
                <div> <a href="#map"> Карта </a> </div>
            </div>
            <div className="about-us-wrapper">
                <div><a>За проекта</a></div>
            </div>
            <div className="logout-wrapper">
                <div>
                    {/* <!-- when it says "Вход" -> <i class="fa-solid fa-user"></i> ? -->
                    <!-- <i class="fa-solid fa-arrow-right-from-bracket"></i> Изход -->
                    <!-- <button id="logout-btn" onclick="logout()">Вход</button> --> */}
                     <Link to="/login"><a> Вход </a></Link>
                </div>
            </div>
            <Link to="/"><img className="site-logo" src="logo_site.png" alt="site logo" /></Link>
        </nav>
    )
}