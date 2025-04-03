import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [games, setGames] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch reviews
                const reviewResponse = await axios.get("http://localhost:3100/review/getuserreview", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                });
                // Fetch games
                const gameResponse = await axios.get("http://localhost:3100/game/getUserGame", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                });
                // Fetch users
                const userResponse = await axios.get("http://localhost:3100/user/getuserReview", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                });
                setReviews(reviewResponse.data);
                setGames(gameResponse.data);
                setUsers(userResponse.data);
                console.log("Reviews:", reviewResponse.data);
                console.log("Games:", gameResponse.data);
                console.log("Users:", userResponse.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load reviews. Please try again.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    // Function to get game name using Game_id
    const getGameName = (gameId) => {
        const game = games.find(g => g._id === gameId);
        return game ? game.title : "Unknown Game";
    };

    // Function to get username using user_id
    const getUsername = (userId) => {
        const user = users.find(u => u._id === userId);

        return user ? user.name : "Unknown User";
    };

    return (
        <section className="section-testimonial py-5">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="text-light">What Gamers Say</h2>
                    <p className="text-light">Real experiences from our gaming community</p>
                </div>

                {loading && <p className="text-center text-dark">Loading reviews...</p>}
                {error && <p className="text-center text-danger">{error}</p>}

                {!loading && !error && reviews.length > 0 && (
                    <Slider {...settings}>
                        {reviews.map((review, index) => (
                            <div key={index} className="p-3 review-item">
                                <div className="cr-testimonial bg-light p-4 rounded shadow text-center" style={{height:"200px",contain:"content"}}>
                                    {/* <div className="cr-testimonial-image mb-3">
                                        <img
                                            src={review.image || "assets/img/testimonial/default.jpg"}
                                            alt={getUsername(review.user_id)}
                                            className="rounded-circle"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                    </div> */}
                                    <h4 className="title">{getGameName(review.Game_id)}</h4>
                                    <span className="text-muted">@{getUsername(review.user_id)}</span>
                                    <p className="mt-2">"{review.comment}"</p>
                                    <div className="cr-star">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <i key={i} className={i < review.rating ? "ri-star-fill text-warning" : "ri-star-line text-secondary"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                )}

                {!loading && !error && reviews.length === 0 && (
                    <p className="text-center text-dark">No reviews available.</p>
                )}
            </div>
        </section>
    );
};

export default Review;
