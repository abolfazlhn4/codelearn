import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

// یک تابع کمکی برای تبدیل قیمت متنی به عدد
const parsePrice = (priceString) => {
  if (
    typeof priceString !== "string" ||
    priceString.toLowerCase() === "رایگان"
  ) {
    return 0;
  }
  // حذف "تومان" و "هزار" و تبدیل کاراکترهای فارسی به انگلیسی
  const normalized = priceString
    .replace(/,/g, "")
    .replace("تومان", "")
    .replace("هزار", "000")
    .trim();
  return parseInt(normalized, 10) || 0;
};

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price),
    0,
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-yekan">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-800">سبد خرید شما</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#3b3ab5] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>بازگشت</span>
          </button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* لیست آیتم ها */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.teacher}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-medium text-gray-700">
                      {item.price}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* خلاصه سفارش */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">
                  خلاصه سفارش
                </h2>
                <div className="flex justify-between items-center mb-4 text-gray-600">
                  <span>جمع کل:</span>
                  <span className="font-bold text-lg text-black">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  هزینه‌های ارسال در مرحله بعد محاسبه خواهد شد.
                </p>
                <button className="w-full bg-[#4b9b65] text-white py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm font-medium">
                  ادامه فرآیند خرید
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <ShoppingBag
              className="mx-auto text-gray-300 mb-4"
              size={64}
              strokeWidth={1}
            />
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              سبد خرید شما خالی است
            </h2>
            <p className="text-gray-500 mb-6">
              به نظر می‌رسد هنوز هیچ دوره‌ای به سبد خرید خود اضافه نکرده‌اید.
            </p>
            <Link
              to="/CoursesArchive"
              className="bg-[#3b3ab5] text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors"
            >
              مشاهده دوره‌ها
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
