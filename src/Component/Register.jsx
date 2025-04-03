import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Register = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, delay: 400, once: false });
        AOS.refresh();
    }, []);

    const handleRegister = async (values) => {
        console.log(values);
        try {
            let res = await axios.post("http://localhost:3100/auth/register", values);
            console.log(res);
            toast.success("User Registered Successfully");
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (e) {
            console.log(e.response.data);
            toast.error(e.response.data);
        }
    };

    return (
        <>
            <Header/>
            <section className="login-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="login-container" data-aos="fade-up">
                                <h3 className="login-title">🎮 Register</h3>
                                <Formik
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        password: "",
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().required("Required Name"),
                                        email: Yup.string().email("Invalid email format").required("Required Email"),
                                        password: Yup.string().min(6, "Password must be at least 6 characters").required("Required Password"),
                                    })}
                                    onSubmit={(values) => {
                                        console.log("Form Data:", values);
                                        handleRegister(values);
                                    }}
                                >
                                    {({ handleSubmit }) => (
                                        <Form className="login-form" onSubmit={handleSubmit}>
                                            <div className="login-form-group">
                                                <label className="login-label">User Name</label>
                                                <Field type="text" name="name" placeholder="Enter Your Name" className="login-input" />
                                                <ErrorMessage name="name" component="div" className="login-error" />
                                            </div>
                                            <div className="login-form-group">
                                                <label className="login-label">Email Address*</label>
                                                <Field type="email" name="email" placeholder="Enter Your Email" className="login-input" />
                                                <ErrorMessage name="email" component="div" className="login-error" />
                                            </div>
                                            <div className="login-form-group">
                                                <label className="login-label">Password*</label>
                                                <Field type="password" name="password" placeholder="Enter Your Password" className="login-input" />
                                                <ErrorMessage name="password" component="div" className="login-error" />
                                            </div>

                                            <br />
                                            <div className="login-buttons">
                                                <button type="submit" className="login-button">Register</button>
                                                <Link to="/login" className="login-signup-link">Signin</Link>
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
        </>
    );
};

export default Register;
