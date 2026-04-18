import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { coursesData } from "../data/coursesData.js";
import {
  Play,
  ShoppingBag,
  Heart,
  Clock,
  LayoutGrid,
  CloudDownload,
  ListChecks,
  Users,
  ArrowLeft
} from "lucide-react";

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
    <div dir="rtl" className="pt-28 pb-20 font-yekan min-h-screen bg-[#f8f9fa] px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4">
          <span>صفحه اصلی</span>
          <span className="mx-2">/</span>
          <span>دوره ها</span>
          <span className="mx-2">/</span>
          <span>دسته بندی بک اند</span>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">

          {/* ستون سمت راست: ویدیو و توضیحات */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-[#3b3ab5] rounded-3xl aspect-[16/9] flex justify-center items-center relative overflow-hidden shadow-sm">
              <button className="bg-transparent rounded-full p-2 group transition-transform hover:scale-110">
                <Play className="text-white w-20 h-20 opacity-90 group-hover:opacity-100" strokeWidth={1.2} />
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h1 className="text-3xl font-black text-gray-800 mb-6">{course.title}</h1>

              <p className="text-gray-600 leading-8 text-justify mb-8">
                {course.description || "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است..."}
              </p>

              <h2 className="text-2xl font-black text-gray-800 mb-4 mt-8">توضیحات دوره</h2>
              <p className="text-gray-600 leading-8 text-justify">
                {course.longDescription || "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد..."}
              </p>
            </div>
          </div>

          {/* ستون سمت چپ */}
          <div className="lg:col-span-1">

            {/* این دایو داخلی رو sticky کردیم تا داخل ستون بالا و پایین بره */}
            <div className="sticky top-28 space-y-6">
              {/* دکمه بازگشت */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#3b3ab5] transition-colors font-medium text-sm bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>بازگشت به لیست دوره‌ها</span>
              </button>
              {/* باکس قیمت */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <span className="text-gray-600 text-sm font-medium">قیمت دوره :</span>
                  <span className={`text-xl font-bold ${course.price === 'رایگان' ? 'text-green-500' : 'text-[#4b9b65]'}`}>
                    {course.price}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-3.5 border border-red-200 rounded-xl hover:bg-red-50 transition-colors group">
                    <Heart className="w-6 h-6 text-red-400 group-hover:text-red-500" strokeWidth={1.5} />
                  </button>

                  <button className="flex-1 bg-[#4b9b65] hover:bg-green-700 text-white font-medium py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2 text-sm">
                    <ShoppingBag className="w-5 h-5" />
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>

              {/* باکس ویژگی‌ها */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="space-y-4">

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Clock className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <span>مدت زمان دوره :</span>
                    </div>
                    <span className="text-gray-500">{course.duration || "۲۲ ساعت"}</span>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <LayoutGrid className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <span>تعداد جلسات دوره :</span>
                    </div>
                    <span className="text-gray-500">{course.sessionsCount || "۹۱ جلسه"}</span>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <CloudDownload className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <span>نحوه دیدن دوره :</span>
                    </div>
                    <span className="text-gray-500">{course.viewType || "به صورت دانلودی"}</span>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <ListChecks className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <span>پیش نیاز دوره :</span>
                    </div>
                    <span className="text-gray-500">{course.prerequisites || "پیش نیازی ندارد"}</span>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Users className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <span>تعداد دانشجویان دوره :</span>
                    </div>
                    <span className="text-gray-500">{course.studentsCount || "۱۴۹ نفر"}</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
