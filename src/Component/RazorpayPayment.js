import React, { useEffect } from "react";
import axios from "axios";

const RazorpayPayment = () => {
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

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:3100/payment/create-order", {
        amount: 500, // Amount in INR
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
            alert("Payment successful!");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#ff0000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return <button onClick={handlePayment} className="btn btn-danger">Pay with Razorpay</button>;
};

export default RazorpayPayment;
