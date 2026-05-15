import React, { useState, useEffect } from "react";

const ReviewsSection = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // فقط اگر کاربر لاگین باشد و آیدی این دوره در لیست خریدهایش باشد
  const hasPurchased = currentUser && currentUser.purchasedCourses && currentUser.purchasedCourses.includes(Number(courseId));

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const courseReviews = allReviews.filter((r) => Number(r.courseId) === Number(courseId));
    setReviews(courseReviews);
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasPurchased || !reviewText.trim()) return;

    const newReview = {
      id: Date.now().toString(),
      courseId: Number(courseId),
      userId: currentUser.id,
      userName: currentUser.name,
      rating: Number(rating),
      text: reviewText,
      date: new Date().toLocaleDateString("fa-IR"),
    };

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    allReviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(allReviews));

    setReviews([...reviews, newReview]);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h3 className="text-xl font-bold mb-6 text-gray-800">نظرات و امتیازات دانشجویان</h3>

      {/* فرم ثبت امتیاز - فقط برای خریداران */}
      {hasPurchased ? (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">امتیاز شما:</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 w-32"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} ستاره
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="تجربه خود را از این دوره بنویسید..."
            rows="3"
          />
          <button type="submit" className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            ثبت امتیاز
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
          {currentUser
            ? "فقط دانشجویانی که این دوره را خریداری کرده‌اند می‌توانند به آن امتیاز دهند."
            : "برای ثبت امتیاز ابتدا باید وارد حساب کاربری خود شوید."}
        </div>
      )}

      {/* لیست امتیازات ثبت شده */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">{review.userName}</span>
              <span className="text-yellow-400 font-bold tracking-widest">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{review.text}</p>
            <span className="text-xs text-gray-400 mt-2 block">{review.date}</span>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-500 text-center py-4">هنوز امتیازی برای این دوره ثبت نشده است.</p>}
      </div>
    </div>
  );
};

export default ReviewsSection;
