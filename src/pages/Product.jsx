import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData.js";
import { User, Users, CreditCard, ArrowRight, BookOpen } from "lucide-react";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((item) => item.id === parseInt(id));
  if (!course) {
    return (
      <div dir="rtl" className="pt-32 pb-20 text-center font-yekan min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-black text-gray-800 mb-4">دوره‌ای با این شناسه یافت نشد! </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#3b3ab5] text-white px-6 py-2 rounded-xl hover:bg-opacity-90 transition-colors shadow-md"
        >
          بازگشت به صفحه قبل
        </button>
      </div>
    );
  }
  return (
    <div dir="rtl" className="pt-32 pb-20 font-yekan min-h-screen bg-[#f8f9fa] px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">

        {/* دکمه بازگشت */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#3b3ab5] transition-colors mb-8 font-medium"
        >
          <ArrowRight className="w-5 h-5" />
          <span>بازگشت به لیست دوره‌ها</span>
        </button>

        {/* کارت اصلی جزئیات محصول */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 p-6 md:p-10">

          {/* هدر کارت (دسته بندی و عنوان) */}
          <div className="mb-8">
            <span className="bg-[#e5f0d1] text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-4">
              {course.categoryId === 'frontend' ? 'فرانت اند' :
               course.categoryId === 'backend' ? 'بک اند' :
               course.categoryId === 'android' ? 'اندروید' : 'دسکتاپ'}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-black leading-tight">
              {course.title}
            </h1>
          </div>

          {/* توضیحات دوره */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#3b3ab5]" />
              درباره این دوره
            </h3>
            <p className="text-gray-600 leading-loose text-sm md:text-base text-justify">
              {course.description}
              این دوره با هدف آماده‌سازی شما برای ورود به بازار کار طراحی شده است. تمام مباحث از پایه تا پیشرفته با پروژه‌های عملی بررسی می‌شوند.
            </p>
          </div>
          {/* باکس اطلاعات کلیدی (مدرس، تعداد دانشجو، قیمت) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
            {/* مدرس */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#e5f0d1] text-[#3b3ab5] flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">مدرس دوره</span>
                <span className="font-bold text-gray-800">{course.teacher}</span>
              </div>
            </div>
            {/* دانشجویان */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#e5f0d1] text-[#3b3ab5] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">تعداد دانشجو</span>
                <span className="font-bold text-gray-800">{course.studentsCount} نفر</span>
              </div>
            </div>
            {/* قیمت */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#e5f0d1] text-[#3b3ab5] flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">مبلغ سرمایه‌گذاری</span>
                <span className={`font-bold ${course.price === 'رایگان' ? 'text-[#4caf50]' : 'text-black'}`}>
                  {course.price}
                </span>
              </div>
            </div>
          </div>
          {/* دکمه ثبت نام */}
          <div className="mt-10 flex justify-end">
            <button className="bg-[#3b3ab5] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-opacity-90 hover:-translate-y-1 transition-all shadow-lg flex items-center gap-2">
              ثبت نام در این دوره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
