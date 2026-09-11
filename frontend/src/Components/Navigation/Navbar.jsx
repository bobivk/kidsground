import { Link, useNavigate } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../../AuthContext';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    if (user) {
        return (
            <nav>
                <ul className="nav-links">
                    <li className="home-wrapper">
                        <Link to="/" refresh="true" onClick={() => { window.scrollTo(0, 0) }}> Начало </Link>
                    </li>
                    <li className="map-wrapper">
                        <HashLink to="/#map"> Карта </HashLink>
                    </li>
                    <li className="about-us-wrapper">
                        <HashLink to="/#about-us">За нас</HashLink>
                    </li>
                    <li className="profile-wrapper">
                        <Link to="/profile">Профил</Link>
                    </li>
                    <li className="logout-wrapper">
                        <button className="logout-btn" onClick={handleLogout}> Изход </button>
                    </li>
                </ul>
                <div className="site-logo">
                    <Link to="/" onClick={() => { window.scrollTo(0, 0) }}><img src="logo_site.png" alt="site logo" /></Link>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <ul className="nav-links">
                    <li className="home-wrapper">
                        <Link to="/" refresh="true" onClick={() => { window.scrollTo(0, 0) }}> Начало </Link>
                    </li>
                    <li className="map-wrapper">
                        <HashLink to="/#map"> Карта </HashLink>
                    </li>
                    <li className="about-us-wrapper">
                        <HashLink to="/#about-us">За нас</HashLink>
                    </li>
                    <li className="login-wrapper">
                        <Link to="/login">Вход</Link>
                    </li>
                </ul>
                <div className="site-logo">
                    <Link to="/" onClick={() => { window.scrollTo(0, 0) }}><img src="logo_site.png" alt="site logo" /></Link>
                </div>
            </nav>
        )
    }

}
