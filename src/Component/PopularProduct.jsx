import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularProduct = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 200, once: false });
        AOS.refresh();
    }, []);

    const [game, setgame] = useState(null);
    const navigate = useNavigate("/")

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1100,
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
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const UserGame = async () => {
        await axios.get("https://gamezone-r2eq.onrender.com/game/getpopulor", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            console.log(res.data);
            setgame(res.data)
        }).catch((e) => {
            console.log("Data Feating Error");
        })
    }
    useEffect(() => {
        UserGame();
    }, [])
    return (
        <>
            <section className="section-popular-products padding-tb-100" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="mb-30">
                                <div className="cr-banner">
                                    <h2 className='text-light'>Popular Games</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Slider {...settings}>
                        {
                            game?.map((item) => (
                                <div className="cr-product-card" onClick={() => navigate(`/product/${item._id}`)} >
                                    <div className="cr-product-image">
                                        <div className="cr-product-image">
                                            <div className="cr-image-inner zoom-image-hover">
                                                <img src={item.image} alt="product-1" />
                                            </div>
                                            {/* <div className="cr-side-view">
                                                        <a href="javascript:void(0)" className="wishlist">
                                                            <i className="ri-heart-line" />
                                                        </a>
                                                        <a className="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
                                                            <i className="ri-eye-line" />
                                                        </a>
                                                    </div> */}
                                            {/* <a className="cr-shopping-bag" href="javascript:void(0)">
                                                        <i className="ri-shopping-bag-line" />
                                                    </a> */}
                                            {/* <Link className="cr-shopping-bag" to='/product'><i className="ri-shopping-bag-line" /></Link> */}
                                            <p className="cr-shopping-bag" ><i className="ri-shopping-bag-line" /></p>
                                        </div>
                                    </div>
                                    <div className="cr-product-details">
                                        <h6>
                                            {item.title}
                                        </h6>
                                        <p>{item.description}</p>
                                        {/* <p className="cr-price"><span className="new-price">₹{item.price}</span> </p> */}
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>

                    {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="cr-popular-product">
                                <div className="slick-slide">
                                    {
                                        game?.map((item) => (
                                            
                                                <div className="cr-product-card">
                                                    <div className="cr-product-image">
                                                        <div className="cr-product-image">
                                                            <div className="cr-image-inner zoom-image-hover">
                                                                <img src={item.image} alt="product-1" />
                                                            </div>
                                                            
                                                            <p className="cr-shopping-bag" onClick={() => navigate("/product", { state: { id: item._id } })}><i className="ri-shopping-bag-line" /></p>
                                                        </div>
                                                    </div>
                                                    <div className="cr-product-details">
                                                        <div className="cr-brand">
                                                            {item.title}
                                                            <div className="cr-star">
                                                                <i className="ri-star-fill" />
                                                                <i className="ri-star-fill" />
                                                                <i className="ri-star-fill" />
                                                                <i className="ri-star-fill" />
                                                                <i className="ri-star-line" />
                                                                <p>(4.5)</p>
                                                            </div>
                                                        </div>

                                                        <p>{item.description}</p>
                                                        <p className="cr-price"><span className="new-price">₹{item.price}</span> </p>
                                                    </div>
                                                </div>
                                         
                                        ))
                                    }
                                    <div className="cr-product-card">
                                        <div className="cr-product-image">
                                            <div className="cr-image-inner zoom-image-hover">
                                                <img src="assets/img/product/9.jpg" alt="product-1" />
                                            </div>
                                            <div className="cr-side-view">
                                                <a href="javascript:void(0)" className="wishlist">
                                                    <i className="ri-heart-line" />
                                                </a>
                                                <a className="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
                                                    <i className="ri-eye-line" />
                                                </a>
                                            </div>
                                            <a className="cr-shopping-bag" href="javascript:void(0)">
                                                <i className="ri-shopping-bag-line" />
                                            </a>
                                        </div>
                                        <div className="cr-product-details">
                                            <div className="cr-brand">
                                                <a href="shop-left-sidebar.html">Snacks</a>
                                                <div className="cr-star">
                                                    <i className="ri-star-fill" />
                                                    <i className="ri-star-fill" />
                                                    <i className="ri-star-fill" />
                                                    <i className="ri-star-fill" />
                                                    <i className="ri-star-line" />
                                                    <p>(4.5)</p>
                                                </div>
                                            </div>
                                            <a href="product-left-sidebar.html" className="title">Best snakes with hazel nut
                                                mix pack 200gm</a>
                                            <p className="cr-price"><span className="new-price">$120.25</span> <span className="old-price">$123.25</span></p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
            </section>
        </>
    )
}

export default PopularProduct
