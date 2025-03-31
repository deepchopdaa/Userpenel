import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Import CSS file for styling

const Header = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <style>
                {`.active{
                    color:red !important
                }`}
            </style>
            <header className="header">
                <nav className="container d-flex align-items-center justify-content-between">
                    {/* Logo */}
                    <img src="assets/img/product/logo.png" height='70px' alt="Logo" />

                    {/* Navbar Items */}
                    <ul className="nav-links d-flex align-items-center mb-0">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                <i className="ri-shopping-cart-line" /> <span>Ticket Menu</span>
                            </NavLink>
                        </li>
                        <li>    
                            <NavLink to="/contactus" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>    
                            <NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                About Us
                            </NavLink>
                        </li>
                        {/* Account Dropdown */}
                        <li className="dropdown">
                            <div className="nav-item dropdown-toggle" data-bs-toggle="dropdown">
                                <i className="ri-user-3-line" /> <span>Account</span>
                            </div>
                            <ul className="dropdown-menu bg-danger">
                                <li>
                                    <div onClick={Logout} className="dropdown-item text-center">
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                    </div>
                                </li>
                            </ul>
                        </li>
                        {/* Login Link (if not logged in) */}
                        {!localStorage.getItem("token") && (
                            <li>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
