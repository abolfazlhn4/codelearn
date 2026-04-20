import React from "react";
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

export default function PaymentGateway() {
  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price),
    0,
  );

  const handlePayment = () => {
    const existingPurchases =
      JSON.parse(localStorage.getItem("purchasedCourses")) || [];

    // استخراج آیدی دوره‌های سبد خرید
    const newPurchasesIds = cartItems.map((item) => item.id);

    // ترکیب و حذف آیدی‌های تکراری (در صورت خرید مجدد یک دوره)
    const allPurchases = [
      ...new Set([...existingPurchases, ...newPurchasesIds]),
    ];

    localStorage.setItem("purchasedCourses", JSON.stringify(allPurchases));

    alert("پرداخت با موفقیت انجام شد! دوره‌ها به پنل کاربری شما اضافه شدند.");
    clearCart();
    navigate("/user-panel");
  };

  const handleCancel = () => {
    alert("پرداخت لغو شد.");
    navigate("/checkout");
  };

  return (
    <div
      className="min-h-[calc(100vh-100px)] bg-gray-200 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-blue-600">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            درگاه پرداخت شبیه‌ساز
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            شاپرک - درگاه پرداخت اینترنتی
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">پذیرنده:</span>
            <span className="font-bold">فروشگاه دوره آموزشی</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">مبلغ قابل پرداخت:</span>
            <span className="font-bold text-blue-600">
              {totalPrice > 0
                ? `${totalPrice.toLocaleString("fa-IR")} تومان`
                : "رایگان"}
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="شماره کارت: ۱۲۳۴-۵۶۷۸-..."
            className="w-full border border-gray-300 rounded-lg p-3 text-center outline-none focus:border-blue-500"
            dir="ltr"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="CVV2"
              className="w-1/2 border border-gray-300 rounded-lg p-3 text-center outline-none focus:border-blue-500"
              dir="ltr"
            />
            <input
              type="text"
              placeholder="تاریخ انقضا (MM/YY)"
              className="w-1/2 border border-gray-300 rounded-lg p-3 text-center outline-none focus:border-blue-500"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePayment}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            پرداخت
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
