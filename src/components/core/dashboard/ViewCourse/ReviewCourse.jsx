import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { FaStar, FaPaperPlane, FaTrashAlt } from "react-icons/fa";

import { createReview, deleteReview, getCourseReview } from "../../../../services/operations/rating&ReviewAPI";

export function ReviewCourse() {
  // Add these state variables
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewData, setReviewData] = useState(null);

  const { token } = useSelector((state) => state.auth)
  const { courseId } = useParams()

  // Add this useEffect to fetch reviews
  useEffect(() => {
    const fetchCourseReviews = async () => {
      setIsLoadingReviews(true);
      const result = await getCourseReview({ courseId }, token);

      if (result) {
        setReviewData(result);
        setRating(result?.rating || 0);
        setReviewText(result?.review || "");
      }

      setIsLoadingReviews(false);
    };

    if (courseId) {
      fetchCourseReviews();
    }
  }, [courseId, token]);

  // handle delete review
  const handleDeleteReview = async () => {
    const result = await deleteReview({
      courseId,
      reviewId: reviewData?._id
    }, token)

    if (result) {
      setReviewData(null);
      setRating(0);
      setReviewText("");
    }
  }

  // Add this function to handle review submission
  const handleSubmitReview = async () => {
    if (!rating) return;

    setSubmitting(true);
    try {
      const response = await createReview({
        courseId,
        rating,
        review: reviewText
      }, token);

      if (response) {
        // Update the reviews list
        setReviewData(response);
      }
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-5 border-b border-richblack-700 bg-gradient-to-r from-richblack-900 to-richblack-800">
        <div className="text-lg font-semibold text-white flex items-center gap-2">
          <FaStar className="text-yellow-50" />
          <p>Course Reviews</p>
        </div>
      </div>

      {isLoadingReviews ? (
        <div className="p-5 flex justify-center items-center h-32">
          <div className="w-8 h-8 border-2 border-t-yellow-50 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* Show existing review if it exists */}
          {reviewData ? (
            <motion.div
              key="existing-review"
              className="p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-richblack-50 font-medium">Your review</p>
                <motion.button
                  onClick={handleDeleteReview}
                  className="text-pink-300 hover:text-pink-100 flex items-center gap-1 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTrashAlt />
                  <span>Delete</span>
                </motion.button>
              </div>

              <div className="p-5 bg-gradient-to-br from-richblack-900/10 to-richblack-700 rounded-lg border border-richblack-700">
                {/* Rating display */}
                <div className="mb-4">
                  <p className="text-sm text-richblack-300 mb-1">Your rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${reviewData.rating >= star ? 'text-yellow-50' : 'text-richblack-500'}`}
                      >
                        <FaStar />
                      </span>
                    ))}

                    <span className="text-richblack-300 text-sm ml-2">
                      ({reviewData.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Review text display */}
                <div>
                  <p className="text-sm text-richblack-300 mb-1">Your feedback</p>
                  <p className="text-richblack-100 bg-richblack-700 p-3 rounded-md">
                    {reviewData?.review || "No written feedback provided."}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Review Form */
            <motion.div
              key="review-form"
              className="mb-6 p-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-richblack-50 font-medium mb-3">Share your experience</p>

              <div className="flex flex-col gap-4">
                {/* Star Rating Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-richblack-300">Rate this course</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-xl ${rating >= star ? 'text-yellow-50' : 'text-richblack-500'}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaStar />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Review Text Input */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-richblack-300">Your review</label>
                  <textarea
                    rows="3"
                    placeholder="What did you like or dislike about this course?"
                    className="w-full bg-richblack-700 text-richblack-50 rounded-lg border border-richblack-600 p-3 focus:outline-none focus:border-yellow-50 transition-all resize-none"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 items-center">
                  {/* Submit Button */}
                  <motion.button
                    type="button"
                    onClick={handleSubmitReview}
                    className="bg-yellow-50 text-richblack-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={!rating || submitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  )
}