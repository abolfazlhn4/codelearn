import React, { useState } from "react";
import api from "../api/api.js";

export default function Auth() {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState("phone");
  const [phonePart, setPhonePart] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabChange = (newRole) => {
    setRole(newRole);
    setStep("phone");
    setPhonePart("");
    setOtp("");
    setError(null);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);

    const phoneRegex = /^9\d{9}$/;
    if (!phoneRegex.test(phonePart)) {
      setError("شماره باید با 9 شروع شود و 10 رقم باشد (مثال: 9123456789)");
      return;
    }

    const fullPhone = `+98${phonePart}`;
    setLoading(true);

    try {
      const res = await api.post(`/api/v1/users/auth/phone/register/`, {
        phone_number: fullPhone,
      });
      setSessionToken(res.data.session_token);
      setStep("verify");
    } catch (err) {
      setError("خطا در ارسال کد. شماره را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullPhone = `+98${phonePart}`;

    try {
      const res = await api.post(
        `/api/v1/users/auth/phone/verify/`,
        {
          phone_number: fullPhone,
          security_code: otp,
          session_token: sessionToken,
          role: role,
        },
        { withCredentials: true },
      );

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user_phone", fullPhone);
      localStorage.setItem("user_role", role);

      if (role === "instructor") {
        window.location.href = "/instructor-panel";
      } else {
        window.location.href = "/user-panel";
      }
    } catch (err) {
      setError("کد واردشده اشتباه است یا منقضی شده.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20 mb-16 bg-transparent" dir="rtl">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 sm:p-8 w-full max-w-md mx-4 transition-all">
        {/* تب‌های انتخاب نقش */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl mb-8 border border-gray-100">
          <button
            onClick={() => handleTabChange("student")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === "student"
                ? "bg-white text-indigo-600 shadow-sm border border-gray-100"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            دانشجو
          </button>
          <button
            onClick={() => handleTabChange("instructor")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              role === "instructor"
                ? "bg-white text-indigo-600 shadow-sm border border-gray-100"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            استاد
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            {step === "phone" ? "خوش آمدید" : "تأیید شماره موبایل"}
          </h2>
          <p className="text-sm text-gray-500">
            {step === "phone"
              ? `برای ورود یا ثبت‌نام به عنوان ${role === "student" ? "دانشجو" : "استاد"}، شماره خود را وارد کنید.`
              : `کد پیامک شده به شماره +98${phonePart} را وارد کنید.`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium border border-red-100 flex items-center justify-center">
            {error}
          </div>
        )}

        <form
          onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp}
          className="space-y-5"
        >
          {step === "phone" ? (
            <div
              className="flex items-center w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all text-left"
              dir="ltr"
            >
              <span className="text-gray-600 font-bold text-lg pr-3 border-r border-gray-300">
                +98
              </span>
              <input
                type="tel"
                className="w-full bg-transparent outline-none pl-3 text-gray-800 font-medium text-lg tracking-wider placeholder-gray-400"
                value={phonePart}
                onChange={(e) =>
                  setPhonePart(e.target.value.replace(/\D/g, ""))
                }
                placeholder="9123456789"
                maxLength={10}
                required
              />
            </div>
          ) : (
            <input
              type="text"
              dir="ltr"
              placeholder="000000"
              className="w-full p-4 rounded-2xl bg-gray-50 text-gray-800 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-center font-bold text-2xl tracking-[0.5em]"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all duration-300"
          >
            {loading
              ? "چند لحظه صبر کنید..."
              : step === "phone"
                ? "دریافت کد تایید"
                : "تأیید و ورود"}
          </button>
        </form>

        {step === "verify" && (
          <button
            className="mt-6 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors w-full text-center"
            onClick={() => setStep("phone")}
          >
            ویرایش شماره موبایل
          </button>
        )}
      </div>
    </div>
  );
}
