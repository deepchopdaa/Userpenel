import React, { Children, useEffect, useReducer, useState } from 'react'
import PopularProduct from './PopularProduct'
import Footer from './Footer'
import Header from './Header'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import * as Yup from "yup";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const ProductDetail = () => {
    const location = useLocation();
    /* const id = location.state?.id || null; */ // Make sure ID is either valid or null
    const [game, setgame] = useState([]);
    const [Game_id, setGame_id] = useState(null)
    const [ticket, setticket] = useState(null)
    const [t_price, sett_price] = useState(null)
    const [amount, setamount] = useState(null)
    const [time_slot, settime_slot] = useState(null)
    const navigate = useNavigate("/")
    const [date, setdate] = useState(Date.now)
    const [gamereview, setgamereview] = useState([]);
    const [reviews, setreviews] = useState();
    const [reviewcount, setreviewcount] = useState(0);
    const [review, setreview] = useState(null);
    const [users, setUsers] = useState([]);
    const [rating, setrating] = useState(null)
    const [comment, setcomment] = useState(null)
    const timeSlots = [
        "9-10 AM", "10-11 AM", "11-12 AM", "12-1 PM",
        "1-2 PM", "2-3 PM", "3-4 PM", "4-5 PM",
        "5-6 PM", "6-7 PM", "7-8 PM", "8-9 PM"
    ];

    /* Date and time Validation */

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Get current time in HH:MM format

    const MIN_TIME = "09:00"; // 9:00 AM
    const MAX_TIME = "21:00"; // 9:00 PM

    const { id } = useParams()
    console.log(id, "ID For get Perticulor game");

    const validationSchema = Yup.object().shape({
        date: Yup.string()
            .required("Please select a date")
            .test("is-future-date", "Date must be today or in the future", (value) => {
                return value >= today; // Ensures the selected date is today or later
            }),
        timeSlot: Yup.string()
            .required("Please select a time slot")
            .test("is-valid-time", "Time must be between 9:00 AM and 9:00 PM", (value) => {
                return value >= MIN_TIME && value <= MAX_TIME; // Ensures time is between 9 AM - 9 PM
            })
            .test("is-future-time", "Time must be later than the current time", function (value) {
                const selectedDate = this.parent.date; // Get the selected date
                if (selectedDate === today) {
                    return value > currentTime; // Ensures time is greater than now if today
                }
                return true; // Allow any valid time for future dates
            }),
        ticketCount: Yup.number()
            .min(1, "At least 1 ticket is required")
            .max(10, "Maximum 10 tickets allowed")
            .required("Please enter the number of tickets"),
    });


    const [token, settoken] = useState(localStorage.getItem("token"));
    const Expiryverify = () => {
        console.log("Token verify useEffect")
        if (token) {
            const decordetoken = jwtDecode(token);
            const expiry = decordetoken.exp;
            console.log(expiry)
            console.log(decordetoken, "<-- decode Token --->")
            const currenttime1 = Math.floor(Date.now() / 1000);
            console.log(currenttime1, "<-- current time -->")
            if (currenttime1 > expiry) {
                console.log('Token Expried')
                toast.error("Your Token is Expried")
                localStorage.removeItem('token');
                settoken(null)
            }
        }
    }

    const Reviews = async () => {
        await axios.get("https://gamezone-r2eq.onrender.com/review/getuserreview").then((review) => {
            setreviews(review.data)
            console.log(review.data, "<------ user Reviews from review table ---->")
        }).catch(() => {
            console.log("Review Not Found")
        })
    }

    const GameReview = async () => {
        await axios.get(`https://gamezone-r2eq.onrender.com/review/getGamereview/${id}`).then((item) => {
            setgamereview(item.data);
            console.log(item.data, "<----- perticulor game review ---->")
            console.log(item.data.length)
            setreviewcount(item.data.length)
        }).catch(() => {
            console.log("This Game Review Not Found")
        })
        // Fetch users
        const userResponse = await axios.get("https://gamezone-r2eq.onrender.com/user/getuserReview", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setUsers(userResponse.data);
        console.log("Users:", userResponse.data);
        console.log(users)
    }

    const fetchData = async () => {
        try {
            console.log("Fetching data for ID:", id);
            setgame([]); // Clear previous game data before fetching new
            const response = await axios.get(`https://gamezone-r2eq.onrender.com/userpenel/productDetail/${id}`);
            console.log("API Response:", response.data);
            setgame(response.data);
        } catch (error) {
            console.error("Data Fetching Error:", error);
            setgame([]); // Ensure state is cleared on error
        }
    };

    /* Get Review For Specific Game */
    /*  const GetGameReview = async (req, res) => {
         try {
             const responce = await axios.get(`https://gamezone-r2eq.onrender.com/review/getdetailreview/${id}`, {
                 headers: {
                     Authorization: "Bearer " + localStorage.getItem("token")
                 }
             }).then((review) => {
                 console.log(review , "<-- review for specific game -->");
                 setreview(review.data)
             }).catch((e) => {
                 console.log("Error Getting When Game Review Fetching")
             })
             // Fetch users
             const userResponse = await axios.get("https://gamezone-r2eq.onrender.com/user/getuserReview", {
                 headers: { Authorization: "Bearer " + localStorage.getItem("token") },
             });
             setUsers(userResponse.data);
             console.log("Users:", userResponse.data);
             console.log(users)
         } catch (e) {
             console.log("Error Getting When Game Review Fetching")
         }
     } */

    // Function to get username using user_id
    const getUsername = (userId) => {
        console.log(users);
        const user = users.find(u => u._id === userId);
        return user ? user.name : "Unknown User";
    };
    const CheckID = () => {
        if (!id) {
            console.log("No valid ID, resetting game data...");
            setgame([]); // Reset game data when ID is not provided
            return;
        }
    }

    useEffect(() => {
        console.log("Received ID:", id);
        console.log("Location Object:", location);
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        CheckID()
        fetchData();
        Reviews();
        GameReview();
    }, [id]); // Dependency array includes ID
    const { price, image, title, category, description } = game;
    console.log(price, image, title, category, description)
    const init = price;
    console.log(init)
    const reviewValidation = Yup.object({
        rating1: Yup.number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5")
            .required("Rating is required"),
        comment1: Yup.string()
            .min(5, "Comment must be at least 5 characters")
            .required("Comment is required"),
    });

    /* const Addreview = async (resetform) => {
        try {
            await axios.post("https://gamezone-r2eq.onrender.com/userpenel/addreview", { Game_id: id, rating, comment }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((item) => {
                console.log(item)

            }).catch((e) => {
                console.log("Review add Error", e)
            })
        } catch (e) {
            console.log("Add Review Error")
        }
    } */

    const addReview = async (values, resetform) => {
        console.log(values)
        try {
            await axios.post("https://gamezone-r2eq.onrender.com/userpenel/addreview", { Game_id: id, rating: values.rating1, comment: values.comment1 }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((item) => {
                console.log(item)
                toast(item.data)
                /*   resetform() */
            }).catch((e) => {
                console.log("Review add Error", e)
            })
        } catch (e) {
            console.log("Add Review Error")
        }
        resetform()
    }
    return (
        <>
            <Header />
            <div>
                {/* <section className="section-breadcrumb">
                    <div className="cr-breadcrumb-image">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cr-breadcrumb-title">
                                        <h2>Product</h2>
                                        <span><Link to='/home'>Home</Link> - Game</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* Product */}
                <section className="section-product padding-t-100">
                    <div className="container">
                        <div className="row mb-minus-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={600}>
                            <div className="col-xxl-4 col-xl-5 col-md-6 col-12 mb-24">
                                <div className="vehicle-detail-banner banner-content clearfix">
                                    <div className="banner-slider">
                                        <div className="slider slider-for">
                                            <div className="slider-banner-image">
                                                <div className="zoom-image-hover">
                                                    {/* <img src="assets/img/product/9.jpg" alt="product-tab-1" className="product-image" /> */}
                                                    <img src={image} alt="product-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-8 col-xl-7 col-md-6 col-12 mb-24">
                                <div className="cr-size-and-weight-contain">
                                    <h2 className="heading text-light">{title}</h2>
                                    <p>{description}</p>
                                </div>
                                <div className="cr-size-and-weight">
                                    <div className="cr-review-star">
                                        <p>({reviewcount})Review</p>
                                    </div>

                                    <div className="cr-product-price">
                                        <span className="new-price text-danger">₹{price}</span>
                                    </div>

                                    <div className="cr-add-card">
                                        {/* <div className="cr-qty-main">
                                            {/* <input type="text" placeholder="." defaultValue={1} minLength={1} maxLength={20} className="quantity" /> */}
                                        {/* <input type="text" placeholder="1" defaultValue={1} minLength={1} maxLength={20} className="quantity" />

                                        </div> */}
                                        <div className="cr-add-button">
                                            <button type="button" className="cr-button cr-shopping-bag"
                                                data-bs-toggle="modal"
                                                data-bs-target="#bookingModal"
                                            >Add To Ticket Menu</button>
                                        </div>
                                        {/* <div className="cr-card-icon">
                                            <a href="javascript:void(0)" className="wishlist">
                                                <i className="ri-heart-line" />
                                            </a>
                                            <a className="model-oraganic-product" data-bs-toggle="modal" href="#quickview" role="button">
                                                <i className="ri-eye-line" />
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={600}>
                            <div className="col-12">
                                <div className="cr-paking-delivery bg-dark text-light">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active bg-dark text-light" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="true">Description</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link bg-dark text-light" id="additional-tab" data-bs-toggle="tab" data-bs-target="#additional" type="button" role="tab" aria-controls="additional" aria-selected="false">Information</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link bg-dark text-light" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="false">Review</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                            <div className="cr-tab-content">
                                                <div className="cr-description">
                                                    <p>{description}</p>
                                                </div>
                                                {/* <h4 className="heading">Packaging &amp; Delivery</h4>
                                                <div className="cr-description">
                                                    <p>{description}</p>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="additional" role="tabpanel" aria-labelledby="additional-tab">
                                            <div className="cr-tab-content">
                                                <div className="cr-description">
                                                    <p>{description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Created Dymanic review */}

                                        <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                            <div className="cr-tab-content-from">
                                                {
                                                    gamereview?.map((item) => (
                                                        <div className="post">
                                                            <div className="content">
                                                                {/* <img src="assets/img/review/1.jpg" alt="review" /> */}
                                                                <div className="details">
                                                                    <span className="date">@{getUsername(item.user_id)}</span>
                                                                    <span className="name">{item.comment}</span>
                                                                </div>
                                                                <div className="cr-star">
                                                                    {Array.from({ length: 5 }, (_, i) => (
                                                                        <i key={i} className={i < item.rating ? "ri-star-fill text-warning" : "ri-star-line text-secondary"} />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p>{item.date}</p>
                                                        </div>
                                                    ))
                                                }
                                                <h4 className="heading text-light">Add a Review</h4>
                                                {/* <form action="javascript:void(0)">
                                                    <div className="cr-ratting-star">
                                                        <span>Your rating :</span>
                                                        <div className="cr-t-review-rating">
                                                            <i className="ri-star-s-fill" />
                                                            <i className="ri-star-s-fill" />
                                                            <i className="ri-star-s-line" />
                                                            <i className="ri-star-s-line" />
                                                            <i className="ri-star-s-line" />
                                                        </div>
                                                    </div>
                                                    <div className="cr-ratting-input">
                                                        <input name="your-name" placeholder="Name" type="text" />
                                                    </div>
                                                    <div className="cr-ratting-input">
                                                        <input name="your-email" placeholder="Email*" type="email" required />
                                                    </div>
                                                    <div className="cr-ratting-input form-submit">
                                                        <textarea name="your-commemt" placeholder="Enter Your Comment" defaultValue={""} />
                                                        <button className="cr-button" type="submit" value="Submit">Submit</button>
                                                    </div>
                                                </form> */}
                                                <div className="container mt-4 ">
                                                    <div className="card p-4 shadow bg-dark text-light">
                                                        <Formik
                                                            initialValues={{ rating1: "", comment1: "" }}
                                                            validationSchema={reviewValidation}
                                                            onSubmit={(values, { resetForm }) => {
                                                                addReview(values, resetForm); // Call your submit function
                                                                // Reset the form after submission
                                                            }}
                                                        >
                                                            {({ isSubmitting }) => (
                                                                <Form className='bg-dark text-light'>
                                                                    {/* Rating Field */}
                                                                    <div className="mb-3">
                                                                        <label className="form-label fw-bold">Rating (1-5):</label>
                                                                        <Field name="rating1" type="number" className="form-control bg-dark text-light" />
                                                                        <ErrorMessage
                                                                            name="rating1"
                                                                            component="div"
                                                                            className="text-danger mt-1"
                                                                        />
                                                                    </div>
                                                                    {/* Comment Field */}
                                                                    <div className="mb-3">
                                                                        <label className="form-label fw-bold">Comment:</label>
                                                                        <Field
                                                                            name="comment1"
                                                                            as="textarea"
                                                                            rows="3"
                                                                            className="form-control bg-dark text-light"
                                                                        />
                                                                        <ErrorMessage
                                                                            name="comment1"
                                                                            component="div"
                                                                            className="text-danger mt-1"
                                                                        />
                                                                    </div>

                                                                    {/* Submit Button */}
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-danger"
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </Form>
                                                            )}
                                                        </Formik>
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
                {/* Bootstrap Modal */}
                <div
                    className="modal fade"
                    id="bookingModal"
                    tabIndex="-1"
                    aria-labelledby="bookingModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-dark text-light">
                                <h5 className="modal-title" id="bookingModalLabel">
                                    Book Your Ticket
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body bg-dark text-light">
                                <Formik
                                    initialValues={{
                                        timeSlot: "",
                                        ticketCount: 0, // Set default to 1
                                        totalAmount: price ? price : 0,
                                        date: new Date().toISOString().split("T")[0], // Default to today's date
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { resetForm }) => {
                                        console.log("Booking Details:", values);
                                        const bookingDetails = {
                                            Game_id: id,
                                            ticket: values.ticketCount,
                                            time_slot: values.timeSlot,
                                            t_price: price ? price : 0,
                                            amount: values.totalAmount,
                                            date: values.date,
                                        };
                                        Expiryverify();
                                        const token1 = localStorage.getItem("token");
                                        if (token1) {
                                            axios
                                                .post("https://gamezone-r2eq.onrender.com/cart/addcart", bookingDetails, {
                                                    headers: {
                                                        Authorization: "Bearer " + localStorage.getItem("token"),
                                                    },
                                                })
                                                .then((item) => {
                                                    console.log(item.data, "add to cart ticket book response");
                                                    toast(item.data);
                                                })
                                                .catch((e) => {
                                                    console.log(e, "Record not inserted");
                                                    toast.error("Ticket Not Add To Menu");
                                                });

                                            resetForm();
                                        } else {
                                            toast.error("User Not Login, So please Login First");
                                        }
                                    }}
                                >
                                    {({ values, setFieldValue }) => (
                                        <Form className="bg-dark text-light">
                                            {/* Date Selection */}
                                            <div className="mb-3">
                                                <label className="form-label">Select Date:</label>
                                                <Field
                                                    type="date"
                                                    className="form-control bg-dark text-light"
                                                    name="date"
                                                    value={values.date}
                                                    min={today}
                                                    onChange={(e) => setFieldValue("date", e.target.value)}
                                                    style={{
                                                        position: "relative",
                                                        colorScheme: "dark",
                                                    }}
                                                />
                                                <style>
                                                    {`
            input[type="date"]::-webkit-calendar-picker-indicator {
              cursor: pointer;
            }
            input[type="date"] {
              color-scheme: dark;
            }
          `}
                                                </style>
                                                <ErrorMessage name="date" component="div" className="text-danger" />
                                            </div>

                                            {/* Time Slot Selection */}
                                            <h6>Select A Time Slot : (Ticket Book only between 9AM to 9PM)</h6>
                                            <div className="mb-3">
                                                <Field
                                                    as="select"
                                                    className="form-control bg-dark text-light"
                                                    name="timeSlot"
                                                    value={values.timeSlot}
                                                    onChange={(e) => setFieldValue("timeSlot", e.target.value)}
                                                    style={{
                                                        position: "relative",
                                                        colorScheme: "dark",
                                                    }}
                                                >
                                                    <option value="">Select a Time</option>
                                                    {/* Generate 9AM to 9PM time slots in 30-minute intervals */}
                                                    {Array.from({ length: 25 }, (_, index) => {
                                                        const hours = Math.floor(index / 2) + 9; // Start at 9 AM
                                                        const minutes = index % 2 === 0 ? "00" : "30"; // 30-minute interval
                                                        const time = `${String(hours).padStart(2, "0")}:${minutes}`;
                                                        return (
                                                            <option key={index} value={time}>
                                                                {time}
                                                            </option>
                                                        );
                                                    })}
                                                </Field>
                                                <ErrorMessage name="timeSlot" component="div" className="text-danger" />
                                            </div>

                                            {/* Number of Tickets */}
                                            <div className="mb-3 mt-3">
                                                <label className="form-label">Number of Tickets: </label>
                                                <Field
                                                    type="number"
                                                    className="form-control bg-dark text-light"
                                                    name="ticketCount"
                                                    min="1"
                                                    max="10"
                                                    onChange={(e) => {
                                                        const ticketCount = parseInt(e.target.value) || 1;
                                                        setFieldValue("ticketCount", ticketCount);
                                                        setFieldValue("totalAmount", ticketCount * (price ? price : 0)); // Update total
                                                    }}
                                                />
                                                <ErrorMessage name="ticketCount" component="div" className="text-danger" />
                                            </div>

                                            {/* Total Amount */}
                                            <div className="mb-3">
                                                <label className="form-label">Total Amount:</label>
                                                <input
                                                    type="text"
                                                    className="form-control bg-dark text-light"
                                                    value={`₹${values.totalAmount}`}
                                                    readOnly
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                className="btn btn-danger"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                Add To Ticket
                                            </button>
                                        </Form>
                                    )}
                                </Formik>

                                {/*  <Datetime />; */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <PopularProduct />
            <Footer />
        </>
    )
}

export default ProductDetail
