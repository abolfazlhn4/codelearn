import React, { useState } from "react";
import { ChevronLeft, UploadCloud, Plus, HeadphonesIcon } from "lucide-react";

const TicketsTab = () => {
  const [view, setView] = useState("list");
  const [tickets, setTickets] = useState([]);

  const handleCreate = (e) => {
    e.preventDefault();
    setTickets([
      ...tickets,
      { id: Date.now(), title: e.target.subject.value, status: "در حال بررسی" },
    ]);
    setView("list");
  };

  if (view === "create") {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <button
            onClick={() => setView("list")}
            className="text-gray-500 hover:text-gray-800"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            ثبت درخواست جدید
          </h2>
        </div>
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                موضوع *
              </label>
              <input
                required
                name="subject"
                type="text"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500"
                placeholder="عنوان تیکت..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                اولویت *
              </label>
              <select
                required
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="low">کم</option>
                <option value="medium">متوسط</option>
                <option value="high">زیاد</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              متن درخواست *
            </label>
            <textarea
              required
              rows="5"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 resize-none"
              placeholder="توضیحات تکمیلی خود را وارد کنید..."
            ></textarea>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              فایل ضمیمه (اختیاری)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-blue-500 font-medium text-sm mb-1">
                بارگذاری کنید{" "}
                <span className="text-gray-500">
                  یا فایل را بکشید و اینجا رها کنید.
                </span>
              </p>
              <p className="text-xs text-gray-400">
                حداکثر ۵ فایل، فرمت pdf, png, jpeg, jpg
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors w-full md:w-auto"
          >
            ارسال درخواست
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        پشتیبانی
      </h2>
      {tickets.length > 0 ? (
        <div className="space-y-4">
          <button
            onClick={() => setView("create")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium mb-4 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> ثبت درخواست جدید
          </button>
          {tickets.map((t) => (
            <div
              key={t.id}
              className="p-4 border rounded-xl flex justify-between items-center bg-gray-50"
            >
              <span className="font-medium text-gray-800">{t.title}</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border border-gray-100 px-4 text-center">
          <HeadphonesIcon
            className="w-24 h-24 text-gray-300 mb-6"
            strokeWidth={1.5}
          />
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            در حال حاضر درخواستی ثبت نشده است.
          </h3>
          <p className="text-gray-500 mb-8 text-sm">
            در صورت داشتن هرگونه مشکل و یا سوالی می‌توانید در ۲۴ ساعت شبانه‌روز
            با پشتیبانی در ارتباط باشید.
          </p>
          <button
            onClick={() => setView("create")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            ثبت درخواست جدید
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketsTab;
