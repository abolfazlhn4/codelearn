import React from "react";
import { BookOpen, DollarSign, MessagesSquare } from "lucide-react";

const DashboardTab = () => (
  <div className="space-y-6">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
      داشبورد مدرس
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-indigo-600 mb-1 font-medium">
            دوره‌های من
          </p>
          <p className="text-3xl font-black text-indigo-800">۵</p>
        </div>
        <BookOpen className="w-12 h-12 text-indigo-200" />
      </div>
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-600 mb-1 font-medium">کل درآمد</p>
          <p className="text-3xl font-black text-emerald-800">۱۲.۵M</p>
        </div>
        <DollarSign className="w-12 h-12 text-emerald-200" />
      </div>
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-amber-600 mb-1 font-medium">
            تیکت‌های پاسخ‌نداده
          </p>
          <p className="text-3xl font-black text-amber-800">۳</p>
        </div>
        <MessagesSquare className="w-12 h-12 text-amber-200" />
      </div>
    </div>
  </div>
);

export default DashboardTab;
