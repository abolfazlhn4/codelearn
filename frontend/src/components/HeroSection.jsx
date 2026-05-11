import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Counter = ({ target, prefix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      setCount(Math.floor(easeOut * target));

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [target, duration]);

  const toPersianNumeral = (num) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  return (
    <span>
      {prefix}
      {toPersianNumeral(count)}
    </span>
  );
};

const HeroSection = ({ onScrollClick }) => {
  const stats = [
    { id: 1, target: 18, prefix: "+", label: "متخصص مجرب" },
    { id: 2, target: 24, prefix: "+", label: "دوره آموزشی موفق" },
    { id: 3, target: 150, prefix: "+", label: "هنرجوی موفق" },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#f8f9fa] flex items-center justify-center font-yekan xl:pt-36 lg:pt-36 sm:pt-12 pt-12 pb-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        <div className="flex-1 text-center lg:text-right space-y-10">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-black text-black leading-[1.3]">
            آکادمی آموزش <br />
            برنامه نویسی پیشرفته
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onScrollClick}
              className="bg-[#3b3ab5] text-white px-8 py-3.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all font-medium text-sm sm:text-base shadow-lg shadow-indigo-200"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              شروع یادگیری برنامه نویسی
            </button>
            <Link
              to="/contact-us"
              className="text-[#3b3ab5] px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all font-medium text-sm sm:text-base flex items-center justify-center"
            >
              ارتباط با ما
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center w-[85%] sm:w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] relative z-10 mt-20 lg:mt-0 mx-auto">
          <div className="absolute -top-6 -left-6 w-full h-full bg-[#3b3ab5] rounded-[3rem] -z-10"></div>
          <div className="bg-[#e5f0d1] w-full aspect-square rounded-[3rem] flex items-end justify-center relative shadow-sm">
            <img
              src="/pictures/handsome_adult_blond_man_smiling_cheerfully_feeling_happy.png"
              alt="مدرس برنامه‌نویسی"
              className="absolute bottom-0 object-contain w-[95%] sm:w-[105%] h-auto drop-shadow-2xl z-20"
            />
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-10 justify-center flex-wrap lg:w-48 mt-12 lg:mt-0">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center flex flex-col items-center gap-2"
            >
              <p
                className="text-3xl lg:text-4xl font-black text-black tracking-wide flex items-center justify-center"
                dir="ltr"
              >
                <Counter target={stat.target} prefix={stat.prefix} />
              </p>
              <p className="font-normal text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
