import React from "react";
import { Link } from "react-router-dom";
import { ImageIcon, User, Heart } from "lucide-react";

const FavoritesTab = ({ favoriteCourses, toggleFavorite }) => (
  <div>
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
      علاقه‌مندی‌های من
    </h2>
    {favoriteCourses.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCourses.map((course) => (
          <Link
            key={course.id}
            to={`/product/${course.id}`}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-pink-200 group flex flex-col"
          >
            <div className="bg-[#3b3ab5]/10 w-full h-32 rounded-xl mb-4 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-[#3b3ab5]/50 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-sm text-gray-800 mb-2">
              {course.title}
            </h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {course.teacher}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(course.id);
                }}
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
        لیست علاقه‌مندی‌های شما خالی است.
      </div>
    )}
  </div>
);

export default FavoritesTab;
