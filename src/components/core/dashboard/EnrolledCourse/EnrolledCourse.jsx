import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { motion, AnimatePresence } from "framer-motion";

import { HiOutlineBookOpen } from "react-icons/hi";
import { FiBook, FiClock, FiChevronRight } from "react-icons/fi";

import { getEnrolledCourses } from "../../../../services/operations/profileAPI";

export function EnrolledCourse() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [hoveredCourse, setHoveredCourse] = useState(null)

  const tableHeader = [
    "Course Name",
    "Duration",
    "Progress"
  ]

  useEffect(() => {
    setLoading(true)

    const fetchEnrolledCourses = async () => {
      const result = await getEnrolledCourses(token)

      if (result) {
        setEnrolledCourses(result)
      }

      setLoading(false)
    }

    fetchEnrolledCourses()
  }, [token])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  }

  // Loader Screen
  if (loading) {
    return (
      <motion.div
        className="w-full h-137.5 grid place-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative">
          <motion.div
            className="h-16 w-16 rounded-full border-4 border-yellow-100/30"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-t-4 border-yellow-50"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen w-full max-w-250 mx-auto px-4 pb-10 pt-10 md:pt-20 lg:pt-20 flex flex-col gap-6 sm:gap-10 text-richblack-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center gap-3"
        variants={itemVariants}
      >
        <HiOutlineBookOpen className="text-yellow-50 text-3xl" />
        <h2 className="font-bold text-3xl bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
          Enrolled Courses
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {enrolledCourses?.length > 0 ? (
          <motion.div
            key="courses"
            variants={itemVariants}
            className="w-full"
          >
            {/* Desktop Table View */}
            <motion.div
              className="hidden md:block rounded-xl overflow-hidden border border-richblack-600 shadow-md bg-linear-to-b from-richblack-800 to-richblack-900"
            >
              <div className="bg-linear-to-r from-richblack-700 to-richblack-800 px-5 py-4 grid grid-cols-5 place-items-center border-b border-richblack-600">
                {tableHeader?.map((ele, idx) => (
                  <motion.p
                    key={idx}
                    className={`text-sm lg:text-base font-bold text-yellow-50 ${ele === "Course Name" ? "col-span-3 justify-self-start" : ""}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {ele}
                  </motion.p>
                ))}
              </div>

              <div>
                {enrolledCourses?.map((course, i) => (
                  <motion.div
                    key={i}
                    className={`p-5 grid grid-cols-5 place-items-center hover:bg-richblack-700/30 transition-colors duration-300
                                            ${i === (enrolledCourses.length) - 1 ? "" : "border-b border-b-richblack-600"}`}
                    variants={cardVariants}
                    whileHover={{ backgroundColor: "rgba(71, 85, 105, 0.2)" }}
                    onHoverStart={() => setHoveredCourse(course._id)}
                    onHoverEnd={() => setHoveredCourse(null)}
                  >
                    <motion.div
                      onClick={() => {
                        navigate(
                          `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                        )
                      }}
                      className="flex gap-4 col-span-3 cursor-pointer group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-full max-w-50 relative overflow-hidden rounded-md border border-richblack-600 shadow-sm">
                        <motion.img
                          alt={course.courseName}
                          src={course?.thumbnail}
                          loading="lazy"
                          className=" aspect-video max-h-50 object-cover"
                          animate={hoveredCourse === course._id ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.4 }}
                        />

                        <motion.div
                          className="absolute inset-0 bg-linear-to-t from-richblack-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <span className="text-xs text-yellow-50 font-medium px-2 py-1 rounded-full bg-richblack-900/50 backdrop-blur-sm flex items-center gap-1">
                            View <FiChevronRight />
                          </span>
                        </motion.div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <motion.p
                          className="font-bold text-sm lg:text-base"
                          animate={hoveredCourse === course._id ?
                            { color: "rgba(255, 214, 10, 1)" } :
                            { color: "rgba(245, 245, 245, 1)" }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          {course.courseName}
                        </motion.p>
                        <p className="text-xs lg:text-sm text-richblack-400 line-clamp-3">{course.courseDescription}</p>
                      </div>
                    </motion.div>

                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="text-yellow-100" />
                      <p>{course.courseDuration || `--:--`}</p>
                    </div>

                    <div className="w-full max-w-35 flex flex-col gap-2">
                      <p className="text-sm text-center">
                        {course.progressPercentage || 0}%
                      </p>

                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        bgColor="#FFD60A"
                        baseBgColor="#2C333F"
                        borderRadius="4px"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Card View */}
            <motion.div className="md:hidden space-y-4">
              {enrolledCourses?.map((course, i) => (
                <motion.div
                  key={i}
                  className="bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl overflow-hidden border border-richblack-700 shadow-md"
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-video overflow-hidden relative">
                    <motion.img
                      loading="lazy"
                      src={course?.thumbnail}
                      alt={course.courseName}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-richblack-900 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs bg-richblack-900/70 text-yellow-50 px-3 py-1 rounded-full backdrop-blur-sm">
                        <FiBook />
                        <span>Continue Learning</span>
                      </div>
                      <div className="bg-richblack-900/70 text-yellow-50 px-3 py-1 rounded-full backdrop-blur-sm text-xs flex items-center gap-1">
                        <FiClock />
                        <span>{course.totalDuration || "--:--"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-richblack-5">{course.courseName}</h3>
                    <p className="text-sm text-richblack-300 line-clamp-2">{course.courseDescription}</p>

                    {/* Progress */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span>Your Progress</span>
                        <span className="text-yellow-50 font-medium">{course.progressPercentage || 0}%</span>
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        bgColor="#FFD60A"
                        baseBgColor="#2C333F"
                        borderRadius="4px"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="no-courses"
              className="flex flex-col items-center justify-center gap-4 py-16 px-4 bg-linear-to-b from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="w-20 h-20 rounded-full bg-richblack-800 border-2 border-richblack-600 flex items-center justify-center"
            >
              <HiOutlineBookOpen className="text-4xl text-yellow-50" />
            </motion.div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-richblack-5 mb-2">No Courses Found</h3>
              <p className="text-richblack-300 max-w-md">
                Explore our course catalog and enroll in a course to get started on your learning journey.
              </p>
            </div>

            <motion.button
              onClick={() => navigate("/catalog")}
              className="mt-4 px-6 py-3 bg-yellow-50 text-richblack-900 rounded-md font-medium hover:bg-yellow-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Courses
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}