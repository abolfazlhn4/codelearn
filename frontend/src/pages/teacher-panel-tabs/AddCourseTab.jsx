import React, { useState } from "react";
import { Plus, Save, Send, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

const AddCourseTab = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "1",
    short_description: "",
    description: "",
    real_price: "",
    discount: "",
    requirements: "",
    is_free: false,
    thumbnail: null,
    trailer: null,
  });

  const [syllabus, setSyllabus] = useState([]);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    //name : title, category, short_description, description, real_price, discount, requirements, is_free
    // value : ReactCourse , frontend , sadad , asdasd , 1200000 , 20% , ...
    // type : number , text , checkbox
    // checked :true , false
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const {name, files} = e.target;
    //thumbnail, trailer
    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null,

    }));
  };

  const addChapter = () => {
    setSyllabus([
      ...syllabus,
      {chapterId: Date.now(), title: "", episodes: [] },
    ]);
  };

  const addEpisode = (chapterIndex) => {
    const newSyllabus = [...syllabus];
    newSyllabus[chapterIndex].episodes.push({
      id: Date.now(),
      title: "",
      description: "",
      isFree: false,
      video: null,
    });
    setSyllabus(newSyllabus);
  };

  const handleEpisodeChange = (cIndex, eIndex, field, value) => {
    const newSyllabus = [...syllabus];
    newSyllabus[cIndex].episodes[eIndex][field] = value;
    setSyllabus(newSyllabus);
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.short_description ||
      !formData.description
    ) {
      alert("لطفاً عنوان، توضیح کوتاه و توضیحات کامل دوره را وارد کنید.");
      return false;
    }

    if (
      !formData.is_free &&
      (!formData.real_price || parseInt(formData.real_price) <= 0)
    ) {
      alert("لطفاً قیمت دوره را مشخص کنید (یا تیک دوره رایگان را بزنید).");
      return false;
    }

    if (syllabus.length === 0) {
      alert("دوره شما باید حداقل دارای یک سرفصل باشد.");
      return false;
    }

    let hasEmptyEpisodes = false;
    syllabus.forEach((chap) => {
      if (chap.episodes.length === 0) hasEmptyEpisodes = true;
      chap.episodes.forEach((ep) => {
        if (!ep.title) hasEmptyEpisodes = true;
      });
    });

    if (hasEmptyEpisodes) {
      alert(
        "تمامی سرفصل‌ها باید حداقل یک قسمت داشته باشند و عنوان قسمت‌ها باید پر شده باشد.",
      );
      return false;
    }

    if (!formData.thumbnail) {
      alert("آپلود تصویر کاور دوره الزامی است.");
      return false;
    }

    return true;
  };

  const submitCourse = async (statusType) => {
    if (statusType === "PE") {
      const isValid = validateForm();
      if (!isValid) return;
    }

    try {
      setIsSubmitting(true);
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("category", parseInt(formData.category) || 1);
      payload.append(
        "real_price",
        formData.is_free ? 0 : parseInt(formData.real_price) || 0,
      );
      payload.append(
        "discount",
        formData.is_free ? 0 : parseInt(formData.discount) || 0,
      );
      payload.append("is_free", formData.is_free);
      payload.append("status", statusType);

      if (formData.short_description)
        payload.append("short_description", formData.short_description);
      if (formData.description)
        payload.append("description", formData.description);
      if (formData.requirements)
        payload.append("requirements", formData.requirements);

      if (formData.thumbnail) payload.append("thumbnail", formData.thumbnail);
      if (formData.trailer) payload.append("trailer", formData.trailer);

      const sectionsData = syllabus.map((chap, cIndex) => {
        return {
          title: chap.title,
          order: cIndex,
          lessons: chap.episodes.map((ep, eIndex) => ({
            title: ep.title,
            description: ep.description,
            order: eIndex,
            is_free: ep.isFree,
          })),
        };
      });

      payload.append("sections_data", JSON.stringify(sectionsData));

      syllabus.forEach((chap, cIndex) => {
        chap.episodes.forEach((ep, eIndex) => {
          if (ep.video) {
            payload.append(`video_${cIndex}_${eIndex}`, ep.video);
          }
        });
      });

      const res = await api.post("/api/v1/courses/me/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newCourseId = res.data?.id;

      if (statusType === "PE" && newCourseId) {
        await api.post(`/api/v1/courses/me/${newCourseId}/submit/`);
        alert("دوره با موفقیت ثبت و برای تایید ادمین ارسال شد.");
      } else {
        alert("اطلاعات به عنوان پیش‌نویس با موفقیت ذخیره شد.");
      }

      navigate("/instructor-panel/manage-courses");
    } catch (error) {
      console.error("Error submitting course:", error);
      alert(
        `خطا در ثبت دوره: ${error.response?.data ? JSON.stringify(error.response.data) : "خطای ناشناخته"}`,
      );
    } finally {
      setIsSubmitting(false);
    }
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
              className="w-full p-3 bg-white rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
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
              className="w-full p-3 rounded-xl border bg-white border-gray-200 outline-none focus:border-indigo-500"
            >
              <option value="1">فرانت‌اند</option>
              <option value="2">بک‌اند</option>
              <option value="3">دسکتاپ</option>
              <option value="4">اندروید</option>
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
              className="w-full p-3 rounded-xl border bg-white border-gray-200 outline-none focus:border-indigo-500 disabled:opacity-50"
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
              className="w-full p-3 rounded-xl border bg-white border-gray-200 outline-none focus:border-indigo-500 disabled:opacity-50"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="is_free"
              name="is_free"
              checked={formData.is_free}
              onChange={handleChange}
              className="w-4 h-4 bg-white text-indigo-600 rounded"
            />
            <label
              htmlFor="is_free"
              className="text-sm font-medium text-gray-700"
            >
              این دوره رایگان است
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تصویر کاور
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-200 rounded-xl bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ویدیو معرفی
            </label>
            <input
              type="file"
              name="trailer"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-200 rounded-xl bg-white text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیح کوتاه
            </label>
            <input
              type="text"
              name="short_description"
              maxLength="150"
              value={formData.short_description}
              onChange={handleChange}
              className="w-full p-3 bg-white rounded-xl border border-gray-200 outline-none focus:border-indigo-500"
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
              className="w-full p-3 rounded-xl border bg-white border-gray-200 outline-none focus:border-indigo-500"
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
              className="w-full p-3 rounded-xl border bg-white border-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* سرفصل‌ها */}
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
                      className="w-full p-2.5 rounded-lg border bg-white border-gray-200 outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <button
                    onClick={() => addEpisode(cIndex)}
                    className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  >
                    + قسمت جدید
                  </button>
                </div>

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
                          className="w-full p-2 border bg-white border-gray-200 rounded-md text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          آپلود ویدیو
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            handleEpisodeChange(
                              cIndex,
                              eIndex,
                              "video",
                              e.target.files[0],
                            )
                          }
                          className="w-full p-1.5 border border-gray-200 rounded-md text-sm outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-indigo-50 file:text-indigo-700"
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

                      <div className="lg:col-span-4">
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => submitCourse("DR")}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> ذخیره به عنوان پیش‌نویس
          </button>
          <button
            onClick={() => submitCourse("PE")}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" /> بروزرسانی و ارسال برای ادمین
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseTab;
