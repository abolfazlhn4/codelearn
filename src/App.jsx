import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}

export default App;
