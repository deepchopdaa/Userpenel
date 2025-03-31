import React, { useEffect, useState } from 'react'
import PopularProduct from './PopularProduct'
import Footer from './Footer'
import Header from './Header'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
    const [cart, setCart] = useState([]);
    const [games, setGames] = useState({});
    const [id, setid] = useState(null)
    const navigate = useNavigate("/")

    useEffect(() => {
        if (cart.length === 0) fetchCart();  // ✅ Prevents re-fetching after first event
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get("http://localhost:3100/cart/getcart", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setCart(response.data);
            console.log(cart)
            fetchGameDetails(response.data);
        } catch (error) {
            console.error("Error fetching cart items", error);
        }
    };

    const fetchGameDetails = async (cartItems) => {
        const gameIds = cartItems.map(item => item.Game_id);
        try {
            const response = await axios.post("http://localhost:3100/game/getcartGame", { gameIds });
            console.log(response)
            const gameData = response.data.reduce((acc, game) => {
                acc[game._id] = game.title;
                return acc;
            }, {});
            setGames(gameData);
        } catch (error) {
            console.error("Error fetching game details", error);
        }
    };

    const handleCheckDelete = async () => {
        try {

            await axios.delete(`http://localhost:3100/cart/Checkout`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            // setCart(cart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        try {
            for (const item of cart) {
                await axios.post("http://localhost:3100/ticket/addticket",
                    {
                        user_id: item.user_id,
                        Game_id: item.Game_id,
                        amount: item.ticket * item.t_price,
                        SeatNumber: item.ticket, // Assuming ticket represents the seat count
                        date: item.date,
                        time_slot: item.time_slot
                    },
                    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
                );  
            }
            handleCheckDelete();
            toast.success("Your Ticket Booking Success")
            setCart([])
            navigate('/checkout')
        } catch (error) {
            console.error("Error during checkout", error);
            toast.error("Failed to place order. Please try again.");
        }
    };


    const handleDelete = async (id) => {
        try {
            console.log(id)
            await axios.delete(`http://localhost:3100/cart/deletecart/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setCart(cart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };


    const handleQuantityChange = (id, delta) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item._id === id ? { ...item, ticket: Math.max(1, item.ticket + delta) } : item
            )
        );
    };

    return (
        <>
            <Header />
            <div>
                {/* Breadcrumb */}
                {/*  <section className="section-breadcrumb">
                    <div className="cr-breadcrumb-image">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cr-breadcrumb-title">
                                        <h2>Cart</h2>
                                        <span> <Link to='/home'>Home</Link>/ Cart</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* Cart */}

                <section className="section-cart bg-dark padding-t-100">
                    <div className="container">
                        <div className="row d-none">
                            <div className="col-lg-12">
                                <div className="mb-30" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                                    <div className="cr-banner">
                                        <h2 className='text-light'>Cart</h2>
                                    </div>
                                    <div className="cr-banner-sub-title ">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore lacus vel facilisis. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="cr-cart-content" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                                    <div className="row">
                                        <form action="#">
                                            <div className="cr-table-content">
                                                <table>
                                                    <thead className='bg-dark'>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Time Slot</th>
                                                            <th>price</th>
                                                            <th className="text-center">Quantity</th>
                                                            <th>Total</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cart?.map((item) => (
                                                                <>
                                                                    <tr key={item._id}>
                                                                        <td className="cr-cart-name">

                                                                            {/* <img src="assets/img/product/1.jpg" alt="product-1" className="cr-cart-img" /> */}
                                                                            {games[item.Game_id] || "Loading..."}

                                                                        </td>

                                                                        <td className="cr-cart-price">
                                                                            <span className="amount">{item.time_slot}</span>
                                                                        </td>
                                                                        <td className="cr-cart-price">
                                                                            <span className="amount">₹{item.t_price}</span>
                                                                        </td>
                                                                        <td className="cr-cart-qty ">
                                                                            <div className="cart-qty-plus-minus bg-dark">
                                                                                {/* <button type="button" className="plus">+</button>
                                                                                <input type="text" placeholder="." defaultValue={item.ticket} minLength={1} maxLength={20} className="quantity" />
                                                                                <button type="button" className="minus">-</button> */}
                                                                                <button className='text-light' onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                                                                                <input className='text-light' type="text" value={item.ticket} readOnly />
                                                                                <button className='text-light' onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="cr-cart-subtotal">₹{item.ticket * item.t_price}</td>
                                                                        <td className="cr-cart-remove">
                                                                            <button className='bg-danger' onClick={() => { handleDelete(item._id); }}>
                                                                                <i className="ri-delete-bin-line text-dark" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            ))
                                                        }
                                                    </tbody >
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="cr-cart-update-bottom">
                                                        {/* <a href="javascript:void(0)" className="cr-links">Continue Shopping</a> */}
                                                        <Link to='/' className='text-light'>Continue To Home</Link>
                                                        <button className="cr-button" onClick={handleCheckout}>
                                                            Check Out
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div >
            <PopularProduct />
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Cart
