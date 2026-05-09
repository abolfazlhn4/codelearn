import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
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

const CartPopup = ({ isOpen, onMouseEnter, onMouseLeave }) => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price),
    0,
  );

  return (
    <div
      className={`absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all duration-300 origin-top-left ${
        isOpen
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-95 invisible"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
        <span className="font-bold text-gray-800 text-sm">
          سبد خرید ({cartItems.length} دوره)
        </span>
        <Link to="/cart" className="text-xs text-[#3b3ab5] hover:underline">
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
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image || "/pictures/course-placeholder.png"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
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
  );
};

export default CartPopup;
