import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet } from "lucide-react";

const WalletTab = () => {
  const [view, setView] = useState("status");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!amount || parseInt(amount.replace(/,/g, "")) < 100000) {
      alert("حداقل مبلغ ۱۰,۰۰۰ تومان می‌باشد.");
      return;
    }
    navigate("/payment", {
      state: { type: "wallet", amount: parseInt(amount.replace(/,/g, "")) },
    });
  };

  if (view === "charge") {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <button
            onClick={() => setView("status")}
            className="text-gray-500 hover:text-gray-800"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            افزایش موجودی کیف پول من
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              مبلغ (تومان)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                setAmount(raw ? parseInt(raw).toLocaleString("en-US") : "");
              }}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 text-left font-bold text-lg"
              dir="ltr"
              placeholder="0"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-gray-500 ml-2">مبالغ پیشنهادی:</span>
            {["100000", "200000", "500000", "1000000"].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(parseInt(val).toLocaleString("en-US"))}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  amount.replace(/,/g, "") === val
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {parseInt(val).toLocaleString("fa-IR")} تومان
              </button>
            ))}
          </div>

          <div className="bg-blue-50 text-blue-800 text-xs p-4 rounded-xl leading-relaxed">
            توجه: حداقل مبلغ افزایش اعتبار ۱۰,۰۰۰ تومان می‌باشد. همچنین امکان
            استفاده از موجودی فعلی و کوپن تخفیف برای افزایش اعتبار وجود ندارد.
          </div>

          <button
            onClick={handlePayment}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-12 rounded-xl transition-colors w-full md:w-auto"
          >
            پرداخت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border border-gray-100 px-4 text-center">
      <div className="relative mb-6">
        <Wallet
          className="w-24 h-24 text-[#3b3ab5] opacity-20"
          strokeWidth={1}
        />
        <Wallet className="w-16 h-16 text-[#3b3ab5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-gray-500 mb-2 font-medium">موجودی کیف پول شما</p>
      <h3 className="text-2xl font-bold text-gray-800 mb-8">۰ تومان</h3>
      <button
        onClick={() => setView("charge")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-500/30"
      >
        افزایش موجودی
      </button>
    </div>
  );
};

export default WalletTab;
