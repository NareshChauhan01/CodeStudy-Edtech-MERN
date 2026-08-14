import React from "react";
import { FaQuoteLeft, FaRegThumbsUp } from "react-icons/fa";

import defaultUserImage from "../../../assests/images/github-mark-white.png";

// Individual review card component
export function CourseReviewCard({ reviewData }) {
  const { review, user } = reviewData;

  return (
    <div
      className="flex flex-col h-full cursor-pointer bg-richblack-800 rounded-xl overflow-hidden border border-richblack-700 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Review Content */}
      <div className="h-37.5 flex flex-col gap-5 p-5 italic bg-linear-to-b from-richblack-800 to-richblack-700">
        <FaQuoteLeft className="text-3xl text-yellow-50/15" />
        <p>{review || "This course helped me enhance my skills and knowledge."}</p>
      </div>

      {/* Footer - User Info and Date */}
      <div className="mt-auto p-5 pt-3 border-t border-richblack-500 bg-richblack-700/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              loading="lazy"
              alt={`${user?.firstName || 'User'}'s profile`}
              src={user?.image || defaultUserImage}
              className="aspect-square w-10 object-cover rounded-full border border-richblack-300"
            />

            <p className="font-medium text-richblack-5">
              {user?.firstName} {user?.lastName || "Deepak 🫰"}
            </p>
          </div>

          <button
            className="text-xs flex items-center gap-1 text-richblack-300 hover:text-yellow-50 transition-colors"
            aria-label="Mark review as helpful"
          >
            <FaRegThumbsUp />
            <span>Helpful</span>
          </button>
        </div>
      </div>
    </div>
  );
}