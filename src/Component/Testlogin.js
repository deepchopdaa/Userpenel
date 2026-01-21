import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, UNSAFE_getPatchRoutesOnNavigationFunction, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';




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
                navigate("/product")
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
            <section className="section-breadcrumb">
                <div className="cr-breadcrumb-image">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cr-breadcrumb-title">
                                    <h2>Login</h2>
                                    <span>
                                        <Link to="/">Home</Link> - Login
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Login Section */}
            <section className="section-login padding-tb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className="cr-login"
                                data-aos="fade-up"
                            >
                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: "",
                                        remember: false,
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string().email("Invalid email format").required("Required email"),
                                        password: Yup.string().min(6, "Password must be at least 6 characters").required("Required password"),
                                    })}
                                    onSubmit={handleLogin}
                                >
                                    {({ handleSubmit }) => (
                                        <Form className="cr-content-form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Email Address*</label>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Your Email"
                                                    className="cr-form-control"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>
                                            <div className="form-group">
                                                <label>Password*</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Your Password"
                                                    className="cr-form-control"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                            </div>
                                            <div className="remember">
                                                <span className="form-group custom">
                                                    <Field type="checkbox" name="remember" id="remember" />
                                                    <label htmlFor="remember">Remember Me</label>
                                                </span>
                                                <Link to="/forgot" className="link">Forgot Password?</Link>
                                            </div>
                                            <br />
                                            <div className="login-buttons">
                                                <button type="submit" className="cr-button">
                                                    Login
                                                </button>
                                                <Link to="/register">Signup</Link>
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

            {/* Scroll to Top Button */}
            <a href="#Top" className="back-to-top">
                <i className="ri-arrow-up-line" />
                <div className="back-to-top-wrap">
                    <svg viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                    </svg>
                </div>
            </a>
        </>
    );
};

export default Login;
