import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4">
      {/* اضافه کردن کلاس font-yekan به کانتینر اصلی */}
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between border border-gray-100 font-yekan">
        {/* منوها: وزن را روی medium (500) گذاشتیم */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-700 font-medium transition-colors"
          >
            صفحه اصلی
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-700 font-medium transition-colors"
          >
            دوره های آموزشی
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-indigo-700 font-medium transition-colors"
          >
            درباره ما
          </a>
        </div>

        {/* لوگو */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* دکمه ورود: وزن را روی bold (700) گذاشتیم */}
        <div className="flex items-center gap-4">
          <div className="bg-lime-200/50 p-2.5 rounded-xl cursor-pointer hover:bg-lime-200 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a7a2a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <button className="bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-800 transition-all text-sm">
            ورود / ثبت نام
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
