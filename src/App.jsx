import React, { useState } from "react";
import "./css/App.css";
import NavBar from "./components/NavBar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import CartSidebar from "./components/CartSidebar";
import ContactUs from "./pages/ContactUs"; // Import the new ContactUs page
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <MovieProvider>
      <div>
        <NavBar openCart={openCart} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/products" element={<Product />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/product/:id"
              element={<ProductDetail openCart={openCart} />}
            />
          </Routes>
        </main>
        <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </MovieProvider>
  );
}

export default App;
