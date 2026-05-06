import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { coursesData } from "../data/coursesData";
import {
  Heart,
  User,
  PlayCircle,
  LogOut,
  LayoutDashboard,
  Award,
  UserCog,
  Wallet,
  ShoppingBag,
  HeadphonesIcon,
} from "lucide-react";
import api from "../api/api";

import DashboardTab from "./user-panel-tabs/DashboardTab";
import CoursesTab from "./user-panel-tabs/CoursesTab";
import OrdersTab from "./user-panel-tabs/OrdersTab";
import FavoritesTab from "./user-panel-tabs/FavoritesTab";
import ProfileTab from "./user-panel-tabs/ProfileTab";
import CertificatesTab from "./user-panel-tabs/CertificatesTab";
import TicketsTab from "./user-panel-tabs/TicketsTab";
import WalletTab from "./user-panel-tabs/WalletTab";

const UserPanel = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token) {
      navigate("/auth", { replace: true });
      return;
    }

    if (role !== "student") {
      navigate("/instructor-panel", { replace: true });
      return;
    }

    const storedPurchases =
      JSON.parse(localStorage.getItem("purchasedCourses")) || [];
    setPurchasedIds(storedPurchases);

    setProfileData({
      first_name: "کاربر",
      last_name: "تست",
      email: "user@example.com",
      phone_number: localStorage.getItem("user_phone") || "+98",
    });
  }, [navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    alert("اطلاعات با موفقیت بروزرسانی شد.");
  };

  const favoriteCourses = coursesData.filter((course) =>
    favorites.includes(course.id),
  );
  const purchasedCourses = coursesData.filter((course) =>
    purchasedIds.includes(course.id),
  );

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_phone");
    localStorage.removeItem("user_role");
    navigate("/auth", { replace: true });
  };

  const menuItems = [
    { path: "/user-panel", title: "داشبورد", icon: LayoutDashboard },
    { path: "/user-panel/courses", title: "آموزش‌های من", icon: PlayCircle },
    { path: "/user-panel/certificates", title: "گواهینامه‌ها", icon: Award },
    { path: "/user-panel/orders", title: "سفارش‌ها", icon: ShoppingBag },
    { path: "/user-panel/wallet", title: "کیف پول من", icon: Wallet },
    { path: "/user-panel/favorites", title: "علاقه‌مندی‌های من", icon: Heart },
    { path: "/user-panel/tickets", title: "پشتیبانی", icon: HeadphonesIcon },
    { path: "/user-panel/profile", title: "اطلاعات کاربری", icon: UserCog },
  ];

  // تشخیص دقیق تب فعال
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
        {/* سایدبار */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 md:sticky md:top-8">
            <div className="hidden md:flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-800 truncate">کاربر دانشجو</p>
                <p className="text-xs text-gray-500 mt-1 truncate" dir="ltr">
                  {profileData?.phone_number}
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
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 shrink-0 ${active ? "text-blue-600" : "text-gray-400"}`}
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
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                خروج از حساب
              </button>
            </div>
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main className="flex-1 bg-white p-5 md:p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px] overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardTab
                  purchasedCourses={purchasedCourses}
                  favoriteCourses={favoriteCourses}
                />
              }
            />
            <Route
              path="courses"
              element={<CoursesTab purchasedCourses={purchasedCourses} />}
            />
            <Route
              path="orders"
              element={<OrdersTab purchasedCourses={purchasedCourses} />}
            />
            <Route
              path="favorites"
              element={
                <FavoritesTab
                  favoriteCourses={favoriteCourses}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="profile"
              element={
                <ProfileTab
                  profileData={profileData}
                  setProfileData={setProfileData}
                  handleProfileUpdate={handleProfileUpdate}
                />
              }
            />
            <Route path="certificates" element={<CertificatesTab />} />
            <Route path="tickets" element={<TicketsTab />} />
            <Route path="wallet" element={<WalletTab />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
