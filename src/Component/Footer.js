import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className=" text-white pt-5 pb-4" style={{ backgroundColor: "rgb(22 11 68)" }}>
                <div className="container">
                    <div className="row">

                        {/* Logo & About Section */}
                        <div className="col-lg-4 col-md-6 mb-4">
                            <h4 className="text-uppercase fw-bold">Game Zone</h4>
                            <p className="small">
                                Your ultimate destination for online gaming! Play, review, and compete with players worldwide.
                            </p>
                            <div className="d-flex">
                                <a href="#" className="me-3 text-white"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="me-3 text-white"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="me-3 text-white"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="me-3 text-white"><i className="fab fa-discord"></i></a>
                            </div>
                        </div>

                        {/* Top Games */}
                        <div className="col-lg-2 col-md-6 mb-4">
                            <h5 className="fw-bold">Top Games</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white text-decoration-none">Battle Arena</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Speed Racers</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Fantasy Quest</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Zombie Survival</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Cyber Shooter</a></li>
                            </ul>
                        </div>

                        {/* Game Categories */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="fw-bold">Game Genres</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white text-decoration-none">Action</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Adventure</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Racing</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Strategy</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Multiplayer</a></li>
                            </ul>
                        </div>

                        {/* Community & Support */}
                        <div className="col-lg-3 col-md-6 mb-4">
                            <h5 className="fw-bold">Community</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white text-decoration-none">Leaderboards</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Forums</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Events</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Support Center</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                            </ul>
                        </div>

                    </div>

                    {/* Copyright Section */}
                    <div className="text-center pt-3 border-top border-secondary">
                        <p className="small mb-0">© {new Date().getFullYear()} Game Zone, All rights reserved.</p>
                    </div>
                </div>
            </footer>



        </>
    )
}

export default Footer
