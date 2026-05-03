import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { coursesData } from "../data/coursesData.js";
import {
  Play,
  ShoppingBag,
  Heart,
  Clock,
  LayoutGrid,
  CloudDownload,
  ListChecks,
  Users,
  ArrowLeft,
  Check,
  Video,
  User,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [isPurchased, setIsPurchased] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const purchased =
      JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    if (purchased.includes(parseInt(id))) {
      setIsPurchased(true);
    }
  }, [id]);

  const course = coursesData.find((item) => item.id === parseInt(id));

  const relatedCourses = coursesData.filter(
    (item) => item.categoryId === course?.categoryId && item.id !== course?.id,
  );

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();

  const getCategoryName = (catId) => {
    switch (catId) {
      case "backend":
        return "بک اند";
      case "frontend":
        return "فرانت اند";
      case "android":
        return "اندروید";
      case "desktop":
        return "دسکتاپ";
      default:
        return catId;
    }
  };

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
  }, [relatedCourses.length]);

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

  if (!course) {
    return (
      <div
        dir="rtl"
        className="pt-16 pb-32 text-center font-yekan bg-[#f8f9fa] flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl font-black text-gray-800 mb-4">
          دوره‌ای با این شناسه یافت نشد!
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#3b3ab5] text-white px-6 py-2 rounded-xl hover:bg-opacity-90 transition-colors shadow-md"
        >
          بازگشت به صفحه قبل
        </button>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="pt-6 pb-20 font-yekan min-h-screen bg-[#f8f9fa] px-4 sm:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* مسیر راهنما (Breadcrumb) */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4 gap-2">
          <Link to="/" className="hover:text-[#3b3ab5] transition-colors">
            صفحه اصلی
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to="/CoursesArchive"
            className="hover:text-[#3b3ab5] transition-colors"
          >
            دوره ها
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to={`/CoursesArchive?category=${course.categoryId}`}
            state={{ selectedCategory: course.categoryId }}
            className="hover:text-[#3b3ab5] transition-colors"
          >
            دسته بندی {getCategoryName(course.categoryId)}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* ستون سمت راست: ویدیو و توضیحات / سرفصل‌ها */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#3b3ab5] rounded-3xl aspect-[16/9] flex justify-center items-center relative overflow-hidden shadow-sm">
              <button className="bg-transparent rounded-full p-2 group transition-transform hover:scale-110">
                <Play
                  className="text-white w-20 h-20 opacity-90 group-hover:opacity-100"
                  strokeWidth={1.2}
                />
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h1 className="text-3xl font-black text-gray-800 mb-6">
                {course.title}
              </h1>

              <p className="text-gray-600 leading-8 text-justify mb-8">
                {course.description}
              </p>

              {isPurchased ? (
                <div>
                  <h2 className="text-2xl font-black text-gray-800 mb-6 mt-8 border-b pb-3 flex items-center gap-2">
                    <Video className="w-6 h-6 text-[#3b3ab5]" />
                    محتوای دوره (جلسات)
                  </h2>
                  <div className="space-y-4">
                    {course.syllabus?.map((chapter) => (
                      <div
                        key={chapter.chapterId}
                        className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                      >
                        <div className="bg-gray-50 px-5 py-4 font-bold text-gray-800 border-b border-gray-100">
                          {chapter.title}
                        </div>
                        <div className="divide-y divide-gray-50">
                          {chapter.episodes.map((episode) => (
                            <div
                              key={episode.id}
                              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-[#3b3ab5]" />
                                <span className="text-gray-700 text-sm">
                                  {episode.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>{episode.duration}</span>
                                <button className="flex items-center gap-1 text-[#3b3ab5] hover:text-blue-700 font-medium bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                  <CloudDownload className="w-4 h-4" />
                                  دانلود / پخش
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-gray-800 mb-4 mt-8">
                    توضیحات دوره
                  </h2>
                  <p className="text-gray-600 leading-8 text-justify">
                    {course.longDescription}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ستون سمت چپ */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#3b3ab5] transition-colors font-medium text-sm bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>بازگشت به لیست دوره‌ها</span>
              </button>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <span className="text-gray-600 text-sm font-medium">
                    قیمت دوره :
                  </span>
                  <span
                    className={`text-xl font-bold ${course.price === "رایگان" ? "text-green-500" : "text-[#4b9b65]"}`}
                  >
                    {course.price}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFavorite(course.id)}
                    className={`p-3.5 border rounded-xl transition-colors group ${isFavorite(course.id) ? "bg-red-50 border-red-200" : "border-gray-200 hover:bg-red-50"}`}
                  >
                    <Heart
                      className={`w-6 h-6 transition-all ${isFavorite(course.id) ? "text-red-500 fill-red-500" : "text-gray-400 group-hover:text-red-400"}`}
                      strokeWidth={1.5}
                    />
                  </button>

                  {isPurchased ? (
                    <div className="flex-1 font-medium py-3.5 rounded-xl flex justify-center items-center gap-2 text-sm bg-blue-50 text-[#3b3ab5] border border-blue-100 cursor-default">
                      <Check className="w-5 h-5" />
                      شما دانشجوی این دوره هستید
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(course)}
                      disabled={isInCart(course.id)}
                      className={`flex-1 font-medium py-3.5 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 text-sm ${isInCart(course.id) ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#4b9b65] hover:bg-green-700 text-white"}`}
                    >
                      {isInCart(course.id) ? (
                        <>
                          <Check className="w-5 h-5" /> موجود در سبد خرید
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5" /> افزودن به سبد خرید
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* باکس ویژگی‌ها */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Clock
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <span>مدت زمان دوره :</span>
                    </div>
                    <span className="text-gray-500">
                      {course.duration || "۲۲ ساعت"}
                    </span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <LayoutGrid
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <span>تعداد جلسات دوره :</span>
                    </div>
                    <span className="text-gray-500">
                      {course.sessionsCount || "۹۱ جلسه"}
                    </span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <CloudDownload
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <span>نحوه دیدن دوره :</span>
                    </div>
                    <span className="text-gray-500">
                      {course.viewType || "به صورت دانلودی"}
                    </span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <ListChecks
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <span>پیش نیاز دوره :</span>
                    </div>
                    <span className="text-gray-500">
                      {course.prerequisites || "پیش نیازی ندارد"}
                    </span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-800">
                      <Users
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={1.5}
                      />
                      <span>تعداد دانشجویان دوره :</span>
                    </div>
                    <span className="text-gray-500">
                      {course.studentsCount || "۱۴۹ نفر"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش دوره‌های مشابه */}
        {relatedCourses.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-2">
                دوره‌های مشابه
              </h3>

              {/* پیکان‌های ناوبری */}
              <div className="flex items-center gap-2">
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

            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[calc(50%-12px)] lg:auto-cols-[calc(25%-18px)] gap-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {relatedCourses.map((relatedCourse) => (
                <Link
                  key={relatedCourse.id}
                  to={`/product/${relatedCourse.id}`}
                  className="snap-start bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(59,58,181,0.1)] transition-all duration-300 flex flex-col group border border-transparent hover:border-[#3b3ab5]/10"
                >
                  <div className="bg-[#3b3ab5] w-full h-40 rounded-2xl mb-5 flex items-center justify-center text-white/50 group-hover:scale-[1.02] transition-transform duration-300">
                    <ImageIcon className="w-10 h-10" />
                  </div>

                  <h3 className="font-black text-lg text-black mb-2 px-1 group-hover:text-[#3b3ab5] transition-colors truncate">
                    {relatedCourse.title}
                  </h3>
                  <p className="font-normal text-gray-500 text-sm mb-6 leading-relaxed px-1 line-clamp-2">
                    {relatedCourse.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto px-1 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm font-medium">
                        {relatedCourse.teacher}
                      </span>
                    </div>
                  </div>

                  <hr className="border-gray-100 mb-4" />

                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-4 h-4" strokeWidth={2} />
                      <span className="text-sm">
                        {relatedCourse.studentsCount} نفر
                      </span>
                    </div>
                    <span className="text-[#4caf50] font-medium text-sm">
                      {relatedCourse.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
