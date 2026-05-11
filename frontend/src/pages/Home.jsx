import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import CoursesSection from "../components/CoursesSection";
import { useRef } from "react";

const Home = () => {
  const coursesRef = useRef(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-white overflow-hidden">
      <main>
        <HeroSection onScrollClick={scrollToCourses} />
        <Features />
        <div ref={coursesRef}>
          <CoursesSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
