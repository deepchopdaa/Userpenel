import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AOS from "aos";
import "aos/dist/aos.css";
const Register = () => {
    const navigate = useNavigate("/")
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 400, once: false });
        AOS.refresh();
    }, []);
    const handleRegister = async (values) => {
        console.log(values)
        try {
            let res = await axios.post("http://localhost:3100/auth/register", values);
            console.log(res)
            toast.success("User Register Sucessfully");
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (e) {
            console.log(e.response.data)
            toast.error(e.response.data);
        }
    }
    return (
        <>
            <div className="flex">

                {/* <div id="cr-overlay">
                    <span className="loader" />
                </div> */}
                {/* <Header/> */}
                {/* Breadcrumb */}
                <section className="section-breadcrumb">
                    <div className="cr-breadcrumb-image">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cr-breadcrumb-title">
                                        <h2>Register</h2>
                                        <span>
                                            {" "}
                                            <Link to='/'>Home - Register</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Login */}
                <section className="section-login padding-tb-100">
                    <div className="container">
                        <div className="row d-none">
                            <div className="col-lg-12">
                                <div
                                    className="mb-30"
                                    data-aos="fade-up"

                                >
                                    <div className="cr-banner">
                                        <h2>Register</h2>
                                    </div>
                                    <div className="cr-banner-sub-title">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore lacus vel facilisis.{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div
                                    className="cr-login"
                                    data-aos="fade-up"

                                >
                                    {/* {<div className="form-logo">
                                                          <img src="assets/img/logo/logo.png" alt="logo" />
                                                      </div>} */}
                                    <Formik
                                        initialValues={{
                                            name: "",
                                            email: "",
                                            password: "",
                                        }}
                                        validationSchema={Yup.object({
                                            name: Yup.string().required("Required name"),
                                            email: Yup.string().email("Invalid email format").required("Required Email"),
                                            password: Yup.string().min(6, "Password must be at least 6 characters").required("Required Password"),
                                        })}
                                        onSubmit={(values) => {
                                            console.log("Form Data:", values);
                                            handleRegister(values)
                                        }}
                                    >
                                        {({ handleSubmit }) => (
                                            <Form className="cr-content-form" onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter Your Name"
                                                        className="cr-form-control"
                                                    />
                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                </div>
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
                                                        placeholder="Enter Your password"
                                                        className="cr-form-control"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>
                                                <ToastContainer />
                                                <br />
                                                <div className="login-buttons">
                                                    <button type="submit" className="cr-button">
                                                        Register
                                                    </button>
                                                    <Link to='/'>Signin</Link>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </div>

        </>
    )
}

export default Register
