import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginSignUp from "./components/Home/LoginSignUp";
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar";
import SellProducts from "./components/Product/SellProducts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import PaymentDetails from "./components/Product/PaymentDetails";
import SellerDashBoard from "./components/Dashboard/SellerDashBoard";
import HotSales from "./components/HotSales/HotSales";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole")?.toLowerCase() || "buyer";
  });

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole")?.toLowerCase();

    setIsLoggedIn(storedLoginStatus);
    setUserRole(storedUserRole || "buyer");
  }, []);

  return (
    <>
      <BrowserRouter>
      <Navbar
  isLoggedIn={isLoggedIn}
  userRole={userRole}
  setIsLoggedIn={setIsLoggedIn}  // Pass the state setter function
  setUserRole={setUserRole}  // Pass setUserRole function
/>

        <Routes>
          <Route
            path="/"
            element={
              <LoginSignUp
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginSignUp
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
              />
            }
          />
          <Route
            path="/sellproducts"
            element={
              isLoggedIn && userRole === "seller" ? (
                <SellProducts />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/sellproducts/:id" element={<SellProducts/>}/>
          <Route path="/get_hotSales" element={<HotSales/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/paymentDetails" element={<PaymentDetails />} />
          <Route path="/sellerdashboard" element={<SellerDashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
