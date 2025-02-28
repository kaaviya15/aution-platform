import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginSignUp from "./components/LoginSignUp";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SellProducts from "./components/SellProducts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import PaymentDetails from "./components/PaymentDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return localStorage.getItem("isLoggedIn") === "true"
});
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "Buyer";
  });

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<LoginSignUp setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/login" element={<LoginSignUp setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/sellproducts" element={isLoggedIn && userRole === "Seller" ? <SellProducts /> : <Navigate to="/home" />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/paymentDetails" element={<PaymentDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
