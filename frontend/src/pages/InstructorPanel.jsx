import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import api from "../api/api";
import {
  User,
  LogOut,
  LayoutDashboard,
  UserCog,
  PlusCircle,
  DollarSign,
  MessagesSquare,
} from "lucide-react";

import DashboardTab from "./teacher-panel-tabs/DashboardTab";
import AddCourseTab from "./teacher-panel-tabs/AddCourseTab";
import RevenueTab from "./teacher-panel-tabs/RevenueTab";
import TicketsTab from "./teacher-panel-tabs/TicketsTab";
import ProfileTab from "./teacher-panel-tabs/ProfileTab";

const InstructorPanel = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    if (role !== "instructor") {
      navigate("/user-panel", { replace: true });
      return;
    }
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.post("/api/v1/users/me/logout/", {}, { withCredentials: true });
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_phone");
      localStorage.removeItem("user_role");
      navigate("/auth", { replace: true });
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { path: "/instructor-panel", title: "داشبورد", icon: LayoutDashboard },
    {
      path: "/instructor-panel/add-course",
      title: "افزودن دوره",
      icon: PlusCircle,
    },
    {
      path: "/instructor-panel/revenue",
      title: "محاسبه درآمد",
      icon: DollarSign,
    },
    {
      path: "/instructor-panel/tickets",
      title: "تیکت‌های دوره",
      icon: MessagesSquare,
    },
    { path: "/instructor-panel/profile", title: "ویرایش حساب", icon: UserCog },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname.replace(/\/$/, "");
    return currentPath === path;
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f3f4f6] py-4 md:py-8 px-4 font-yekan"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 md:sticky md:top-8">
            <div className="hidden md:flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-800 truncate">پنل مدرس</p>
                <p className="text-xs text-gray-500 mt-1 truncate" dir="ltr">
                  {localStorage.getItem("user_phone")}
                </p>
              </div>
            </div>

            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible space-x-2 space-x-reverse md:space-x-0 md:space-y-2 pb-2 md:pb-0 scrollbar-hide">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap ${
                      active
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 shrink-0 ${active ? "text-indigo-600" : "text-gray-400"}`}
                      strokeWidth={2}
                    />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <LogOut className="w-5 h-5" />
                {isLoggingOut ? "در حال خروج..." : "خروج از حساب"}
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px] overflow-hidden">
          <Routes>
            <Route path="/" element={<DashboardTab />} />
            <Route path="add-course" element={<AddCourseTab />} />
            <Route path="revenue" element={<RevenueTab />} />
            <Route path="tickets" element={<TicketsTab />} />
            <Route path="profile" element={<ProfileTab />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default InstructorPanel;
