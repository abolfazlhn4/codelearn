import React from "react";
import { Wallet, Settings, Users, MonitorPlay } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "پرداخت اقساطی",
      description:
        "امکان پرداخت هزینه دوره‌ها به صورت اقساطی و بدون بهره برای راحتی شما.",
      icon: <Wallet className="w-6 h-6 text-white" />,
      bgColor: "bg-white",
    },
    {
      id: 2,
      title: "پشتیبانی دائمی",
      description:
        "پشتیبانی ۲۴ ساعته در ۷ روز هفته توسط متخصصین برای رفع مشکلات شما.",
      icon: <Settings className="w-6 h-6 text-white" />,
      bgColor: "bg-[#e5f0d1]", // کارت سبز رنگ
    },
    {
      id: 3,
      title: "اساتید مجرب",
      description:
        "بهره‌گیری از بهترین اساتید با تجربه کاری بالا در پروژه‌های واقعی.",
      icon: <Users className="w-6 h-6 text-white" />,
      bgColor: "bg-white",
    },
    {
      id: 4,
      title: "پروژه محور",
      description:
        "یادگیری مفاهیم از طریق انجام پروژه‌های کاربردی و ورود به بازار کار.",
      icon: <MonitorPlay className="w-6 h-6 text-white" />,
      bgColor: "bg-white",
    },
  ];

  return (
    <section
      dir="rtl"
      className="bg-[#f8f9fa] font-yekan pt-8 pb-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* بخش عنوان */}
        <div className="text-center mb-16 space-y-3">
          <p className="text-gray-500 font-medium text-sm">ویژگی های ما</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            چرا باید سایت مارو انتخاب کنید؟
          </h2>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`
                ${feature.bgColor} 
                rounded-[2rem] p-8 
                shadow-sm hover:shadow-md transition-shadow duration-300
                flex flex-col items-center text-center
                ${/* ایجاد افکت پله‌ای فقط در دسکتاپ */ ""}
                ${index % 2 === 0 ? "lg:-translate-y-4" : "lg:translate-y-4"}
              `}
            >
              <div className="bg-[#3b3ab5] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-normal text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
