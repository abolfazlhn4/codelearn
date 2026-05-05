import React, { useState } from "react";

import api from "../api/api.js";

export default function Auth() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post(`/api/v1/users/auth/phone/register/`, {
        phone_number: phone,
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

    try {
      //اضافه شدن "با کریدنشال" برای دریافت و ذخیره کوکی رفرش توکن
      const res = await api.post(
        `/api/v1/users/auth/phone/verify/`,
        {
          phone_number: phone,
          security_code: otp,
          session_token: sessionToken,
        },
        {
          withCredentials: true, //برای ذخیره کوکی HttpOnly
        },
      );

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("user_phone", phone);

      window.location.href = "/user-panel";
    } catch (err) {
      setError("کد واردشده اشتباه است یا منقضی شده.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          {step === "phone" ? "ورود با شماره موبایل" : "تأیید کد ارسال‌شده"}
        </h2>

        {error && (
          <div className="text-red-600 text-center mb-4 text-sm">{error}</div>
        )}

        <form
          onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp}
          className="space-y-4"
        >
          {step === "phone" ? (
            <input
              type="tel"
              placeholder="شماره موبایل (مثلاً 0912...)"
              className="w-full p-3 rounded-xl bg-gray-100 text-right focus:ring-2 focus:ring-indigo-500 outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          ) : (
            <input
              type="text"
              placeholder="کد یک‌بار مصرف"
              className="w-full p-3 rounded-xl bg-gray-100 text-right focus:ring-2 focus:ring-indigo-500 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all"
          >
            {loading
              ? "در حال پردازش..."
              : step === "phone"
                ? "ارسال کد"
                : "تأیید کد"}
          </button>
        </form>

        {step === "verify" && (
          <button
            className="mt-4 text-sm text-gray-500 hover:underline"
            onClick={() => setStep("phone")}
          >
            بازگشت به مرحله قبل
          </button>
        )}
      </div>
    </div>
  );
}
