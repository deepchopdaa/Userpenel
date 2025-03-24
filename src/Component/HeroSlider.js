import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const HeroSlider = () => {
    /*  const [isLoaded, setIsLoaded] = useState(false); */

    /*     useEffect(() => {
            setIsLoaded(true);
        }, []); */

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
            <section class="section-hero padding-b-100 next">
                <div class="cr-slider swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="cr-hero-banner cr-banner-image-two">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="cr-left-side-contain slider-animation">
                                                <h5><span>100%</span> Enjoyment</h5>
                                                <h3>Explore Our Games For MaKe Fun</h3>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis
                                                    beatae consequuntur.</p>
                                                <div class="cr-last-buttons">
                                                    <Link to='/game' class="cr-button">
                                                        Explore
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSlider;