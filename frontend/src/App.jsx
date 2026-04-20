// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext"; // این خط اضافه شد
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CoursesArchive from "./pages/CoursesArchive";
import Aboutus from "./pages/Aboutus";
import Auth from "./pages/Auth";
import UserPanel from "./pages/UserPanel";
import Cart from "./pages/Cart"; // این خط اضافه شد

function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/CoursesArchive" element={<CoursesArchive />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/panel" element={<UserPanel />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
