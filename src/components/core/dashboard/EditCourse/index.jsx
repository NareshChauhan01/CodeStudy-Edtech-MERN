import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoSchoolOutline } from "react-icons/io5";
import { FaEdit, FaArrowLeft } from "react-icons/fa";

import { RenderSteps } from "../AddCourse/RederSteps";
import { getCourseDetails } from "../../../../services/operations/courseAPI";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true)
      const result = await getCourseDetails({ courseId }, token)

      if (result) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result))
      }

      setLoading(false)
    }

    fetchCourseDetails()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full max-w-225 mx-auto pt-32 pb-10 flex flex-col gap-8 text-richblack-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-2"
        variants={itemVariants}
      >
        <Link
          to="/dashboard/my-courses"
          className="flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 w-fit"
        >
          <FaArrowLeft />
          <span>Back to courses</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-50/10 flex items-center justify-center text-yellow-50 text-xl">
            <FaEdit />
          </div>
          <h1 className="text-3xl font-bold">Edit Course</h1>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="w-full"
        variants={itemVariants}
      >
        {loading ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-t-4 border-yellow-50 animate-spin"></div>
              <div className="absolute inset-3 rounded-full bg-richblack-800 flex items-center justify-center">
                <IoSchoolOutline className="text-2xl text-yellow-50" />
              </div>
            </div>
            <p className="text-lg text-richblack-200 animate-pulse">Loading course details...</p>
          </motion.div>
        ) : course ? (
          <motion.div
            className="w-full  mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-richblack-800 border border-richblack-700 rounded-xl overflow-hidden shadow-md">
              {/* Course info header */}
                <div className="p-6 md:p-8 border-b border-richblack-700 bg-linear-to-r from-richblack-700 to-richblack-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-50/10 flex items-center justify-center">
                    <IoSchoolOutline className="text-xl text-yellow-50" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-richblack-5">
                    {course.courseName || "Your Course"}
                  </h3>
                </div>
                <p className="text-sm text-richblack-300 ml-12">
                  Make changes to your course and update the information
                </p>
              </div>

              {/* Steps content */}
              <div className="p-6 md:p-8">
                <RenderSteps />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full md:w-[80%] lg:w-[60%] mx-auto"
            variants={itemVariants}
          >
            <div className="bg-richblack-800 border border-richblack-700 rounded-xl p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-600/10 flex items-center justify-center text-pink-200 text-3xl mb-4">
                <IoSchoolOutline />
              </div>
              <h2 className="text-2xl font-bold mb-3">Course Not Found</h2>
              <p className="text-richblack-300 mb-6">
                We couldn't find the course you're looking for. It may have been removed or you don't have access to it.
              </p>
              <Link to="/dashboard/my-courses">
                <motion.button
                  className="px-6 py-3 bg-yellow-50 text-richblack-900 rounded-lg font-medium hover:bg-yellow-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Return to My Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}