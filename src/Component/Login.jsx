import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, UNSAFE_getPatchRoutesOnNavigationFunction, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AOS from "aos";
import { IoMdHome } from "react-icons/io";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import Header from './Header';



/* import Header from './Header';
import HeroSlider from './HeroSlider'
import Category from './Category'
import Product from './Product'
import ProductSlider from './ProductSlider'
import ServidesSlider from './ServidesSlider'
import Review from './Review'
import Footer from './Footer'
 */

const Login = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 200, once: false });
        AOS.refresh();
    }, []);

    const navigate = useNavigate("/")
    const handleLogin = async (values) => {
        console.log(values);
        try {
            let res = await axios.post("https://gamezone-r2eq.onrender.com/auth/login", values);
            console.log(res.data.token);
            const token = res.data.token;
            if (token !== undefined) {
                window.localStorage.setItem("token", token);
                toast.success("User Login Successfully");
                navigate("/")
            } else {
                toast.error(res.data);
            }
        } catch (e) {
            console.log(e);
            toast.error("User Not Login Successfully");
        }
    };
    return (
        <>
            {/* <Header />
            <HeroSlider />
            <Category />
            <Product />
            <ProductSlider />
            <ServidesSlider />
            <Review />
            <Footer /> */}
            {/* Breadcrumb */}
            {/* <section className="section-breadcrumb">
                <div className="cr-breadcrumb-image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cr-breadcrumb-title">
                                    <h2>Login</h2>
                                    <span>
                                        <Link to="/">Home</Link> - Login
                                    </span>
                                </div>s
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* Login Section */}
            <Header />
            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="login-container" data-aos="fade-up">
                                <h3 className="login-title">🎮 Login</h3>
                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: "",
                                        remember: false,
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email("Invalid email format")
                                            .required("Required email"),
                                        password: Yup.string()
                                            .min(6, "Password must be at least 6 characters")
                                            .required("Required password"),
                                    })}
                                    onSubmit={handleLogin}
                                >
                                    {({ handleSubmit }) => (
                                        <Form className="login-form" onSubmit={handleSubmit}>
                                            <div className="login-form-group">
                                                <label className="login-label">Email Address*</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Your Email"
                                                    className="login-input"
                                                />
                                                <ErrorMessage name="email" component="div" className="login-error" />
                                            </div>
                                            <div className="login-form-group">
                                                <label className="login-label">Password*</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Your Password"
                                                    className="login-input"
                                                />
                                                <ErrorMessage name="password" component="div" className="login-error" />
                                            </div>
                                            <div className="login-remember">
                                                <span className="login-form-group custom">
                                                    <Field type="checkbox" name="remember" id="remember" />
                                                    <label htmlFor="remember"> Remember Me</label>
                                                </span>
                                                <Link to="/forgot" className="login-link">Forgot Password?</Link>
                                            </div>
                                            <br />
                                            <div className="login-buttons">
                                                <button type="submit" className="login-button">Login</button>
                                                <Link to="/register" className="login-signup-link">Signup</Link>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Toast Notifications */}
            <ToastContainer />

        </>
    );
};

export default Login;
