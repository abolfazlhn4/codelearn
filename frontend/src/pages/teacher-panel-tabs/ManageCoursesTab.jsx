import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Edit, AlertCircle, Trash2 } from "lucide-react";
import api from "../../api/api";

const ManageCoursesTab = () => {
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const verifyRes = await api.get("/api/v1/users/me/profile/verify/");
        let status = null;
        if (verifyRes.data?.results?.length > 0) {
          const latestVerify = Array.isArray(verifyRes.data.results[0])
            ? verifyRes.data.results[0][0] //اگه بک اند به صورت تو در تو اطلاعاتو بفرسته
            : verifyRes.data.results[0];
          status = latestVerify.status;
          setVerifyStatus(status);
        }

        if (status === "A") {
          const coursesRes = await api.get("/api/v1/courses/me/");
          setCourses(coursesRes.data.results || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    if (
      window.confirm(
        "آیا از حذف این دوره اطمینان دارید؟ این عمل غیرقابل بازگشت است.",
      )
    ) {
      try {
        await api.delete(`/api/v1/courses/me/${courseId}/`);
        alert("دوره با موفقیت حذف شد.");
        setCourses(courses.filter((course) => course.id !== courseId));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("خطا در حذف دوره.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
        در حال بررسی وضعیت کاربری و دریافت دوره‌ها...
      </div>
    );
  }

  if (verifyStatus !== "A") {
    return (
      <div className="bg-indigo-50/40 border border-indigo-100 p-10 rounded-4xl flex flex-col items-center justify-center text-center my-6 mx-auto max-w-2xl shadow-sm">
        <AlertCircle
          className="w-16 h-16 text-indigo-600 mb-4"
          strokeWidth={1.8}
        />
        <div>
          <h3 className="text-xl font-bold text-indigo-950 mb-3">
            نیاز به تکمیل و تایید اطلاعات کاربری
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            برای ایجاد و مدیریت دوره‌های آموزشی، ابتدا باید اطلاعات پروفایل و
            مدارک هویتی خود را در بخش{" "}
            <strong className="font-bold text-indigo-600">ویرایش حساب</strong>{" "}
            تکمیل کرده و منتظر تایید ادمین بمانید.
          </p>
        </div>
        <Link
          to="/instructor-panel/profile"
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-md shadow-indigo-100"
        >
          رفتن به صفحه ویرایش حساب
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "DR":
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
            پیش‌نویس
          </span>
        );
      case "PE":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium">
            در انتظار تایید
          </span>
        );
      case "PU":
      case "AP":
        return (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
            تایید شده
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
            {status}
          </span>
        );
    }
  };

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

      {courses.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-2xl border border-gray-100">
          شما هنوز هیچ دوره‌ای ایجاد نکرده‌اید.
        </div>
      ) : (
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
                <span>
                  قیمت:{" "}
                  {course.is_free
                    ? "رایگان"
                    : `${course.real_price?.toLocaleString()} تومان`}
                </span>
                {getStatusBadge(course.status)}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  to={`/instructor-panel/edit-course/${course.id}`}
                  className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg text-sm flex-1 justify-center hover:bg-indigo-100 transition-colors"
                >
                  <Edit className="w-4 h-4" /> ویرایش
                </Link>

                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm flex-1 justify-center hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCoursesTab;
