import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Heart,
  Users,
  Image as ImageIcon,
  Filter,
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { coursesData, categories } from "../data/coursesData";
import { useFavorites } from "../context/FavoritesContext";

const CoursesArchive = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("courseSearchTerm") || "";
  });

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    localStorage.setItem("courseSearchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryQuery = searchParams.get("category");

    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else {
      setSelectedCategory("all");
    }
  }, [location.search]);

  // اگر هرکدام از فیلترها تغییر کرد، برگردیم به صفحه اول
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    priceFilter,
    searchTerm,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const numStr = priceStr.toString().replace(/[^\d۰-۹]/g, "");
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let englishNum = numStr;
    persianNumbers.forEach((pNum, index) => {
      englishNum = englishNum.replace(new RegExp(pNum, "g"), index.toString());
    });
    return parseInt(englishNum) || 0;
  };

  const filteredCourses = useMemo(() => {
    let result = coursesData.filter((course) => {
      const matchCategory =
        selectedCategory === "all"
          ? true
          : course.categoryId === selectedCategory;
      const matchSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      let matchPrice = true;
      const priceVal = parsePrice(course.price);
      const isFree = priceVal === 0;

      if (priceFilter === "free") matchPrice = isFree;
      if (priceFilter === "paid") matchPrice = !isFree;

      let matchPriceRange = true;
      if (priceFilter !== "free") {
        if (minPrice && priceVal < parseInt(minPrice, 10))
          matchPriceRange = false;
        if (maxPrice && priceVal > parseInt(maxPrice, 10))
          matchPriceRange = false;
      }
      return matchCategory && matchSearch && matchPrice && matchPriceRange;
    });

    result.sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);

      switch (sortOrder) {
        case "price_high":
          return priceB - priceA;
        case "top_rated":
          return (b.studentsCount || 0) - (a.studentsCount || 0);
        case "oldest":
          return a.id - b.id;
        case "newest":
        default:
          return b.id - a.id;
      }
    });
    return result;
  }, [
    selectedCategory,
    priceFilter,
    searchTerm,
    minPrice,
    maxPrice,
    sortOrder,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  }, [currentPage, filteredCourses]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      dir="rtl"
      className="bg-[#f8f9fa] min-h-screen py-10 px-4 sm:px-8 font-yekan"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* سایدبار فیلترها (بدون تغییر) */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-[2rem] shadow-sm h-fit border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-black">
            <Filter className="w-5 h-5" />
            <h2 className="font-black text-xl">فیلترها</h2>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4">جستجو</h3>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="نام دوره رو بگرد..."
                className="w-full p-3 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b3ab5]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3.5" />
            </div>
          </div>

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

            {priceFilter !== "free" && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">
                  بازه قیمت (تومان)
                </h4>
                <div className="flex justify-between mb-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-gray-500">ارزانترین</span>
                    <span className="font-semibold text-[#3b3ab5]">
                      {minPrice
                        ? parseInt(minPrice).toLocaleString("fa-IR")
                        : "۰"}{" "}
                      تومان
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-gray-500">گرانترین</span>
                    <span className="font-semibold text-[#3b3ab5]">
                      {maxPrice
                        ? parseInt(maxPrice).toLocaleString("fa-IR")
                        : "30,000,000"}{" "}
                      تومان
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="از"
                    className="w-1/2 p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b3ab5]"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="تا"
                    className="w-1/2 p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3b3ab5]"
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* بخش نمایش محصولات */}
        <main className="w-full md:w-3/4">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-black">آرشیو دوره‌ها</h1>
              <span className="text-sm text-gray-500">
                {filteredCourses.length} دوره یافت شد
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-sm text-gray-600">مرتب‌سازی:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="text-sm bg-transparent font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="newest">جدیدترین</option>
                <option value="oldest">قدیمی‌ترین</option>
                <option value="price_high">بیشترین قیمت</option>
                <option value="top_rated">محبوب‌ترین</option>
              </select>
            </div>
          </div>

          {/* استفاده از currentCourses به جای filteredCourses در اینجا */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.length > 0 ? (
              currentCourses.map((course) => (
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

          {/* صفحه بندی */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        currentPage === pageNumber
                          ? "bg-[#3b3ab5] text-white shadow-md shadow-[#3b3ab5]/20"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursesArchive;
