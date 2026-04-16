import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 font-yekan"
      dir="rtl"
    >
      {/* ۱. بخش متون اصلی (سمت راست) */}
      <div className="flex-1 text-right order-1">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-10">
          آکادمی آموزش <br />
          <span className="text-indigo-700">برنامه نویسی</span> پیشرفته
        </h1>

        <div className="flex flex-row items-center gap-8">
          <button className="bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex flex-row-reverse items-center gap-3 hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            شروع یادگیری برنامه نویسی
          </button>

          <a
            href="#"
            className="text-indigo-900 font-extrabold hover:text-indigo-700 transition-colors"
          >
            ارتباط با ما
          </a>
        </div>
      </div>

      {/* ۲. بخش تصویر وسط */}
      <div className="relative order-2 mx-auto lg:mx-0">
        {/* حاشیه بنفش پشت عکس - کج شده به سمت راست */}
        <div className="absolute -inset-4 border-4 border-indigo-700 rounded-[3.5rem] -z-10 transform translate-x-3 translate-y-2"></div>

        {/* کانتینر اصلی تصویر با پس‌زمینه سبز روشن مثل تصویر */}
        <div className="w-[300px] h-[350px] md:w-[420px] md:h-[480px] bg-[#d9f99d] rounded-[3.5rem] overflow-hidden">
          <img src="" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ۳. بخش آمار (سمت چپ) */}
      <div className="flex flex-col gap-12 order-3 min-w-[150px]">
        <div className="text-right">
          <h3 className="text-4xl font-black text-gray-900 leading-none">
            +۱۸
          </h3>
          <p className="text-gray-500 text-sm font-bold mt-2">متخصص مجرب</p>
        </div>
        <div className="text-right">
          <h3 className="text-4xl font-black text-gray-900 leading-none">
            +۲۴
          </h3>
          <p className="text-gray-500 text-sm font-bold mt-2">
            دوره آموزشی موفق
          </p>
        </div>
        <div className="text-right">
          <h3 className="text-4xl font-black text-gray-900 leading-none">
            +۱۵۰
          </h3>
          <p className="text-gray-500 text-sm font-bold mt-2">هنرجوی موفق</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
