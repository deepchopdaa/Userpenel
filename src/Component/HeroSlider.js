import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { alignPropType } from 'react-bootstrap/esm/types';

const HeroSlider = () => {
    /*  const [isLoaded, setIsLoaded] = useState(false); */

    /*     useEffect(() => {
            setIsLoaded(true);
        }, []); */

    const [slides, setslides] = useState([]);
    const GetSlider = () => {
        axios.get("http://localhost:3100/slider/getimage")
            .then((slide) => {
                console.log(slide.data)
                setslides(slide.data)
            })
            .catch((e) => {
                console.log("Slider Getting Error", e)
            })
    }
    useEffect(() => {
        GetSlider();
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };
    /*   if (!isLoaded) return <div>Loading...</div>;
   */
    return (
        <>
            <div style={{position:"relative"}}>

                <Slider {...settings}>
                    {
                        slides?.map((item) => (
                            <>
                                <div style={{ height: '700px', width: '100%'}}>
                                    <img src={`http://localhost:3100/${item.image}`} height='700px' width='100%' alt='image not found' />
                                </div>
                            </>
                        ))
                    }
                </Slider>

                <div style={{ position: "absolute" }}>
                    <h3>gvkjrg</h3>
                    <div className="cr-last-buttons w-100">
                        <Link to="/game" className="cr-button">
                            Explore
                        </Link>
                    </div>
                </div>

            </div>
            {/* <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="cr-left-side-contain slider-animation">
                            <h5><span>100%</span> Enjoyment</h5>
                            <h3>{slide.title}</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis
                                beatae consequuntur.
                            </p>
                            <div className="cr-last-buttons">
                                <Link to="/game" className="cr-button">
                                    Explore
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/*  <section class="section-hero padding-b-100 next">
                <div class="cr-slider swiper-container">
                    <div class="swiper-wrapper">
                        {slides?.map((slide, index) => {
                            const fixedImagePath = slide.image.replace(/\\/g, "/"); // Fix backslashes

                            return (
                                <div key={index} className="swiper-slide">
                                    <div
                                        className="cr-hero-banner"
                                        style={{
                                            width: "100%",
                                            height: "650px",
                                            backgroundImage: slide.image
                                                ? `url(http://localhost:3100/${fixedImagePath})`
                                                : "none",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="cr-left-side-contain slider-animation">
                                                        <h5><span>100%</span> Enjoyment</h5>
                                                        <h3>{slide.title}</h3>
                                                        <p>
                                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis
                                                            beatae consequuntur.
                                                        </p>
                                                        <div className="cr-last-buttons">
                                                            <Link to="/game" className="cr-button">
                                                                Explore
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
              
            </section > */}
        </>
    );
};

export default HeroSlider;