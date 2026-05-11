import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CoursesArchive from "./pages/CoursesArchive";
import Aboutus from "./pages/Aboutus";
import ContactUs from "./pages/ContactUs";
import Auth from "./pages/Auth";
import UserPanel from "./pages/UserPanel";
import InstructorPanel from "./pages/InstructorPanel";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentGateway from "./pages/PaymentGateway";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/instructor-panel/*" element={<InstructorPanel />} />
            <Route
              path="/user-panel/*"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <UserPanel />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentGateway />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </FavoritesProvider>
  );
}

export default App;
