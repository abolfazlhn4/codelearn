import React from "react";

const RevenueTab = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        گزارش درآمد
      </h2>

      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-8">
        <h3 className="text-emerald-800 font-bold mb-2">
          کل درآمد شما تا این لحظه
        </h3>
        <p className="text-4xl font-black text-emerald-600">
          ۱۲,۵۰۰,۰۰۰ <span className="text-lg font-normal">تومان</span>
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">
            درآمد به تفکیک دوره‌ها
          </h3>
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex justify-between p-4 border-b border-gray-200 bg-white">
              <span className="font-medium">آموزش جامع ری‌اکت</span>
              <span className="font-bold text-emerald-600">
                ۸,۰۰۰,۰۰۰ تومان
              </span>
            </div>
            <div className="flex justify-between p-4 border-b border-gray-200 bg-white">
              <span className="font-medium">طراحی رابط کاربری پیشرفته</span>
              <span className="font-bold text-emerald-600">
                ۴,۵۰۰,۰۰۰ تومان
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4">
            درآمد ماهانه (دوره ری‌اکت)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
              <p className="text-gray-500 text-sm mb-1">فروردین</p>
              <p className="font-bold text-gray-800">۲,۰۰۰,۰۰۰ تومان</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
              <p className="text-gray-500 text-sm mb-1">اردیبهشت</p>
              <p className="font-bold text-gray-800">۳,۵۰۰,۰۰۰ تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTab;
