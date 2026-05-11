import React from "react";
import Navbar from "../components/Navbar";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("پیام شما با موفقیت ارسال شد!");
  };

  return (
    <div
      className="min-h-screen bg-[#f8f9fa] font-yekan flex flex-col"
      dir="rtl"
    >
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-12 md:py-20">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* بخش اطلاعات تماس */}
          <div className="bg-[#3b3ab5] text-white p-8 md:p-12 md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-black mb-6">تماس با ما</h2>
              <p className="text-indigo-100 text-sm leading-relaxed mb-8">
                برای ارتباط با تیم پشتیبانی آکادمی، مشاوره دوره‌ها و یا گزارش
                مشکلات، می‌توانید از طریق فرم روبرو و یا راه‌های ارتباطی زیر با
                ما در تماس باشید.
              </p>

              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <span className="font-medium" dir="ltr">
                    ۰۲۱ - ۱۲۳۴۵۶۷۸
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    ✉️
                  </div>
                  <span className="font-medium text-sm text-left">
                    support@academy.com
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <span className="font-medium text-sm leading-relaxed">
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* فرم تماس */}
          <div className="p-8 md:p-12 md:w-3/5">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              ارسال پیام
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#3b3ab5] focus:border-transparent outline-none transition-all"
                    placeholder="مثال: علی رضایی"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#3b3ab5] focus:border-transparent outline-none transition-all text-left"
                    placeholder="09123456789"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  موضوع پیام
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#3b3ab5] focus:border-transparent outline-none transition-all"
                  placeholder="مثال: مشکل در ورود به حساب کاربری"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  متن پیام
                </label>
                <textarea
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#3b3ab5] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="پیام خود را اینجا بنویسید..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#3b3ab5] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-md shadow-indigo-100"
              >
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
