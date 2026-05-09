import React, { useState } from "react";
import { Plus, Trash2, Save, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AddCourseTab = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "frontend",
    short_description: "",
    description: "",
    thumbnail: null,
    trailer: null,
    real_price: "",
    discount: "",
    requirements: "",
    status: "DR", // Draft
    is_free: false,
  });

  const [syllabus, setSyllabus] = useState([]);

  // هندلر تغییرات اینپوت‌های اصلی
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // بررسی محدودیت حجم ویدیو (۵ مگابایت)
  const validateVideoSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file && file.size > maxSize) {
      alert("حجم ویدیو نباید بیشتر از 5 مگابایت باشد!");
      return false;
    }
    return true;
  };

  // افزودن سرفصل جدید
  const addChapter = () => {
    setSyllabus([
      ...syllabus,
      { chapterId: Date.now(), title: "", episodes: [] },
    ]);
  };

  // افزودن قسمت به سرفصل مشخص
  const addEpisode = (chapterIndex) => {
    const newSyllabus = [...syllabus];
    newSyllabus[chapterIndex].episodes.push({
      id: Date.now(),
      title: "",
      description: "",
      duration: "",
      isFree: false,
      video: null,
    });
    setSyllabus(newSyllabus);
  };

  // تغییرات داخل قسمت‌های یک سرفصل
  const handleEpisodeChange = (cIndex, eIndex, field, value) => {
    const newSyllabus = [...syllabus];
    newSyllabus[cIndex].episodes[eIndex][field] = value;
    setSyllabus(newSyllabus);
  };

  // هندلر آپلود ویدیو برای قسمت‌ها با محدودیت ۵ مگابایت
  const handleEpisodeVideo = (e, cIndex, eIndex) => {
    const file = e.target.files[0];
    if (validateVideoSize(file)) {
      handleEpisodeChange(cIndex, eIndex, "video", file);
    } else {
      e.target.value = null; // پاک کردن اینپوت
    }
  };

  // ثبت فرم
  const handleSaveDraft = () => {
    console.log("Saving Draft (Local):", { ...formData, syllabus });
    alert("اطلاعات به عنوان پیش‌نویس با موفقیت ذخیره شد.");
  };

  const handleSubmitAdmin = () => {
    console.log("Submitting to Admin:", { ...formData, syllabus });
    alert("دوره با موفقیت برای تایید ادمین ارسال شد.");
  };

  return (
    <div className="pb-10">
      <div className="flex items-center mb-8 gap-4">
        <Link
          to="/instructor-panel/manage-courses"
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">افزودن دوره جدید</h2>
      </div>

      <div className="space-y-6">
        {/* اطلاعات پایه */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان دوره
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
              placeholder="مثال: آموزش جامع ری‌اکت"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              دسته‌بندی
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            >
              <option value="frontend">فرانت‌اند</option>
              <option value="backend">بک‌اند</option>
              <option value="desktop">دسکتاپ</option>
              <option value="android">اندروید</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              قیمت (تومان)
            </label>
            <input
              type="number"
              name="real_price"
              value={formData.real_price}
              onChange={handleChange}
              disabled={formData.is_free}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 disabled:opacity-50"
              placeholder="مثال: 500000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              درصد تخفیف
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              disabled={formData.is_free}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 disabled:opacity-50"
              placeholder="مثال: 20"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_free"
              name="is_free"
              checked={formData.is_free}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <label
              htmlFor="is_free"
              className="text-sm font-medium text-gray-700"
            >
              این دوره رایگان است
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیح کوتاه (حداکثر ۱۵۰ کاراکتر)
            </label>
            <input
              type="text"
              name="short_description"
              maxLength="150"
              value={formData.short_description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات کامل
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              پیش‌نیازها
            </label>
            <input
              type="text"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
              placeholder="مثال: آشنایی با HTML, CSS"
            />
          </div>
        </div>

        {/* فایل‌های دوره */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              آپلود تصویر (Thumbnail)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, thumbnail: e.target.files[0] })
              }
              className="w-full p-2 border border-gray-200 bg-white rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ویدیو معرفی (حداکثر 5MB)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                if (validateVideoSize(e.target.files[0]))
                  setFormData({ ...formData, trailer: e.target.files[0] });
              }}
              className="w-full p-2 border border-gray-200 bg-white rounded-xl text-sm"
            />
          </div>
        </div>

        {/* سرفصل‌ها (Syllabus) */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              محتوای دوره (سرفصل‌ها)
            </h3>
            <button
              onClick={addChapter}
              className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4" /> افزودن سرفصل جدید
            </button>
          </div>

          {syllabus.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              هنوز سرفصلی اضافه نشده است.
            </p>
          )}

          <div className="space-y-6">
            {syllabus.map((chapter, cIndex) => (
              <div
                key={chapter.chapterId}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5"
              >
                <div className="flex gap-4 items-end mb-6">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      عنوان سرفصل
                    </label>
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => {
                        const newSyllabus = [...syllabus];
                        newSyllabus[cIndex].title = e.target.value;
                        setSyllabus(newSyllabus);
                      }}
                      className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-indigo-500 text-sm"
                      placeholder="مثال: مقدمات Node.js"
                    />
                  </div>
                  <button
                    onClick={() => addEpisode(cIndex)}
                    className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  >
                    + قسمت جدید
                  </button>
                </div>

                {/* قسمت‌های این سرفصل */}
                <div className="space-y-4 pl-4 border-r-2 border-indigo-100 pr-4">
                  {chapter.episodes.map((ep, eIndex) => (
                    <div
                      key={ep.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
                    >
                      <div className="lg:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">
                          عنوان قسمت
                        </label>
                        <input
                          type="text"
                          value={ep.title}
                          onChange={(e) =>
                            handleEpisodeChange(
                              cIndex,
                              eIndex,
                              "title",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-gray-200 rounded-md text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          مدت زمان (MM:SS)
                        </label>
                        <input
                          type="text"
                          placeholder="12:00"
                          value={ep.duration}
                          onChange={(e) =>
                            handleEpisodeChange(
                              cIndex,
                              eIndex,
                              "duration",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-gray-200 rounded-md text-sm outline-none"
                          dir="ltr"
                        />
                      </div>
                      <div className="flex items-center h-[38px] gap-2">
                        <input
                          type="checkbox"
                          id={`free-${ep.id}`}
                          checked={ep.isFree}
                          onChange={(e) =>
                            handleEpisodeChange(
                              cIndex,
                              eIndex,
                              "isFree",
                              e.target.checked,
                            )
                          }
                          className="rounded text-indigo-600"
                        />
                        <label
                          htmlFor={`free-${ep.id}`}
                          className="text-sm text-gray-600"
                        >
                          پخش رایگان
                        </label>
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">
                          توضیحات کوتاه این قسمت
                        </label>
                        <input
                          type="text"
                          value={ep.description}
                          onChange={(e) =>
                            handleEpisodeChange(
                              cIndex,
                              eIndex,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-gray-200 rounded-md text-sm outline-none"
                        />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-xs text-gray-500 mb-1">
                          آپلود ویدیو (Max 5MB)
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handleEpisodeVideo(e, cIndex, eIndex)
                          }
                          className="w-full p-1.5 border border-gray-200 rounded-md text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* دکمه‌های ثبت */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            <Save className="w-5 h-5" /> ذخیره به عنوان پیش‌نویس
          </button>
          <button
            onClick={handleSubmitAdmin}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-5 h-5" /> ارسال برای تایید ادمین
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseTab;
