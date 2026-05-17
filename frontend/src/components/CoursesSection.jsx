import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Heart,
  Users,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import api from "../api/api";

const CoursesSection = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [courses, setCourses] = useState([]);

  const scrollContainerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/v1/courses/categories/");

        const fetchedCategories = response.data.results || response.data;

        if (fetchedCategories && Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
          if (fetchedCategories.length > 0) {
            setActiveCategory(fetchedCategories[0].id);
          }
        }
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!activeCategory) return;

      try {
        const response = await api.get(
          `/api/v1/courses/?category=${activeCategory}`,
        );

        const fetchedCourses = response.data.results || [];
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("خطا در دریافت دوره‌ها:", error);
      }
    };

    fetchCourses();
  }, [activeCategory]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const absScrollLeft = Math.abs(Math.round(scrollLeft));
      const maxScroll = scrollWidth - clientWidth;

      setCanScrollPrev(absScrollLeft > 2);
      setCanScrollNext(absScrollLeft < maxScroll - 2);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [activeCategory, courses.length]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild;

      if (firstCard) {
        const scrollAmount = firstCard.offsetWidth + 24;
        const scrollOffset =
          direction === "next" ? -scrollAmount : scrollAmount;

        container.scrollBy({
          left: scrollOffset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="courses-section"
      dir="rtl"
      className="bg-[#f8f9fa] py-16 px-4 sm:px-8 font-yekan overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر سکشن */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black whitespace-nowrap">
              دوره های آموزشی
            </h2>
            {/* پیکان‌های ناوبری */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll("prev")}
                disabled={!canScrollPrev}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-all ${
                  canScrollPrev
                    ? "text-gray-600 hover:bg-[#3b3ab5] hover:text-white hover:border-[#3b3ab5] cursor-pointer"
                    : "text-gray-300 opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scroll("next")}
                disabled={!canScrollNext}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition-all ${
                  canScrollNext
                    ? "text-gray-600 hover:bg-[#3b3ab5] hover:text-white hover:border-[#3b3ab5] cursor-pointer"
                    : "text-gray-300 opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* دکمه‌های دسته‌بندی */}
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 lg:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[11px] sm:text-sm font-medium transition-all text-center whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-[#3b3ab5] text-white shadow-md"
                    : "bg-[#e5f0d1] text-gray-700 hover:bg-[#d8e8bc]"
                }`}
              >
                {cat.label || cat.title || cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* کانتینر محصولات */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc(50%-12px)] lg:auto-cols-[calc(25%-18px)] gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <Link
                key={course.id}
                to={`/product/${course.id}`}
                className="snap-start bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(59,58,181,0.1)] transition-all duration-300 flex flex-col group cursor-pointer border border-transparent hover:border-[#3b3ab5]/10"
              >
                <div className="bg-[#3b3ab5] w-full h-44 rounded-2xl mb-5 flex items-center justify-center overflow-hidden text-white/50 group-hover:scale-[1.02] transition-transform duration-300">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12" />
                  )}
                </div>

                <h3 className="font-black text-lg text-black mb-2 px-1 group-hover:text-[#3b3ab5] transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="font-normal text-gray-500 text-sm mb-6 leading-relaxed px-1 line-clamp-2">
                  {course.short_description}
                </p>

                <div className="flex items-center justify-between mt-auto px-1 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" strokeWidth={2} />
                    <span className="text-sm font-medium">
                      {course.instructor}
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
                    <span className="text-sm">{course.student_count} نفر</span>
                  </div>
                  <span className="text-[#4caf50] font-medium text-sm">
                    {course.is_free
                      ? "رایگان"
                      : `${Number(course.price).toLocaleString()} تومان`}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full w-full flex items-center justify-center h-48">
              <span className="text-gray-500 font-medium">
                دوره‌ای در این دسته‌بندی یافت نشد.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
