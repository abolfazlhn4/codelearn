import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("student");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (token) {
      setIsLoggedIn(true);
      if (role) setUserRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "دوره های آموزشی", href: "/CoursesArchive" },
    { name: "درباره ما", href: "/Aboutus" },
  ];

  const panelLink =
    userRole === "instructor" ? "/instructor-panel" : "/user-panel";

  return (
    <header
      dir="rtl"
      className="w-full py-6 px-4 sm:px-8 font-yekan relative z-50 bg-[#f8f9fa]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] px-4 md:px-6 py-3 flex items-center justify-between relative">
          {/* بخش سمت راست: منو موبایل و لینک‌های دسکتاپ */}
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
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;

                return (
                  <Link
                    key={index}
                    to={link.href}
                    className={`text-sm lg:text-base transition-colors hover:text-[#3b3ab5] ${
                      isActive
                        ? "font-medium text-black"
                        : "font-normal text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* بخش وسط: لوگو */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
            <Link to="/">
              <img
                src="/pictures/logo.png"
                alt="logo"
                className="w-12 h-12 object-contain rounded-xl"
              />
            </Link>
          </div>

          {/* بخش سمت چپ: سبد خرید و دکمه ورود */}
          <div className="flex items-center gap-3">
            {/* کانتینر سبد خرید با هندل کردن هاور */}
            <div
              className="relative group"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
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

              <CartPopup
                isOpen={isCartOpen}
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              />
            </div>

            <Link
              to={isLoggedIn ? panelLink : "/auth"}
              className="bg-[#3b3ab5] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              <span className="hidden sm:block">
                {isLoggedIn ? "پنل کاربری" : "ورود / ثبت نام"}
              </span>
              <User className="w-5 h-5 sm:hidden" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* منوی موبایل */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 z-50">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={index}
                  to={link.href}
                  className={`p-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-gray-50 font-bold text-black"
                      : "font-normal text-gray-600"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
