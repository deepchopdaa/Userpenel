import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
    return (
        <>
            <Header />
            <div className="text-light min-h-screen p-5">
                <div className="container text-center py-5">
                    <h1 className="text-danger fw-bold display-4">About Game Zone</h1>
                    <p className="text-secondary mt-3 fs-5">
                        Welcome to <span className="text-danger">Game Zone</span>, your ultimate destination for thrilling gaming experiences!
                        Whether you're an eSports enthusiast, a casual gamer, or a hardcore player, we bring you the best games,
                        challenges, and a vibrant gaming community.
                    </p>
                </div>

                {/* Gaming Experience Section */}
                <div className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img
                                src="assets/img/product/logo.png"
                                alt="Gaming Arena"
                                className="img-fluid rounded shadow-lg"
                            />
                        </div>
                        <div className="col-md-6 text-light">
                            <h2 className="text-danger fw-bold">The Ultimate Gaming Experience</h2>
                            <p className="text-secondary fs-5">
                                Explore an extensive collection of games, compete in leaderboards, and enjoy seamless gameplay with
                                our high-performance platform. Our gaming hub is designed for all types of players, ensuring that everyone
                                finds their perfect game.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Community Section */}
                <div className="container my-5 text-center">
                    <h2 className="text-danger fw-bold">Join the Game Zone Community</h2>
                    <p className="text-secondary fs-5">
                        Connect with other gamers, participate in live tournaments, and share your achievements.
                        Our platform is built to enhance the gaming culture with interactive leaderboards and rewards.
                    </p>
                </div>

                {/* Footer Section */}
                <div className="text-center py-4 mt-5 border-top border-danger">
                    <p className="text-secondary">&copy; {new Date().getFullYear()} Game Zone. All Rights Reserved.</p>
                </div>
            </div>
            <Footer/>

        </>
    );
};

export default AboutUs;