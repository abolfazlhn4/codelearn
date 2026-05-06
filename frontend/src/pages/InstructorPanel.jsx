import React, { useEffect } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const InstructorPanel = () => {
  const navigate = useNavigate();

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
    try {
      await api.post("/api/v1/users/me/logout/", {}, { withCredentials: true });
    } catch (error) {
      console.error("خطا در خروج از حساب:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_phone");
      localStorage.removeItem("user_role");
      navigate("/auth", { replace: true });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-yekan">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-black text-gray-800">پنل کاربری مدرس</h1>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl font-bold transition-all duration-300 shadow-sm border border-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorPanel;
