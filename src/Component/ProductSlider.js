import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,  // Show 3 slides at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // Show 2 slides on medium screens
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // Show 1 slide on small screens ( mobile)
                },
            },
        ],
    };

    return (
        <section className="section-product-banner py-5 ">  
            <div className="container">
                <h2 className="text-center text-white mb-4">Featured Games</h2>
                <Slider {...settings}>
                    <div>
                        <img src="assets/img/product-banner/table_tenis.jpg" className="img-fluid mx-auto d-block" alt="Chess" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                        <img src="assets/img/product-banner/pool2.jpg" className="img-fluid mx-auto d-block" alt="Pool" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                        <img src="assets/img/product-banner/bowling.jpg" className="img-fluid mx-auto d-block" alt="Bowling" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                        <img src="assets/img/product-banner/table_tenis.jpg" className="img-fluid mx-auto d-block" alt="Chess" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                        <img src="assets/img/product-banner/pool2.jpg" className="img-fluid mx-auto d-block" alt="Pool" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                        <img src="assets/img/product-banner/bowling.jpg" className="img-fluid mx-auto d-block" alt="Bowling" style={{ height: "300px", width: "100%", objectFit: "cover" }} />
                    </div>
                </Slider>
            </div>
        </section>
    );
};

export default ProductSlider;
