import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle, User } from "lucide-react";

const CoursesTab = ({ purchasedCourses }) => (
  <div>
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
      آموزش‌های من
    </h2>
    {purchasedCourses.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map((course) => (
          <Link
            key={course.id}
            to={`/product/${course.id}`}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200 group flex flex-col"
          >
            <div className="bg-green-50 w-full h-32 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <PlayCircle className="w-10 h-10 text-green-500 z-10 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-sm text-gray-800 mb-2">
              {course.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500 mt-auto text-xs">
              <User className="w-3.5 h-3.5" />
              <span>{course.teacher}</span>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
        شما هنوز هیچ دوره‌ای خریداری نکرده‌اید.
      </div>
    )}
  </div>
);

export default CoursesTab;
