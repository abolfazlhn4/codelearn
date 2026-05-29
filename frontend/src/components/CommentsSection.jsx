import React, { useState, useEffect } from "react";
import { courseFeedbackData } from "../data/mockComments";

const CommentsSection = ({ courseId, isPurchased, isLoggedIn }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const currentUserName = currentUser?.name || "کاربر سایت";

  useEffect(() => {
    const initialData = courseFeedbackData[courseId] || [];
    setComments(initialData);
  }, [courseId]);

  // ثبت کامنت اصلی و ذخیره نقش کاربر (دانشجو یا مهمان)
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newItem = {
      id: Date.now(),
      courseId: Number(courseId),
      userName: currentUserName,
      role: isPurchased ? "student" : "guest", // تعیین نقش بر اساس وضعیت خرید
      text: newComment,
      rating: isPurchased ? Number(rating) : null, // ستاره فقط برای خریدار ثبت می‌شود
      status: "pending", // کامنت جدید به وضعیت در انتظار تایید می‌رود
      createdAt: new Date().toLocaleDateString("fa-IR"),
      replies: [],
    };

    setComments((prev) => [...prev, newItem]);
    setNewComment("");
    setRating(5);

    setSuccessMessage("دیدگاه و امتیاز شما ثبت شد و پس از تایید مدیر نمایش داده می‌شود.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // ثبت پاسخ (Reply)
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

  // فیلتر نمایش: کامنت‌های تایید شده + کامنت در انتظار تایید خود کاربر جاری
  const visibleComments = comments.filter(
    (comment) =>
      comment.status === "approved" ||
      (comment.userName === currentUserName && comment.status === "pending")
  );

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 text-right" dir="rtl">
      <h2 className="text-2xl font-black mb-6 text-gray-800 border-b pb-4">
        نظرات و امتیازات دانشجویان
      </h2>

      {/* نمایش پیام موفقیت موقت */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm">
          {successMessage}
        </div>
      )}

      {/* فرم ارسال کامنت اصلی */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-10 bg-gray-50 p-4 rounded-2xl border border-gray-100">

          {/* بخش امتیاز ستاره‌ای اختصاصی خریداران دوره */}
          {isPurchased && (
            <div className="flex items-center gap-2 mb-4 bg-white p-3 rounded-xl border border-gray-200 w-fit">
              <span className="text-sm font-bold text-gray-700">امتیاز شما به دوره:</span>
              <div className="flex flex-row-reverse gap-1">
                {[5, 4, 3, 2, 1].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="text-gray-300 hover:text-amber-400 transition-colors text-xl"
                  >
                    {rating >= num ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="تجربه یا سوال خود درباره این دوره را بنویسید..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 outline-none focus:border-[#3b3ab5] text-sm leading-7 resize-none"
            rows="4"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">
              ثبت نظر به عنوان: <span className="font-bold text-gray-600">{isPurchased ? "دانشجوی دوره" : "کاربر مهمان"}</span>
            </span>
            <button
              type="submit"
              className="bg-[#3b3ab5] text-white px-6 py-2.5 rounded-xl hover:opacity-90 transition font-medium text-sm"
            >
              ثبت نظر
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-amber-50 text-amber-800 border border-amber-100 p-4 rounded-xl mb-8 text-sm">
          برای ثبت نظر یا امتیاز ابتدا باید وارد حساب کاربری خود شوید.
        </div>
      )}

      {/* لیست نظرات */}
      <div className="space-y-6">
        {visibleComments.length === 0 ? (
          <div className="text-gray-400 text-center py-8 text-sm">
            هنوز دیدگاهی برای این دوره ثبت نشده است.
          </div>
        ) : (
          visibleComments.map((comment) => (
            <div key={comment.id} className="border border-gray-100 rounded-2xl p-5 bg-white relative">
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

                  {/* برچسب اختصاصی دانشجوی دوره (خریدار) */}
                  {comment.role === "student" && (
                    <span className="bg-green-50 text-green-600 border border-green-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                      دانشجوی دوره
                    </span>
                  )}

                  {/* برچسب اختصاصی کاربر مهمان */}
                  {comment.role === "guest" && (
                    <span className="bg-gray-50 text-gray-500 border border-gray-200 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
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
                    <span className="bg-amber-50 text-amber-700 border border-amber-100 text-xs px-2 py-0.5 rounded-lg font-bold">
                      ★ {comment.rating}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{comment.createdAt || comment.date}</span>
              </div>

              <p className="text-gray-600 text-sm leading-8 text-justify pl-2">{comment.text}</p>

              {/* دکمه پاسخ */}
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

              {/* فرم ثبت پاسخ */}
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

              {/* نمایش پاسخ‌ها (Replies) */}
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
    </div>
  );
};

export default CommentsSection;