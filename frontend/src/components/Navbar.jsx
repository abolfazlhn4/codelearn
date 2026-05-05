import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const parsePrice = (priceString) => {
  if (typeof priceString !== "string" || priceString.toLowerCase() === "رایگان")
    return 0;
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let normalized = priceString.replace(/[۰-۹]/g, (w) =>
    persianDigits.indexOf(w),
  );
  normalized = normalized
    .replace(/,/g, "")
    .replace("تومان", "")
    .replace("هزار", "000")
    .replace(/\s/g, "");
  return parseInt(normalized, 10) || 0;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
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

  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price),
    0,
  );

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
            {/* بخش آیکون سبد خرید با قابلیت هاور */}
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

              {/* منوی شناور سبد خرید */}
              <div
                className={`absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all duration-300 origin-top-left ${
                  isCartOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }`}
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                  <span className="font-bold text-gray-800 text-sm">
                    سبد خرید ({cartItems.length} دوره)
                  </span>
                  <Link
                    to="/cart"
                    className="text-xs text-[#3b3ab5] hover:underline"
                  >
                    مشاهده سبد
                  </Link>
                </div>

                {cartItems.length > 0 ? (
                  <>
                    <div className="max-h-60 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">
                              {item.title}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs font-medium text-[#4caf50]">
                                {item.price}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFromCart(item.id);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">مبلغ کل:</span>
                        <span className="text-sm font-bold text-gray-900">
                          {totalPrice > 0
                            ? `${totalPrice.toLocaleString("fa-IR")} تومان`
                            : "رایگان"}
                        </span>
                      </div>
                      <Link
                        to="/checkout"
                        className="block w-full text-center bg-[#3b3ab5] text-white py-2 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-colors"
                      >
                        تسویه حساب
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center text-gray-500 text-sm">
                    سبد خرید شما خالی است
                  </div>
                )}
              </div>
            </div>

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
