import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { User, Heart, Users, Image as ImageIcon, Filter } from "lucide-react";
import { coursesData, categories } from "../data/coursesData";
import { useFavorites } from "../context/FavoritesContext";

const CoursesArchive = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all"); // 'all', 'free', 'paid'

  const { toggleFavorite, isFavorite } = useFavorites();

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchCategory =
        selectedCategory === "all"
          ? true
          : course.categoryId === selectedCategory;

      let matchPrice = true;
      const isFree =
        course.price === "رایگان" || course.price === "0" || course.price === 0;

      if (priceFilter === "free") matchPrice = isFree;
      if (priceFilter === "paid") matchPrice = !isFree;

      return matchCategory && matchPrice;
    });
  }, [selectedCategory, priceFilter]);

  return (
    <div
      dir="rtl"
      className="bg-[#f8f9fa] min-h-screen py-10 px-4 sm:px-8 font-yekan"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* سایدبار فیلترها */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-[2rem] shadow-sm h-fit border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-black">
            <Filter className="w-5 h-5" />
            <h2 className="font-black text-xl">فیلترها</h2>
          </div>

          {/* فیلتر دسته‌بندی */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4">دسته‌بندی‌ها</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
                  className="accent-[#3b3ab5]"
                />
                <span className="text-sm text-gray-600">همه دوره‌ها</span>
              </label>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                    className="accent-[#3b3ab5]"
                  />
                  <span className="text-sm text-gray-600">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* فیلتر قیمت */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">وضعیت قیمت</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "all"}
                  onChange={() => setPriceFilter("all")}
                  className="accent-[#3b3ab5]"
                />
                <span className="text-sm text-gray-600">همه قیمت‌ها</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "free"}
                  onChange={() => setPriceFilter("free")}
                  className="accent-[#3b3ab5]"
                />
                <span className="text-sm text-gray-600">رایگان</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceFilter === "paid"}
                  onChange={() => setPriceFilter("paid")}
                  className="accent-[#3b3ab5]"
                />
                <span className="text-sm text-gray-600">نقدی</span>
              </label>
            </div>
          </div>
        </aside>

        {/* بخش نمایش محصولات */}
        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-black text-black">آرشیو دوره‌ها</h1>
            <span className="text-sm text-gray-500">
              {filteredCourses.length} دوره یافت شد
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/product/${course.id}`}
                  className="bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(59,58,181,0.1)] transition-all duration-300 flex flex-col group cursor-pointer border border-transparent hover:border-[#3b3ab5]/10"
                >
                  <div className="bg-[#3b3ab5] w-full h-44 rounded-2xl mb-5 flex items-center justify-center text-white/50 group-hover:scale-[1.02] transition-transform duration-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>

                  <h3 className="font-black text-lg text-black mb-2 px-1 group-hover:text-[#3b3ab5] transition-colors">
                    {course.title}
                  </h3>
                  <p className="font-normal text-gray-500 text-sm mb-6 leading-relaxed px-1 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto px-1 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm font-medium">
                        {course.teacher}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(course.id);
                      }}
                      className="transition-colors z-10"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          isFavorite(course.id)
                            ? "fill-red-500 text-red-500"
                            : "fill-transparent text-gray-300 hover:text-red-500"
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  <hr className="border-gray-100 mb-4" />

                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm">
                        {course.studentsCount} نفر
                      </span>
                    </div>
                    <span className="text-[#4caf50] font-medium text-sm">
                      {course.price}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-[2rem] py-16 text-center text-gray-500 border border-gray-100 shadow-sm">
                دوره‌ای با این فیلترها یافت نشد.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesArchive;
