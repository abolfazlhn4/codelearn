import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { User, Upload } from "lucide-react";

const ProfileTab = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    gender: "",
    phone_number: "",
    avatar: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/v1/users/me/profile/");
        const data = response.data;
        const formattedData = {
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          birth_date: data.birth_date || "",
          gender: data.gender || "",
          phone_number: data.phone_number || "",
          avatar: data.avatar || null,
        };
        setProfileData(formattedData);
        setAvatarPreview(formattedData.avatar);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();

    formData.append("first_name", profileData.first_name);
    formData.append("last_name", profileData.last_name);
    formData.append("email", profileData.email);

    if (profileData.birth_date) {
      formData.append("birth_date", profileData.birth_date);
    }
    if (profileData.gender) {
      formData.append("gender", profileData.gender);
    }

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const response = await api.patch("/api/v1/users/me/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("اطلاعات با موفقیت بروزرسانی شد.");

      const data = response.data;
      setAvatarPreview(data.avatar);
      setAvatarFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error.response?.data);
      alert("خطا در بروزرسانی اطلاعات. لطفاً دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        ویرایش اطلاعات کاربری
      </h2>
      <form onSubmit={handleProfileUpdate} className="space-y-8">
        {/* بخش آواتار */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4" />
              تغییر آواتار
            </button>
            <p className="text-xs text-gray-500 mt-2">
              تصاویر با فرمت JPG, PNG یا GIF
            </p>
          </div>
        </div>

        {/* فیلدهای فرم */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">نام</label>
            <input
              type="text"
              name="first_name"
              value={profileData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              نام خانوادگی
            </label>
            <input
              type="text"
              name="last_name"
              value={profileData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">ایمیل</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              dir="ltr"
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors text-left"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              شماره موبایل (غیرقابل تغییر)
            </label>
            <input
              type="text"
              value={profileData.phone_number}
              readOnly
              dir="ltr"
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-100 text-gray-500 cursor-not-allowed text-left opacity-70"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              تاریخ تولد
            </label>
            <input
              type="date"
              name="birth_date"
              value={profileData.birth_date}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">جنسیت</label>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors appearance-none"
            >
              <option value="">انتخاب کنید...</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
          </div>
        </div>

        {/* دکمه ثبت */}
        <div className="pt-4 border-t mt-8">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors w-full md:w-auto"
          >
            {saving ? "در حال ذخیره..." : "ثبت تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;
