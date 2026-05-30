import React, { useState, useEffect } from "react";
import { courseFeedbackData } from "../data/mockComments";

const CommentsSection = ({ courseId, isPurchased, isLoggedIn }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // استیت‌های مربوط به صفحه‌بندی (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5; // نمایش حداکثر ۵ کامنت در هر صفحه

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const currentUserName = currentUser?.name || "کاربر سایت";

  useEffect(() => {
    const initialData = courseFeedbackData[courseId] || [];
    setComments(initialData);
    setCurrentPage(1); // با تغییر دوره، صفحه‌بندی به صفحه اول بازمی‌گردد
  }, [courseId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const userPurchasedList = currentUser?.purchasedCourses || [];
    const isUserReallyStudent = userPurchasedList.includes(Number(courseId)) || isPurchased;

    const newItem = {
      id: Date.now(),
      courseId: Number(courseId),
      userName: currentUserName,
      role: isUserReallyStudent ? "student" : "guest",
      text: newComment,
      rating: Number(rating),
      status: "pending",
      createdAt: new Date().toLocaleDateString("fa-IR"),
      replies: [],
    };

    setComments((prev) => [newItem, ...prev]); // کامنت جدید را به ابتدای لیست می‌آوریم
    setNewComment("");
    setRating(5);
    setCurrentPage(1); // هدایت کاربر به صفحه اول برای دیدن کامنت در انتظار تایید خود

    setSuccessMessage("دیدگاه و امتیاز شما ثبت شد و پس از تایید مدیر نمایش داده می‌شود.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleReply = (commentId) => {
    if (!replyText.trim()) return;

    const updated = comments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          replies: [
            ...(item.replies || []),
            {
              id: Date.now(),
              userName: currentUserName,
              role: currentUser?.role || (isPurchased ? "student" : "guest"),
              text: replyText,
              createdAt: new Date().toLocaleDateString("fa-IR"),
            },
          ],
        };
      }
      return item;
    });

    setComments(updated);
    setReplyText("");
    setReplyingTo(null);
  };

  // ۱. فیلتر کردن کامنت‌های قابل نمایش
  const visibleComments = comments.filter(
    (comment) =>
      comment.status === "approved" ||
      (comment.userName === currentUserName && comment.status === "pending")
  );

  // ۲. محاسبه اندیس‌ها برای صفحه‌بندی (Pagination Logic)
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = visibleComments.slice(indexOfFirstComment, indexOfLastComment);

  // ۳. محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(visibleComments.length / commentsPerPage);

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-right" dir="rtl">
      <h2 className="text-2xl font-black mb-6 text-gray-800 border-b pb-4">
        نظرات و امتیازات کاربران
      </h2>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm font-medium">
          {successMessage}
        </div>
      )}

      {/* فرم ثبت نظر */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-10 bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="تجربه یا سوال خود درباره این دوره را بنویسید..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 outline-none focus:border-[#3b3ab5] text-sm leading-7 resize-none shadow-inner"
            rows="4"
          />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 border-t border-gray-200/60 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">امتیاز شما به دوره:</span>
              <div className="flex flex-row-reverse gap-1">
                {[5, 4, 3, 2, 1].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    onMouseEnter={() => setHoverRating(num)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl transition-all duration-150 transform hover:scale-120 outline-none"
                  >
                    <span
                      className={`transition-colors ${
                        (hoverRating || rating) >= num ? "text-amber-400 font-bold" : "text-gray-300"
                      }`}
                    >
                      {(hoverRating || rating) >= num ? "★" : "☆"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#3b3ab5] text-white px-7 py-2.5 rounded-xl hover:bg-opacity-95 transition-all font-bold text-sm shadow-sm"
            >
              ثبت نظر و امتیاز
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-amber-50 text-amber-800 border border-amber-100 p-4 rounded-xl mb-8 text-sm font-medium">
          برای ثبت نظر یا امتیاز ابتدا باید وارد حساب کاربری خود شوید.
        </div>
      )}

      {/* لیست کامنت‌های صفحه فعلی */}
      <div className="space-y-6">
        {currentComments.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-sm">
            هنوز دیدگاهی برای این دوره ثبت نشده است.
          </div>
        ) : (
          currentComments.map((comment) => (
            <div key={comment.id} className="border border-gray-100 rounded-2xl p-5 bg-white relative shadow-sm transition-all hover:shadow-md">
              {comment.status === "pending" && (
                <span className="absolute top-4 left-4 text-[10px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">
                  در انتظار تایید مدیر
                </span>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800 text-sm">
                    {comment.userName}
                  </span>

                  {comment.role === "student" && (
                    <span className="bg-green-50 text-green-600 border border-green-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      دانشجوی دوره
                    </span>
                  )}

                  {comment.role === "guest" && (
                    <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      کاربر مهمان
                    </span>
                  )}

                  {comment.role === "instructor" && (
                    <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      مدرس دوره
                    </span>
                  )}

                  {comment.role === "admin" && (
                    <span className="bg-red-50 text-red-600 border border-red-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      مدیر سایت
                    </span>
                  )}

                  {comment.rating && (
                    <span className="bg-amber-50 text-amber-600 border border-amber-200 text-xs px-2 py-0.5 rounded-lg font-bold flex items-center gap-0.5">
                      <span className="text-amber-500">★</span> {comment.rating}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{comment.createdAt || comment.date}</span>
              </div>

              <p className="text-gray-600 text-sm leading-8 text-justify pl-2">{comment.text}</p>

              {isLoggedIn && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-xs text-[#3b3ab5] font-bold hover:underline"
                  >
                    {replyingTo === comment.id ? "لغو پاسخ" : "پاسخ به این نظر"}
                  </button>
                </div>
              )}

              {replyingTo === comment.id && (
                <div className="mt-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 outline-none focus:border-[#3b3ab5] text-sm resize-none"
                    rows="2"
                    placeholder="پاسخ خود را بنویسید..."
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="bg-emerald-600 text-white text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-opacity-90"
                    >
                      ارسال پاسخ
                    </button>
                  </div>
                </div>
              )}

              {/* پاسخ‌ها */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-5 space-y-3 border-r-2 border-gray-200 pr-4 mr-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50/70 rounded-xl p-4 border border-gray-100">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800 text-xs">
                            {reply.userName}
                          </span>
                          {reply.role === "instructor" && (
                            <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[10px] px-2 py-0.5 rounded-full">
                              مدرس دوره
                            </span>
                          )}
                          {reply.role === "student" && (
                            <span className="bg-green-50 text-green-600 border border-green-100 text-[10px] px-2 py-0.5 rounded-full">
                              دانشجوی دوره
                            </span>
                          )}
                          {reply.role === "guest" && (
                            <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] px-2 py-0.5 rounded-full">
                              کاربر مهمان
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {reply.createdAt || reply.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-7 text-justify">
                        {reply.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* المان‌های کنترل صفحه‌بندی (Pagination UI) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 border-t border-gray-100 pt-6" dir="ltr">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
          >
            قبلی
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                currentPage === pageNumber
                  ? "bg-[#3b3ab5] text-white shadow-sm shadow-[#3b3ab5]/30"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {pageNumber.toLocaleString("fa-IR")}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;