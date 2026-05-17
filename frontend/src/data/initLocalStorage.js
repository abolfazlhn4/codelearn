import { courseFeedbackData } from "./mockComments"; // مسیر را در صورت نیاز اصلاح کنید

export const initializeLocalStorage = () => {
  // ۱. شبیه‌سازی کاربر لاگین شده (اگر از قبل وجود نداشت)
  if (!localStorage.getItem("currentUser")) {
    const mockUser = {
      name: "سینا رضایی",
      role: "student", // نقش: دانشجو
      // فرض می‌کنیم این کاربر دوره‌های Node (1) و React (9) را خریده است
      purchasedCourses: ["1", "9"],
    };
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
  }

  // ۲. تزریق کامنت‌ها و امتیازات تستی به لوکال استوریج (اگر از قبل وجود نداشتند)
  Object.keys(courseFeedbackData).forEach((courseId) => {
    const courseData = courseFeedbackData[courseId];

    // ذخیره کامنت‌ها
    if (!localStorage.getItem(`course_${courseId}_comments`)) {
      localStorage.setItem(`course_${courseId}_comments`, JSON.stringify(courseData.comments));
    }

    // ذخیره امتیازات
    if (!localStorage.getItem(`course_${courseId}_reviews`)) {
      localStorage.setItem(`course_${courseId}_reviews`, JSON.stringify(courseData.reviews));
    }
  });
};
