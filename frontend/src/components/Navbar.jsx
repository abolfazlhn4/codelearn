import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "صفحه اصلی", href: "/", active: true },
    { name: "دوره های آموزشی", href: "/CoursesArchive", active: false },
    { name: "درباره ما", href: "/Aboutus", active: false },
  ];

  const { cartItems } = useCart();

  return (
    <header
      dir="rtl"
      className="w-full py-6 px-4 sm:px-8 font-yekan relative z-50 bg-[#f8f9fa]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] px-4 md:px-6 py-3 flex items-center justify-between relative">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-[#3b3ab5] transition-colors p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-sm lg:text-base transition-colors hover:text-[#3b3ab5] ${
                    link.active
                      ? "font-medium text-black"
                      : "font-normal text-gray-600"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#3b3ab5] to-[#4caf50] rounded-xl flex items-center justify-center text-white transform rotate-12"></div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative bg-[#e5f0d1] text-gray-800 p-2.5 rounded-xl hover:bg-[#d8e8bc] transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link
              to={isLoggedIn ? "/user-panel" : "/auth"}
              className="bg-[#3b3ab5] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              <span className="hidden sm:block">
                {isLoggedIn ? "پنل کاربری" : "ورود / ثبت نام"}
              </span>
              <User className="w-5 h-5 sm:hidden" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 z-50">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`p-2 rounded-lg text-sm ${
                  link.active
                    ? "bg-gray-50 font-medium text-black"
                    : "font-normal text-gray-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
