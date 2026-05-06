import React from "react";
import { CheckCircle2, ChevronLeft, PlayCircle } from "lucide-react";

const OrdersTab = ({ purchasedCourses }) => (
  <div>
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
      سفارش‌های من
    </h2>
    {purchasedCourses.length > 0 ? (
      <div className="space-y-4">
        {purchasedCourses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                پرداخت شده
              </div>
              <button className="text-blue-500 text-sm flex items-center gap-1 hover:text-blue-700">
                جزئیات <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 text-sm">
                <div>
                  <p className="text-gray-500 mb-1 text-xs">شماره سفارش:</p>
                  <p className="font-medium text-gray-800" dir="ltr">
                    1278{index}9199
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">تاریخ:</p>
                  <p className="font-medium text-gray-800">۱۶ اردیبهشت ۱۴۰۵</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">تخفیف:</p>
                  <p className="font-medium text-gray-800">۰ تومان</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-xs">مبلغ پرداختی:</p>
                  <p className="font-medium text-gray-800">{course.price}</p>
                </div>
              </div>

              <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 hidden md:flex">
                <PlayCircle className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
        سفارشی یافت نشد.
      </div>
    )}
  </div>
);

export default OrdersTab;
