import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }
    return (
        <>
            <header className="text-white text-nowrap py-2" style={{ backgroundColor: "rgb(22 11 68)" }}>
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        {/* Logo */}
                        <div className="fw-bold fs-4"><img src='assets/img/product/logo1.jpg' height='50px' width='80px' /></div>
                        {/* Right Side Navbar */}
                        <div className="d-flex align-items-center ms-auto">
                            <Link to="/" className="text-light text-decoration-none mx-3">
                                <FontAwesomeIcon icon={faHome} /> Homes
                            </Link>
                            <Link to="/cart" className="text-light text-decoration-none mx-3">
                                <i className="ri-shopping-cart-line" /> Ticket Menu
                            </Link>
                            <Link to="/contactus" className="text-light text-decoration-none mx-3">
                                Contact Us
                            </Link>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle text-light mx-3" data-bs-toggle="dropdown">
                                        <i className="ri-user-3-line" /> <span>Account</span>
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <div onClick={() => Logout()} className="dropdown-item text-center">
                                                <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
                                            </div>
                                        </li>
                                    </ul> 
                                </li>
                            </ul>
                            {
                                localStorage.getItem("token") ? " " : <Link to="/login" className="text-light text-decoration-none mx-3">
                                    Login
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
