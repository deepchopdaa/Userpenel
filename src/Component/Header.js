import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faBars, faTimes, faInfoCircle, faAddressCard } from '@fortawesome/free-solid-svg-icons'; // Added new icons
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const Logout = () => {
        localStorage.removeItem("token");
        setMenuOpen(false);
        navigate("/login");
    };

    const User = () => {
        setMenuOpen(false);
        navigate("/userDetail");
    };
    const UserTickets = () => {
        setMenuOpen(false);
        navigate("/UserTickets");
    };

    const renderMenuItems = () => (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>
                    <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/contactus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>
                    <FontAwesomeIcon icon={faAddressCard} /> <span>Contact Us</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>
                    <FontAwesomeIcon icon={faInfoCircle} /> <span>About Us</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>
                    <i className="ri ri-shopping-cart-line" /> <span>Ticket Menu</span>
                </NavLink>
            </li>
            <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ri-user-3-line" /> <span>Account</span>
                </div>
                <ul className="dropdown-menu cs-item">
                    <li>
                        <div onClick={User} className="dropdown-item text-light ">
                            <i className="ri-user-3-line" /> User Detail
                        </div>
                        <div onClick={UserTickets} className="dropdown-item text-light ">
                            <i className="ri-user-3-line" /> UserTickets
                        </div>
                    </li>
                    <li>
                        <div onClick={Logout} className="dropdown-item text-light ">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </div>
                    </li>
                </ul>
            </li>
            {!localStorage.getItem("token") && (
                <li>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={() => setMenuOpen(false)}>
                        Login
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <>
            <style>
                {`.active { color: red !important; }`}
            </style>
            <header className="header">
                <nav className="navbar navbar-dark bg-dark px-3">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <NavLink to="/" className="navbar-brand">
                            <img src="assets/img/product/logo.png" height='50px' alt="Logo" />
                        </NavLink>

                        {/* Mobile Menu Button */}
                        {isMobile ? (
                            <button className="menu-btn text-white" onClick={() => setMenuOpen(!menuOpen)}>
                                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
                            </button>
                        ) : (
                            <ul className="navbar-nav d-flex flex-row gap-3 align-items-center mb-0">
                                {renderMenuItems()}
                            </ul>
                        )}
                    </div>
                </nav>

                {/* Custom Mobile Menu */}
                {menuOpen && isMobile && (
                    <div className="custom-menu">
                        <ul className="mobile-nav-list">
                            {renderMenuItems()}
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;






// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
// import './Header.css'; // Import CSS file for styling

// const Header = () => {
//     const navigate = useNavigate();

//     const Logout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     const User = () => {
//         navigate("/userDetail");
//     };
//     return (
//         <>
//             <style>
//                 {`.active{
//                 color:red !important
//             }`}
//             </style>
//             <header className="header">
//                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                     <div className="container">
//                         {/* Logo */}
//                         <NavLink to="/" className="navbar-brand">
//                             <img src="assets/img/product/logo.png" height='50px' alt="Logo" />
//                         </NavLink>



//                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon"></span>
//                         </button>

//                         <div className="collapse navbar-collapse" id="navbarNav">
//                             {/* Navbar Items */}
//                             <ul className="navbar-nav ms-auto">
//                                 <li className="nav-item">
//                                     <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                                         <FontAwesomeIcon icon={faHome} /> <span>Home</span>
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/contactus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                                         Contact Us
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                                         About Us
//                                     </NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                                         <i className="ri-shopping-cart-line" /> <span>Ticket Menu</span>
//                                     </NavLink>
//                                 </li>
//                                 {/* Account Dropdown */}
//                                 <li className="nav-item dropdown">
//                                     <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                         <i className="ri-user-3-line" /> <span>Account</span>
//                                     </div>
//                                     <ul className="dropdown-menu">
//                                         <li>
//                                             <div onClick={User} className="dropdown-item text-center">
//                                                 User Detail
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <div onClick={Logout} className="dropdown-item text-center">
//                                                 <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//                                             </div>
//                                         </li>
//                                     </ul>
//                                 </li>
//                                 {/* Login Link (if not logged in) */}
//                                 {!localStorage.getItem("token") && (
//                                     <li className="nav-item">
//                                         <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
//                                             Login
//                                         </NavLink>
//                                     </li>
//                                 )}
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </header>
//         </>
//     );
// };

// export default Header;