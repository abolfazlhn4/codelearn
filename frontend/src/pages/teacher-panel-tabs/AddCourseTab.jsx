import React from "react";

const AddCourseTab = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        افزودن دوره جدید
      </h2>
      <form className="space-y-5 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              عنوان دوره
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50"
              placeholder="مثال: آموزش جامع ری‌اکت"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              دسته‌بندی (Category)
            </label>
            <select className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50">
              <option>برنامه‌نویسی وب</option>
              <option>طراحی UI/UX</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              قیمت (تومان)
            </label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50"
              placeholder="مثال: 500000"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              پیشنیازها
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50"
              placeholder="مثال: HTML, CSS, JS"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            توضیح کوتاه (Description)
          </label>
          <textarea
            rows="2"
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            توضیحات کامل (Long Description)
          </label>
          <textarea
            rows="5"
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 resize-none"
          ></textarea>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
        >
          ثبت اولیه دوره
        </button>
      </form>
    </div>
  );
};

export default AddCourseTab;
