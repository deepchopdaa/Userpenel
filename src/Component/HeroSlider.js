import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
    return (
        <div
            className="arrow next"
            onClick={onClick}
            style={{
                position: "absolute",
                top: "50%",
                right: "2vw",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10
            }}
        >
            <FaArrowRight
                style={{
                    fontSize: "2.5rem",
                    color: "black",
                    border: "2px solid black",
                    padding: "5px",
                    background: "white",
                    borderRadius: "50%"
                }}
            />
        </div>
    );
};

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="arrow prev"
            onClick={onClick}
            style={{
                position: "absolute",
                top: "50%",
                left: "2vw",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10
            }}
        >
            <FaArrowLeft
                style={{
                    fontSize: "2.5rem",
                    color: "black",
                    border: "2px solid black",
                    padding: "5px",
                    background: "white",
                    borderRadius: "50%"
                }}
            />
        </div>
    );
};

const HeroSlider = () => {
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3100/slider/getimage")
            .then((response) => {
                setSlides(response.data);
            })
            .catch((error) => {
                console.error("Slider Getting Error", error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div style={{ position: "relative" }}>
            <Slider {...settings}>
                {slides?.map((item, index) => (
                    <div key={index} style={{ height: '80vh', width: '100%', position: 'relative' }}>
                        {/* Image Container */}
                        <div className='cr-side-slider' style={{ height: '100%', width: '100%' }}>
                            <img
                                src={`http://localhost:3100/${item.image}`}
                                style={{ objectFit: "cover", height: "80vh", width: "100%" }}
                                alt="Image not found"
                            />
                        </div>
                        {/* Text Content */}
                        <div style={{ height: "100px", position: "absolute", marginTop: "-30vh", marginLeft: "80vw", color: "white" }}>
                            <h2 className='text-dark'>{item.title}</h2>
                            <Link to="/game" className="cr-button">Explore</Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;


