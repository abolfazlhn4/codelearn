import React, { useState, useEffect } from "react";

const CommentsSection = ({ courseId, isPurchased, isLoggedIn }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    // تبدیل courseId به عدد برای جلوگیری از مشکلات عدم تطابق نوع داده
    const filtered = storedComments.filter(
      (item) => Number(item.courseId) === Number(courseId)
    );
    setComments(filtered);
  }, [courseId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newItem = {
      id: Date.now(),
      courseId: Number(courseId),
      userName: currentUser?.name || "کاربر",
      role: currentUser?.role || "student",
      text: newComment,
      date: new Date().toLocaleDateString("fa-IR"),
      isPurchased: isPurchased, // خریدار بودن را ذخیره می‌کنیم
      replies: [],
    };

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];
    allComments.push(newItem);
    localStorage.setItem("comments", JSON.stringify(allComments));

    setComments((prev) => [...prev, newItem]);
    setNewComment("");
  };

  const handleReply = (commentId) => {
    if (!replyText.trim()) return;

    // بررسی اینکه آیا کسی که دارد ریپلای می‌کند خریدار این دوره هست یا نه
    const isReplyerPurchased = currentUser?.purchasedCourses?.includes(Number(courseId)) || false;

    const allComments = JSON.parse(localStorage.getItem("comments")) || [];

    const updated = allComments.map((item) => {
      if (item.id === commentId) {
        return {
          ...item,
          replies: [
            ...(item.replies || []),
            {
              id: Date.now(),
              userName: currentUser?.name || "کاربر",
              role: currentUser?.role || "student",
              isPurchased: isReplyerPurchased, // ذخیره وضعیت خرید پاسخ‌دهنده
              text: replyText,
              date: new Date().toLocaleDateString("fa-IR"),
            },
          ],
        };
      }
      return item;
    });

    localStorage.setItem("comments", JSON.stringify(updated));
    setComments(updated.filter((c) => Number(c.courseId) === Number(courseId)));

    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-2xl font-black mb-8 text-gray-800">
        نظرات دانشجویان
      </h2>

      {/* فرم ارسال کامنت اصلی */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="نظر خود را بنویسید..."
            className="w-full border border-gray-200 rounded-2xl p-4 outline-none focus:border-[#3b3ab5]"
            rows="4"
          />
          <button
            type="submit"
            className="mt-4 bg-[#3b3ab5] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
          >
            ثبت نظر
          </button>
        </form>
      ) : (
        <div className="bg-orange-50 text-orange-700 p-4 rounded-2xl mb-8">
          برای ثبت نظر باید ابتدا وارد حساب کاربری خود شوید.
        </div>
      )}

      {/* لیست نظرات */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            هنوز نظری ثبت نشده است.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800">
                    {comment.userName}
                  </span>

                  {comment.role === "admin" && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      مدیر سایت
                    </span>
                  )}
                  {comment.isPurchased && comment.role !== "admin" && (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                      خریدار دوره
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400">{comment.date}</span>
              </div>

              <p className="text-gray-700 leading-8">{comment.text}</p>

              {/* دکمه پاسخ فقط برای افراد لاگین شده */}
              {isLoggedIn && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="mt-4 text-sm text-[#3b3ab5] font-medium"
                >
                  {replyingTo === comment.id ? "لغو پاسخ" : "پاسخ"}
                </button>
              )}

              {/* فرم پاسخ */}
              {replyingTo === comment.id && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-3 outline-none"
                    rows="3"
                    placeholder="پاسخ خود را بنویسید..."
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="mt-3 bg-green-600 text-white px-5 py-2 rounded-xl"
                  >
                    ارسال پاسخ
                  </button>
                </div>
              )}

              {/* نمایش پاسخ‌ها */}
              {comment.replies?.length > 0 && (
                <div className="mt-5 space-y-3 border-r-2 border-gray-100 pr-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {reply.userName}
                          </span>
                          {reply.role === "admin" && (
                            <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full">
                              مدیر سایت
                            </span>
                          )}
                          {reply.isPurchased && reply.role !== "admin" && (
                            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">
                              خریدار دوره
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">
                          {reply.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-7">
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
