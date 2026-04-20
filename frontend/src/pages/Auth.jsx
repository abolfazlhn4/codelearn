import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [action, setAction] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // شبیه سازی لاگین/ثبت نام با ذخیره در لوکال استوریج
    const userData = { isLoggedIn: true, username: "کاربر مهمان" };
    localStorage.setItem("user", JSON.stringify(userData));

    // انتقال به پنل کاربری و رفرش برای آپدیت شدن نوبار
    window.location.href = "/user-panel";
  };

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-gray-50 min-h-[calc(100vh-200px)]">
      <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-green-400 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {"</>"}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {action === "login" ? "ورود به اکانت" : "ساخت حساب"}
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          {action === "login" ? "خوش برگشتی :)" : "عضو خانواده ما شو :)"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="نام کاربری (انگلیسی)"
            className="w-full bg-gray-100/80 text-gray-800 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3D31B4] transition-all text-right text-sm placeholder-gray-400"
            dir="rtl"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="رمز عبور"
              className="w-full bg-gray-100/80 text-gray-800 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3D31B4] transition-all text-right text-sm placeholder-gray-400 pl-10"
              dir="rtl"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {action === "register" && (
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="تکرار رمز عبور"
              className="w-full bg-gray-100/80 text-gray-800 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3D31B4] transition-all text-right text-sm placeholder-gray-400"
              dir="rtl"
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#3D31B4] hover:bg-[#32279c] text-white font-medium py-3 rounded-xl transition-colors mt-2 text-sm shadow-md shadow-indigo-200"
          >
            {action === "login" ? "ورود" : "ثبت نام"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400 font-medium flex justify-center items-center gap-1">
          <span>{action === "login" ? "حساب ندارید؟" : "حساب دارید؟"}</span>
          <button
            onClick={() => setAction(action === "login" ? "register" : "login")}
            className="text-gray-500 hover:text-gray-800 transition-colors border-b border-gray-300 hover:border-gray-800 pb-0.5"
          >
            کلیک کنید
          </button>
        </div>
      </div>
    </div>
  );
}
