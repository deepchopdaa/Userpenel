import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import 'react-toastify/dist/ReactToastify.css';


const ContactUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 200, once: false });
        AOS.refresh();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        console.log("Form Data:", values);
        try {
            const res = await axios.post("http://localhost:3100/contact/addcontact", values, {
                headers: {
                    /* "Content-Type": "multipart/form-data", */
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then((data)=>{   
                console.log(data);
                toast.success("Contact Form Submited Successfully Please Check Your");
            }).catch((e)=>{
                toast.error("Data Is Not Submited")
            })
            resetForm(); // Reset form after submission
        } catch (e) {
            console.log("Contact from Notsubmittted")
        }
    };
    return (
        <>
            <Header />
            <div>
                {/* Breadcrumb */}
              {/*   <section className="section-breadcrumb">
                    <div className="cr-breadcrumb-image">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cr-breadcrumb-title">
                                        <h2>Contact Us</h2>
                                        <span><Link to='/home'>Home</Link> - Contact Us</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* Contact */}
                <section className="section-Contact padding-tb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-30" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                                    <div className="cr-banner">
                                        <h2>Get in Touch</h2>
                                    </div>
                                    <div className="cr-banner-sub-title">
                                        <p>Prepared is me marianne pleasure likewise debating. Wonder an unable except better stairs
                                            do ye
                                            admire. His secure called esteem praise.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-minus-24">
                            <div className="col-lg-4 col-md-6 col-12 mb-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                                <div className="cr-info-box">
                                    <div className="cr-icon">
                                        <i className="ri-phone-line" />
                                    </div>
                                    <div className="cr-info-content">
                                        <h4 className="heading">Contact</h4>
                                        <p><a href="javascript:void(0)"><i className="ri-phone-line" /> &nbsp; (+91)-9876XXXXX</a></p>
                                        <p><a href="javascript:void(0)"><i className="ri-phone-line" /> &nbsp; (+91)-987654XXXX</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12 mb-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={600}>
                                <div className="cr-info-box">
                                    <div className="cr-icon">
                                        <i className="ri-mail-line" />
                                    </div>
                                    <div className="cr-info-content">
                                        <h4 className="heading">Mail &amp; Website</h4>
                                        <p><a href="javascript:void(0)"><i className="ri-mail-line" /> &nbsp;
                                            bookmygame@gmail.com</a></p>
                                        <p><a href="javascript:void(0)"><i className="ri-globe-line" /> &nbsp; www.bookmygame.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mb-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={800}>
                                <div className="cr-info-box">
                                    <div className="cr-icon">
                                        <i className="ri-map-pin-line" />
                                    </div>
                                    <div className="cr-info-content">
                                        <h4 className="heading">Address</h4>
                                        <p><a href="javascript:void(0)"><i className="ri-map-pin-line" /> &nbsp; 140 Ruami Moraes
                                            Filho,
                                            987 - mumbai- MA, 40352, INDIA   .</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row padding-t-100 mb-minus-24">
                            <div className="col-md-6 col-12 mb-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={400}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319" title="maps">
                                </iframe>
                            </div>
                            <div className="col-md-6 col-12 mb-24" data-aos="fade-up" data-aos-duration={2000} data-aos-delay={800}>
                                <Formik
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        number: "",
                                        description: "",
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string().min(3, "Name must be at least 3 characters").required("Required Name"),
                                        email: Yup.string().email("Invalid email format").required("Required Email"),
                                        number: Yup.string()
                                            .matches(/^\d{10}$/, "Phone must be 10 digits")
                                            .required("Required Number"),
                                        description: Yup.string().min(10, "Message must be at least 10 characters").required("Required Message"),
                                    })}
                                    onSubmit={handleSubmit}
                                >
                                    {({ handleSubmit }) => (
                                        <Form className="cr-content-form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <Field type="text" name="name" placeholder="Full Name" className="cr-form-control" />
                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group">
                                                <Field type="email" name="email" placeholder="Email" className="cr-form-control" />
                                                <ErrorMessage name="email" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group">
                                                <Field type="text" name="number" placeholder="Phone" className="cr-form-control" />
                                                <ErrorMessage name="number" component="div" className="text-danger" />
                                            </div>

                                            <div className="form-group">
                                                <Field as="textarea" name="description" className="cr-form-control" rows={4} placeholder="Message" />
                                                <ErrorMessage name="description" component="div" className="text-danger" />
                                            </div>

                                            <button type="submit" className="cr-button">Submit</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>

                <ToastContainer />
            </div>
            <Footer />
        </>
    )
}

export default ContactUs
