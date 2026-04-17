import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        <Features />
      </main>
    </div>
  );
};

export default Home;
