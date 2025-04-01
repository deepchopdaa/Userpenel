import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServicesSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Adjust based on your design
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false, // Hide arrows if not needed
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="section-services text-white py-5">
            <div className="container">
                <h2 className="text-center mb-4">Why Choose Our Game Zone?</h2>
                <Slider {...settings}>
                    <div className="cr-services text-center ">
                        <div className="cr-services-image">
                            <i className="ri-gamepad-line fs-1 text-primary"></i>
                        </div>
                        <div className="cr-services-contain">
                            <h4>Fast Matchmaking</h4>
                            <p>Find and join games instantly with our optimized servers ans many more.</p>
                        </div>
                    </div>
                    <div className="cr-services text-center">
                        <div className="cr-services-image">
                            <i className="ri-headphone-line fs-1 text-danger"></i>
                        </div>
                        <div className="cr-services-contain">
                            <h4>24/7 Support</h4>
                            <p>Our gaming support team is available anytime you need help.</p>
                        </div>
                    </div>
                    <div className="cr-services text-center">
                        <div className="cr-services-image">
                            <i className="ri-vip-diamond-line fs-1 text-warning"></i>
                        </div>
                        <div className="cr-services-contain">
                            <h4>Premium Benefits</h4>
                            <p>Exclusive access to premium features and rewards and Many More.</p>
                        </div>
                    </div>
                    <div className="cr-services text-center">
                        <div className="cr-services-image">
                            <i className="ri-trophy-line fs-1 text-success"></i>
                        </div>
                        <div className="cr-services-contain">
                            <h4>Leaderboard Rankings</h4>
                            <p>Compete with top players and secure your spot on the leaderboard.</p>
                        </div>
                    </div>
                    <div className="cr-services text-center">
                        <div className="cr-services-image">
                            <i className="ri-shield-check-line fs-1 text-info"></i>
                        </div>
                        <div className="cr-services-contain">
                            <h4>Secure Transactions</h4>
                            <p>Fast and secure in-game purchases with multiple payment options.</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default ServicesSlider;
