import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { BsPlay } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FaRegClock, FaUserGraduate } from "react-icons/fa";

import { RatingStars } from "../../common/RatingStars";

export function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course?._id}`}>
      <motion.div
        className="bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl overflow-hidden h-full border border-richblack-700 shadow-sm hover:shadow-xl transition-all duration-300"
        whileHover={{
          y: -5,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Course Image with Overlay */}
        <div className="relative aspect-video overflow-hidden group">
          <img
            loading="lazy"
            alt={course?.courseName || "Course thumbnail"}
            src={course?.thumbnail}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-richblack-900 opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

          {/* Play Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-yellow-50 p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <BsPlay className="text-richblack-900 text-2xl" />
            </div>
          </div>

          {/* Students Enrolled Badge */}
          {course?.studentEnrolled?.length > 0 && (
            <div className="absolute bottom-2 left-2 bg-richblack-900 bg-opacity-80 text-xs text-richblack-50 py-1 px-2 rounded-full flex items-center gap-1">
              <FaUserGraduate className="text-yellow-50" />
              <span>{course?.studentEnrolled?.length} students</span>
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            {/* Course Title */}
            <h3 className="text-lg font-semibold text-richblack-5 line-clamp-2">
              {course?.courseName}
            </h3>

            {/* Course Description */}
            <h3 className="text-sm text-richblack-100 line-clamp-2">
              {course?.courseDescription}
            </h3>
          </div>

          {/* Course Category and Duration */}
          <div className="flex items-center justify-between text-xs text-richblack-300 mt-1">
            {course?.category && (
              <div className="flex items-center gap-1 bg-richblack-700 py-1 px-2 rounded-full">
                <BiCategory className="text-yellow-50" />
                <span>{course?.category?.name || "Uncategorized"}</span>
              </div>
            )}

            {course?.courseDuration && (
              <div className="flex items-center gap-1 bg-richblack-700 py-1 px-2 rounded-full">
                <FaRegClock className="text-yellow-50" />
                <span>{course?.courseDuration || "5hr 35min"}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-richblack-700 via-richblack-600 to-richblack-700 my-2"></div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <RatingStars />
              <span className="text-xs text-richblack-300 ml-2">
                {course?.ratingAndReviews?.length > 0
                  ? `(${course?.ratingAndReviews?.length} ratings)`
                  : "(No ratings yet)"}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
              ₹{course?.price || 0}
            </div>

            {/* "View Details" button indicator */}
            <div className="text-xs font-medium text-yellow-50 bg-richblack-700 py-1 px-3 rounded-full hover:bg-yellow-50 hover:text-richblack-900 transition-all duration-200">
              View Details
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}