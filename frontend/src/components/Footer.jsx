import React from "react";
import {
  PaperAirplaneIcon,
  CameraIcon,
  CodeBracketIcon,
  PlayIcon,
  EnvelopeIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-white font-yekan border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          {/* لوگو */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#3b3ab5] to-[#4caf50] rounded-xl flex items-center justify-center text-white transform rotate-12"></div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-black">
                برنامه نویسی
              </span>
              <span className="text-sm text-gray-500 font-sans tracking-wider">
                barnamenevis.ir
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-[#e5f0d1] text-gray-700 flex items-center justify-center hover:bg-[#d8e8bc] transition-colors"
            >
              <CameraIcon className="w-6 h-6" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-[#3b3ab5] text-white flex items-center justify-center hover:bg-[#302fa0] transition-colors shadow-md"
            >
              <PaperAirplaneIcon className="w-6 h-6 rotate-45" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-[#e5f0d1] text-gray-700 flex items-center justify-center hover:bg-[#d8e8bc] transition-colors"
            >
              <CodeBracketIcon className="w-6 h-6" />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-[#e5f0d1] text-gray-700 flex items-center justify-center hover:bg-[#d8e8bc] transition-colors"
            >
              <PlayIcon className="w-6 h-6" />
            </a>
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ستون اول: درباره ما */}
          <div className="flex flex-col text-right">
            <h3 className="text-lg font-black text-black mb-5">درباره ما</h3>
            <p className="text-gray-500 text-sm leading-loose">
              شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت
              و بدون استرس میتونی از مسیر لذت ببری. ما در دنیای برنامه نویسی،
              توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از
              نتیجه زحمات مون لذت ببریم.
            </p>
          </div>

          {/* ستون دوم: دوره‌های پرطرفدار */}
          <div className="flex flex-col text-right">
            <h3 className="text-lg font-black text-black mb-5">
              دوره های پرطرفدار
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  آموزش زبان پایتون
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  آموزش جاوا اسکریپت
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  آموزش React JS
                </a>
              </li>
            </ul>
          </div>

          {/* ستون سوم: اساتید دوره‌ها */}
          <div className="flex flex-col text-right">
            <h3 className="text-lg font-black text-black mb-5">
              اساتید دوره ها
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  ابوالفضل هادی نژاد
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  مسیح مصطفایی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  امیر حسین حمیدی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 text-sm hover:text-[#3b3ab5] transition-colors"
                >
                  حسین مفیدی
                </a>
              </li>
            </ul>
          </div>

          {/* ستون چهارم: ارتباط با ما */}
          <div className="flex flex-col text-right">
            <h3 className="text-lg font-black text-black mb-5">ارتباط با ما</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 text-gray-500 hover:text-[#3b3ab5] transition-colors cursor-pointer">
                <EnvelopeIcon className="w-5 h-5" />
                <span className="text-sm font-sans">admin@barnamenevis.ir</span>
              </li>

              <li className="flex items-center gap-3 text-gray-500 hover:text-[#3b3ab5] transition-colors cursor-pointer">
                <AtSymbolIcon className="w-5 h-5" />
                <span className="text-sm font-sans">@abolfazl.hadinjad</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
