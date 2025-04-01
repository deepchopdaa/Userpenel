import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";




const UserDetail = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    // Fetch user details (Replace with actual API)
    const GetDetails = async () => {
        await axios.get("http://localhost:3100/user/getuserdetails", {

            headers: { Authorization: "Bearer " + localStorage.getItem("token") },

        }) // Example API route
            .then((response) => {
                console.log(response.data)
                setUser(response.data)
            })
            .catch(error => console.error("Error fetching user:", error));
    }

    useEffect(()=>{
        GetDetails()
    },[])

    // Handle Input Change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Username is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    // Handle Form Submission
    const handleSubmit = async (values) => {
        console.log(values, "User Details");
        await axios.put("http://localhost:3100/user/updateuser", values, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }) // Example API route
            .then((response) => {
                console.log(response.data)
                toast.success("User Details Updated !")
            })
            .catch((error) => {
                console.error("Error updating user:", error)
                toast.error("User Details Updated !")
            });
    };

    return (

        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="card bg-secondary text-light p-4 shadow-lg" style={{ width: "400px", borderRadius: "12px" }}>
                <h3 className="text-danger text-center mb-3">Edit User Details</h3>
                <Formik
                    initialValues={user}
                    enableReinitialize={true} // Allows initial values to update
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label className="form-label text-danger">Username</label>
                                <Field type="text" name="name" className="form-control bg-dark text-light" />
                                <ErrorMessage name="name" component="div" className="text-warning" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-danger">Email</label>
                                <Field type="email" name="email" className="form-control bg-dark text-light" />
                                <ErrorMessage name="email" component="div" className="text-warning" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-danger">Password</label>
                                <Field type="password" name="password" className="form-control bg-dark text-light" />
                                <ErrorMessage name="password" component="div" className="text-warning" />
                            </div>
                            <button type="submit" className="btn btn-danger w-100">
                                {isSubmitting ? "Updating..." : "Update"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <ToastContainer />
            </div>
        </div>

    );
};

export default UserDetail;
