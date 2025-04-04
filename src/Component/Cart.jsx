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
    const [Total, setTotal] = useState(0);
    const [id, setid] = useState(null)
    const navigate = useNavigate("/")


    /* ReZorPay Integrete  Start */

    useEffect(() => {
        // Dynamically add Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script); // Cleanup script on unmount
        };
    }, []);

    const handlePayment = async (event) => {
        event.preventDefault();
        alert("sdsdasd")
        try {
            const { data } = await axios.post("http://localhost:3100/payment/create-order", {
                amount: Total, // Amount in INR
                currency: "INR",
            });

            // Ensure Razorpay is available before calling it
            if (!window.Razorpay) {
                alert("Razorpay SDK failed to load. Check your internet connection.");
                return;
            }

            const options = {
                key: "rzp_test_ByLYqGFo9id87j", // Replace with your Razorpay Key ID
                amount: data.amount,
                currency: data.currency,
                order_id: data.id,
                name: "Game Zone",
                description: "Test Transaction",
                handler: async function (response) {
                    const verify = await axios.post("http://localhost:3100/payment/verify-payment", response);
                    if (verify.data.success) {
                        toast.success("Your Ticket Booking Success")
                    } else {
                        alert("Payment verification failed!");
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "98765432104",
                },
                theme: {

                    color: "#ff0000",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            handleCheckout()
        } catch (error) {
            console.error("Payment Error:", error);
        }
    };

    /* ReZorPay Integrete  End */

    useEffect(() => {
        // if (cart.length === 0) fetchCart();  // ✅ Prevents re-fetching after first event
        // TotalAmmount();
        fetchCart()
    }, []);

    /* useEffect(()=>{
        TotalAmmount(); 
    },[cart]) */

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
    const TotalAmmount = async () => {
        try {
            const response = await axios.get("http://localhost:3100/cart/getTotal", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }); 
            console.log(response.data)
            setTotal(response.data.total);

        } catch (error) {
            console.error("Error fetching Total Of  items", error);
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

            setCart([])
        } catch (error) {
            console.error("Error during checkout", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const handleDelete = async (id, event) => {
        try {
            event.preventDefault();
            console.log(id)
            await axios.delete(`http://localhost:3100/cart/deletecart/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setCart(cart.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };


    const handleQuantityChange = (id, delta, event) => {
        event.preventDefault();
        setCart((prevCart) =>
            prevCart.map(item =>
                item._id === id ? { ...item, ticket: Math.max(1, item.ticket + delta) } : item
            )
        );
    };

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.ticket * item.t_price, 0);
        setTotal(newTotal);
        console.log(Total)
    }, [cart]);

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
                                        <form >
                                            <div className="cr-table-content">
                                                <table>
                                                    <thead className='bg-dark'>
                                                        <tr>
                                                            <th>Games</th>
                                                            <th>Time</th>
                                                            <th>price</th>
                                                            <th className="text-center">Ticket</th>
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
                                                                                {/* <button type="button" className="plus">+</b utton>
                                                                                <input type="text" placeholder="." defaultValue={item.ticket} minLength={1} maxLength={20} className="quantity" />
                                                                                <button type="button" className="minus">-</button> */}
                                                                                <button className='text-light' onClick={(e) => handleQuantityChange(item._id, -1, e)}>-</button>
                                                                                <input className='text-light' type="text" value={item.ticket} readOnly />
                                                                                <button className='text-light' onClick={(e) => handleQuantityChange(item._id, 1, e)}>+</button>
                                                                            </div>
                                                                        </td>
                                                                        <td className="cr-cart-subtotal">₹{item.ticket * item.t_price}</td>
                                                                        <td className="cr-cart-remove">
                                                                            <button className='bg-danger' onClick={(e) => handleDelete(item._id, e)}>
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
                                                        <button className="cr-button" onClick={(e) => handlePayment(e)}>
                                                            Payment
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
