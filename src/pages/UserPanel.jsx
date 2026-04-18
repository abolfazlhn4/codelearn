import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { coursesData } from "../data/coursesData";
import { Heart, User, Users, ImageIcon } from "lucide-react";

const UserPanel = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteCourses = coursesData.filter((course) =>
    favorites.includes(course.id),
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-yekan">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-gray-800 mb-8">پنل کاربری</h1>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-4">
            دوره‌های مورد علاقه من
          </h2>

          {favoriteCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/product/${course.id}`}
                  className="bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(59,58,181,0.1)] transition-all duration-300 flex flex-col group border border-transparent hover:border-[#3b3ab5]/10"
                >
                  <div className="bg-[#3b3ab5] w-full h-40 rounded-2xl mb-5 flex items-center justify-center text-white/50 group-hover:scale-[1.02] transition-transform duration-300 relative">
                    <ImageIcon className="w-10 h-10" />
                  </div>

                  <h3 className="font-black text-base text-black mb-2 px-1 group-hover:text-[#3b3ab5] transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto px-1 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" strokeWidth={2} />
                      <span className="text-xs font-medium">
                        {course.teacher}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(course.id);
                      }}
                      className="z-10"
                    >
                      <Heart
                        className="w-5 h-5 fill-red-500 text-red-500"
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  <hr className="border-gray-100 mb-4" />

                  <div className="flex items-center justify-between px-1">
                    <span className="text-[#4caf50] font-medium text-sm">
                      {course.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              شما هنوز هیچ دوره‌ای را به علاقه‌مندی‌ها اضافه نکرده‌اید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
