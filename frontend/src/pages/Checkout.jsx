import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const parsePrice = (priceString) => {
  if (typeof priceString !== "string" || priceString === "رایگان") return 0;
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

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");
  const [phonePart, setPhonePart] = useState("");

  useEffect(() => {
    const storedPhone = localStorage.getItem("user_phone");
    if (storedPhone && storedPhone.startsWith("+98")) {
      setPhonePart(storedPhone.substring(3));
    }
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price),
    0,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است!</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        تکمیل اطلاعات خرید
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">نام</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                شماره تلفن
              </label>
              <div
                className="flex items-center w-full p-2 rounded-lg bg-gray-50 border border-gray-200 text-left opacity-80 cursor-not-allowed"
                dir="ltr"
              >
                <span className="text-gray-500 font-bold text-base pr-3 border-r border-gray-300">
                  +98
                </span>
                <input
                  required
                  type="tel"
                  readOnly
                  value={phonePart}
                  className="w-full bg-transparent outline-none pl-3 text-gray-600 font-medium text-base tracking-wider cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                شماره تلفن بر اساس حساب کاربری شما تکمیل شده است.
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                کد تخفیف (اختیاری)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="bg-gray-100 px-4 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  اعمال
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full md:w-80 bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
          <h3 className="font-bold text-lg mb-4">خلاصه سفارش</h3>
          <div className="flex justify-between text-gray-600 mb-2 text-sm">
            <span>تعداد دوره‌ها:</span>
            <span>{cartItems.length} دوره</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-4 mt-4">
            <span>مبلغ کل:</span>
            <span>
              {totalPrice > 0
                ? `${totalPrice.toLocaleString("fa-IR")} تومان`
                : "رایگان"}
            </span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            ادامه جهت پرداخت
          </button>
        </div>
      </div>
    </div>
  );
}
