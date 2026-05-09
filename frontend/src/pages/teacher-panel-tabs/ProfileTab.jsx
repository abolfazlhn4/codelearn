import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { User, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ProfileTab = () => {
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birth_date: "",
    sex: "",
    phone_number: "",
    avatar: null,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [verifyData, setVerifyData] = useState({
    national_id: "",
    card_number: "",
    shaba_number: "",
    resume: "",
  });
  const [idImageType, setIdImageType] = useState("national_card");
  const [idImageFile, setIdImageFile] = useState(null);
  const [verifyStatus, setVerifyStatus] = useState(null); // 'P' (Pending), 'A' (Approved), 'R' (Rejected), یا null

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [submittingVerify, setSubmittingVerify] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await api.get("/api/v1/users/me/profile/");
        const pData = profileRes.data;
        setProfileData({
          first_name: pData.first_name || "",
          last_name: pData.last_name || "",
          email: pData.email || "",
          birth_date: pData.birth_date || "",
          sex: pData.sex || "",
          phone_number: pData.phone_number || "",
          avatar: pData.avatar || null,
        });
        setAvatarPreview(pData.avatar);

        const verifyRes = await api.get("/api/v1/users/me/profile/verify/");
        if (verifyRes.data?.results?.length > 0) {
          const latestVerify = verifyRes.data.results[0];
          setVerifyStatus(latestVerify.status); // 'A', 'P', 'R'
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyChange = (e) => {
    const { name, value } = e.target;
    setVerifyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("لطفاً فقط تصاویر با فرمت JPG یا PNG انتخاب کنید.");
        e.target.value = "";
        return;
      }
      if (file.size > 500 * 1024) {
        alert("حجم تصویر نباید بیشتر از ۵۰۰ کیلوبایت باشد.");
        e.target.value = "";
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleIdImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("حجم تصویر مدرک نباید بیشتر از 1 مگابایت باشد.");
        e.target.value = "";
        return;
      }
      setIdImageFile(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const formData = new FormData();
    formData.append("first_name", profileData.first_name);
    formData.append("last_name", profileData.last_name);
    formData.append("email", profileData.email);
    if (profileData.birth_date)
      formData.append("birth_date", profileData.birth_date);
    if (profileData.sex) formData.append("sex", profileData.sex);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const response = await api.patch("/api/v1/users/me/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("اطلاعات پروفایل با موفقیت بروزرسانی شد.");
      setAvatarPreview(response.data.avatar);
      setAvatarFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("خطا در بروزرسانی اطلاعات.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!idImageFile) {
      alert("لطفاً تصویر مدرک هویتی خود را آپلود کنید.");
      return;
    }

    setSubmittingVerify(true);
    const formData = new FormData();

    // فقط فایل مدرک و رزومه به بک‌اند ارسال می‌شود
    formData.append(idImageType, idImageFile);
    if (verifyData.resume) {
      formData.append("resume", verifyData.resume);
    }

    try {
      await api.post("/api/v1/users/me/profile/verify/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("اطلاعات جهت تایید حساب با موفقیت ارسال شد.");
      setVerifyStatus("P");
    } catch (error) {
      console.error("Failed to submit verification:", error);
      alert("خطا در ارسال اطلاعات تایید حساب.");
    } finally {
      setSubmittingVerify(false);
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
    <div className="space-y-10 pb-8">
      {/* نوتیفیکیشن وضعیت تایید حساب */}
      {verifyStatus === "A" && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-emerald-700">
          <CheckCircle className="w-6 h-6" />
          <p className="font-medium">
            حساب کاربری شما با موفقیت تایید شده است و شما مدرس رسمی هستید.
          </p>
        </div>
      )}
      {verifyStatus === "P" && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-700">
          <Clock className="w-6 h-6" />
          <p className="font-medium">
            اطلاعات شما با موفقیت ارسال شده و در انتظار تایید ادمین می‌باشد.
          </p>
        </div>
      )}
      {verifyStatus === "R" && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium">
            درخواست تایید حساب شما رد شده است. لطفاً اطلاعات خود را مجدداً بررسی
            و ارسال نمایید.
          </p>
        </div>
      )}

      {/* بخش 1: اطلاعات پایه پروفایل */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
          اطلاعات کاربری
        </h2>
        <form onSubmit={handleProfileUpdate} className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
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
                accept=".png, .jpg, .jpeg"
                onChange={handleAvatarChange}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Upload className="w-4 h-4" /> تغییر آواتار
              </button>
              <p className="text-xs text-gray-500 mt-2">
                تصاویر با فرمت JPG, PNG (حداکثر 500KB)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">نام</label>
              <input
                type="text"
                name="first_name"
                value={profileData.first_name}
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors"
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
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">ایمیل</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                dir="ltr"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors text-left"
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
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">جنسیت</label>
              <select
                name="sex"
                value={profileData.sex}
                onChange={handleProfileChange}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors appearance-none"
              >
                <option value="">انتخاب کنید...</option>
                <option value="M">مرد</option>
                <option value="F">زن</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={savingProfile}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl transition-colors w-full md:w-auto"
            >
              {savingProfile ? "در حال ذخیره..." : "ثبت اطلاعات پایه"}
            </button>
          </div>
        </form>
      </div>

      {/* بخش 2: تایید هویت مدرس */}
      <div className="pt-6 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">
          تایید هویت و اطلاعات مالی
        </h2>
        <form onSubmit={handleVerifySubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">
                کد ملی
              </label>
              <input
                type="text"
                name="national_id"
                value={verifyData.national_id}
                onChange={handleVerifyChange}
                disabled={verifyStatus === "A" || verifyStatus === "P"}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-white disabled:opacity-60"
                placeholder="مثال: 0123456789"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">
                شماره کارت بانکی (به نام خودتان)
              </label>
              <input
                type="text"
                name="card_number"
                value={verifyData.card_number}
                onChange={handleVerifyChange}
                disabled={verifyStatus === "A" || verifyStatus === "P"}
                dir="ltr"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-white disabled:opacity-60 text-left"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2 font-medium">
                شماره شبا
              </label>
              <input
                type="text"
                name="shaba_number"
                value={verifyData.shaba_number}
                onChange={handleVerifyChange}
                disabled={verifyStatus === "A" || verifyStatus === "P"}
                dir="ltr"
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-white disabled:opacity-60 text-left"
                placeholder="IR000000000000000000000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2 font-medium">
                رزومه یا سوابق کاری
              </label>
              <textarea
                name="resume"
                rows="4"
                value={verifyData.resume}
                onChange={handleVerifyChange}
                disabled={verifyStatus === "A" || verifyStatus === "P"}
                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-white disabled:opacity-60"
                placeholder="لطفا سوابق کاری و مهارت‌های خود را اینجا بنویسید..."
              ></textarea>
            </div>

            <div className="md:col-span-2 border-t border-gray-200 pt-6 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  نوع مدرک هویتی
                </label>
                <select
                  value={idImageType}
                  onChange={(e) => setIdImageType(e.target.value)}
                  disabled={verifyStatus === "A" || verifyStatus === "P"}
                  className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-indigo-500 bg-white disabled:opacity-60"
                >
                  <option value="national_card">کارت ملی</option>
                  <option value="identity_card">شناسنامه</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  آپلود تصویر مدرک (حداکثر 1MB)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdImageChange}
                  disabled={verifyStatus === "A" || verifyStatus === "P"}
                  className="w-full p-2 border border-gray-200 bg-white rounded-xl text-sm disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={
                submittingVerify || verifyStatus === "A" || verifyStatus === "P"
              }
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors w-full md:w-auto"
            >
              {submittingVerify ? "در حال ارسال..." : "ارسال جهت تایید حساب"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
