import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Protector/RouteProtector.jsx"; // Import ProtectedRoute
import "./App.css";
import Login from "./Component/Login";
import Register from "./Component/Register";
import MainLayout from "./Component/MainLayout";
import Home from "./Component/Home.jsx";
import ProductDetail from "./Component/ProductDetail.jsx";
import ContactUs from "./Component/ContactUs.js";
import Cart from "./Component/Cart.jsx";
import PopularProduct from "./Component/PopularProduct.jsx";
import Testlogin from "./Component/Testlogin.js"
import Game from "./Component/Games.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []); // Fix: Added dependency array to run only once on mount

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Login",
      element: <Testlogin />,
    },
    {
      path: "/game",
      element: <Game />,
    },
    {
      path: "/product",
      element: <ProductDetail />,
    },
    {
      path: "/cart",
      element: (
        <Cart />  
      ),
    },
    {
      path: "/home/populor",
      element: <PopularProduct />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
