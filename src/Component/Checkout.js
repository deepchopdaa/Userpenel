import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           priceId: "price_1R6UjsGYnZ8SWQqpgwZcoGJQ" // Replace with your actual Price ID
  //         }),
  //       });

  //       const data = await response.json();
  //       if (data.clientSecret) {
  //         setClientSecret(data.clientSecret);
  //       } else {
  //         console.error("Error fetching client secret:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchClientSecret();
  // }, []);

  const options = { clientSecret };

  return (
    // <div id="checkout">
    //   {clientSecret ? (
    //     <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
    //       <EmbeddedCheckout />
    //     </EmbeddedCheckoutProvider>
    //   ) : (
    //     <p>Loading payment details...</p>
    //   )}
    // </div>
  <>
  SDS</>
  );
};

export default CheckoutForm;
