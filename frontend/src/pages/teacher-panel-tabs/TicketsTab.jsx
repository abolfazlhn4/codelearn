import React from "react";

const TicketsTab = () => {
  const mockTickets = [
    {
      id: 1,
      course: "آموزش جامع ری‌اکت",
      title: "مشکل در اجرای پروژه نهایی",
      priority: "high",
      status: "پاسخ داده نشده",
      student: "علی احمدی",
    },
    {
      id: 2,
      course: "طراحی رابط کاربری",
      title: "سوال در مورد فایل‌های فیگما",
      priority: "medium",
      status: "پاسخ داده شده",
      student: "سارا حسینی",
    },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        تیکت‌های دانشجویان
      </h2>

      <div className="space-y-4">
        {mockTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
              <div>
                <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md mb-2 inline-block">
                  {ticket.course}
                </span>
                <h3 className="font-bold text-gray-800">{ticket.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  ارسال کننده: {ticket.student}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-md ${ticket.priority === "high" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"}`}
                >
                  اولویت: {ticket.priority === "high" ? "بالا" : "متوسط"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-md ${ticket.status === "پاسخ داده نشده" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
                >
                  {ticket.status}
                </span>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                مشاهده و پاسخ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsTab;
