import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CoursesArchive from "./pages/CoursesArchive";
import Aboutus from "./pages/Aboutus";
import Auth from "./pages/Auth";
import UserPanel from "./pages/UserPanel";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/CoursesArchive" element={<CoursesArchive />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/panel" element={<UserPanel />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
