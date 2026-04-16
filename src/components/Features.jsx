import React from "react";

const Features = () => {
  const features = [
    {
      title: "پشتیبانی دائمی",
      desc: "پاسخگویی به سوالات در تمام مراحل یادگیری",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-indigo-600"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      bgColor: "bg-indigo-50",
    },
    {
      title: "مدرک معتبر",
      desc: "ارائه گواهی پایان دوره برای ورود به بازار کار",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-lime-700"
        >
          <path d="M12 15l-2 5l2 2l2-2l-2-5" />
          <path d="M15 13l-3 8l-3-8l3-8l3 8z" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      bgColor: "bg-lime-50",
    },
    {
      title: "پروژه‌ محور",
      desc: "یادگیری عمیق با انجام پروژه‌های واقعی و عملی",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-600"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section
      className="w-full max-w-7xl mx-auto px-6 py-16 font-yekan"
      dir="rtl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="group flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-default"
          >
            {/* آیکون */}
            <div
              className={`w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl ${item.bgColor} group-hover:scale-110 transition-transform`}
            >
              {item.icon}
            </div>

            {/* متن */}
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-black text-gray-900 leading-tight">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
