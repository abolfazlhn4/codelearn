import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import CoursesSection from "../components/CoursesSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white overflow-hidden">
      <main>
        <HeroSection />
        <Features />
        <CoursesSection />
      </main>
    </div>
  );
};

export default Home;
