import React from "react";
import { PlayCircle, Heart, MessagesSquare } from "lucide-react";

const DashboardTab = ({ purchasedCourses, favoriteCourses }) => (
  <div className="space-y-6">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
      داشبورد کاربری
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-600 mb-1 font-medium">آموزش‌های من</p>
          <p className="text-3xl font-black text-blue-800">
            {purchasedCourses.length}
          </p>
        </div>
        <PlayCircle className="w-12 h-12 text-blue-200" />
      </div>
      <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-pink-600 mb-1 font-medium">
            علاقه‌مندی‌ها
          </p>
          <p className="text-3xl font-black text-pink-800">
            {favoriteCourses.length}
          </p>
        </div>
        <Heart className="w-12 h-12 text-pink-200" />
      </div>
      <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-green-600 mb-1 font-medium">
            تیکت‌های فعال
          </p>
          <p className="text-3xl font-black text-green-800">۰</p>
        </div>
        <MessagesSquare className="w-12 h-12 text-green-200" />
      </div>
    </div>
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mt-6">
      <p className="text-gray-600">
        به پنل کاربری خود خوش آمدید. از منوی سمت راست می‌توانید بخش‌های مختلف
        حساب خود را مدیریت کنید.
      </p>
    </div>
  </div>
);

export default DashboardTab;
