import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Edit, Globe, Lock } from "lucide-react";

const ManageCoursesTab = () => {
  // دیتای تستی دوره‌های آپلود شده قبلی
  const courses = [
    {
      id: 1,
      title: "دوره جامع React",
      status: "approved",
      isPublic: true,
      price: "۱,۵۰۰,۰۰۰",
    },
    {
      id: 2,
      title: "مقدمات Node.js",
      status: "pending",
      isPublic: false,
      price: "۸۰۰,۰۰۰",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت دوره‌ها</h2>
        <Link
          to="/instructor-panel/add-course"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          افزودن دوره جدید
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              {course.title}
            </h3>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>قیمت: {course.price} تومان</span>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${course.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {course.status === "approved"
                  ? "تایید شده"
                  : "در انتظار تایید ادمین"}
              </span>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg text-sm flex-1 justify-center hover:bg-indigo-100 transition-colors">
                <Edit className="w-4 h-4" /> ویرایش
              </button>

              {/* دکمه تغییر وضعیت پابلیک/پرایوت (فقط در صورت تایید ادمین) */}
              <button
                disabled={course.status !== "approved"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm flex-1 justify-center transition-colors ${
                  course.status === "approved"
                    ? course.isPublic
                      ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
                }`}
              >
                {course.isPublic ? (
                  <Globe className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                {course.isPublic ? "عمومی" : "خصوصی"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoursesTab;
