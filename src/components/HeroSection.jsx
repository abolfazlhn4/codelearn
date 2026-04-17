import React from "react";
import { ChevronLeft } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { id: 1, number: "+۱۸", label: "متخصص مجرب" },
    { id: 2, number: "+۲۴", label: "دوره آموزشی موفق" },
    { id: 3, number: "+۱۵۰", label: "هنرجوی موفق" },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#f8f9fa] flex items-center justify-center font-yekan pt-12 pb-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        {/* سمت راست: محتوای متنی */}
        <div className="flex-1 text-center lg:text-right space-y-10">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-black text-black leading-[1.3]">
            آکادمی آموزش <br />
            برنامه نویسی پیشرفته
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="bg-[#3b3ab5] text-white px-8 py-3.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all font-medium text-sm sm:text-base shadow-lg shadow-indigo-200">
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              شروع یادگیری برنامه نویسی
            </button>
            <button className="text-[#3b3ab5] px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all font-medium text-sm sm:text-base">
              ارتباط با ما
            </button>
          </div>
        </div>

        {/* بخش وسط: تصویر و پس‌زمینه‌های هندسی */}
        <div className="flex-1 flex justify-center w-full max-w-md relative z-10">
          {/* شکل آبی پس‌زمینه (جابجا شده به بالا و چپ) */}
          <div className="absolute -top-6 -left-6 w-full h-full bg-[#3b3ab5] rounded-[3rem] -z-10"></div>

          {/* کانتینر سبز و تصویر شخص */}
          <div className="bg-[#e5f0d1] w-full aspect-square rounded-[3rem] overflow-hidden flex items-end justify-center relative shadow-sm">
            {/* 
              توجه: اینجا آدرس تصویر خودتون رو جایگزین کنید.
              کلاس‌های زیر برای نمایش بهتر عکس بدون پس‌زمینه در کانتینر تنظیم شده‌اند.
            */}
            <img
              src="/path-to-your-person-image.png"
              alt="مدرس برنامه‌نویسی"
              className="object-cover w-[85%] h-auto drop-shadow-2xl translate-y-4"
            />
          </div>
        </div>

        {/* سمت چپ: آمار و ارقام */}
        <div className="flex flex-row lg:flex-col gap-10 justify-center flex-wrap lg:w-48">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center flex flex-col items-center gap-2"
            >
              {/* اعداد با وزن بسیار ضخیم */}
              <p className="text-3xl lg:text-4xl font-black text-black tracking-wide">
                {stat.number}
              </p>
              {/* متن توضیحات با وزن عادی */}
              <p className="font-normal text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
