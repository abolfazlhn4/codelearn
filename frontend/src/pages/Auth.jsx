import React, { useState, useRef } from "react";
import api from "../api/api.js";

export default function Auth() {
  const [role, setRole] = useState("student");
  const [step, setStep] = useState("phone");
  const [phonePart, setPhonePart] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const otpInputs = useRef([]);

  const handleTabChange = (newRole) => {
    setRole(newRole);
    setStep("phone");
    setPhonePart("");
    setOtp(["", "", "", "", "", ""]);
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
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    } catch (err) {
      setError("خطا در ارسال کد. شماره را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    const newOtp = [...otp];

    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i];
    }

    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    otpInputs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullPhone = `+98${phonePart}`;
    const otpCode = otp.join("");

    try {
      const res = await api.post(
        `/api/v1/users/auth/phone/verify/`,
        {
          phone_number: fullPhone,
          security_code: otpCode,
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
      setOtp(["", "", "", "", "", ""]);
      otpInputs.current[0]?.focus();
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
            <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-800 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (step === "verify" && otp.some((d) => !d))}
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
            onClick={() => {
              setStep("phone");
              setOtp(["", "", "", "", "", ""]);
            }}
          >
            ویرایش شماره موبایل
          </button>
        )}
      </div>
    </div>
  );
}
