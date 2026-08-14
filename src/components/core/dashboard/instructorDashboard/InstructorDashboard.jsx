import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { FaRupeeSign, FaLongArrowAltRight } from "react-icons/fa";
import { FiTrendingUp, FiUsers, FiGrid, FiClock, FiStar } from "react-icons/fi";

import { Coursechart } from "./CourseChart";
import { getInstructorDashboardData } from "../../../../services/operations/profileAPI";

export function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  // const [courses, setCourses] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [totalStudentEnrolled, setTotalStudentEnrolled] = useState(0)
  const [totalAmountgenerated, setTotalAmountgenerated] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [activeChartType, setActiveChartType] = useState('revenue')

  useEffect(() => {
    const fetchInstructorDashboard = async () => {
      setIsLoading(true);
      try {
        const instructorDashboard = await getInstructorDashboardData(token)
        // console.log(instructorDashboard)

        if (instructorDashboard) {
          let totalStudent = 0
          let totalAmount = 0

          for (const course of instructorDashboard) {
            totalStudent += course?.totalStudentEnrolled
            totalAmount += course?.totalAmountgenerated
          }

          setTotalStudentEnrolled(totalStudent)
          setTotalAmountgenerated(totalAmount)
          setDashboardData(instructorDashboard)
          // setCourses(instructorDashboard || []);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstructorDashboard()
  }, [token])

  const statisticData = [
    {
      title: "Total Courses",
      value: dashboardData?.length,
      icon: <FiGrid className="text-blue-400" />,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },

    {
      title: "Total Students",
      value: totalStudentEnrolled,
      icon: <FiUsers className="text-green-400" />,
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },

    {
      title: "Total Earnings",
      value: `₹ ${totalAmountgenerated}`,
      icon: <FaRupeeSign className="text-yellow-400" />,
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-[1000px] mx-auto py-20 px-4 flex flex-col gap-6 md:gap-8 text-richblack-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text mb-1">
          Instructor Dashboard
        </h1>
        <p className="text-richblack-300 text-sm">
          Manage your courses and track your performance
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-richblack-800 to-richblack-700 p-5 md:p-6 rounded-xl border border-richblack-700 shadow-lg"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-2 md:gap-1 lg:gap-1">
            <p className="text-xl font-semibold text-richblack-5">
              Welcome back, {user?.firstName}!
            </p>

            <p className="text-sm text-richblack-200">
              Here's what's happening with your courses today
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/dashboard/add-course"
              className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-yellow-50/10"
            >
              <FiClock /> Create New Course
            </NavLink>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {statisticData.map((item, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center gap-4`}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="w-12 h-12 rounded-lg bg-richblack-900/30 flex items-center justify-center text-xl">
                {item.icon}
              </div>

              <div>
                <p className="text-richblack-300 text-sm">{item.title}</p>
                <p className="text-xl font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={itemVariants}
      >
        {/* Chart Area */}
        <motion.div
          className="lg:col-span-2 bg-richblack-800 rounded-xl border border-richblack-700 shadow-lg p-5"
          whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <Coursechart
            dashboardData={dashboardData}
            chartType={activeChartType}
          />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bg-richblack-800 rounded-xl border border-richblack-700 shadow-lg p-5 overflow-hidden"
          whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <FiTrendingUp className="text-yellow-50 text-xl" />
            <h3 className="font-semibold text-lg">Performance</h3>
          </div>

          {isLoading ? (
            <div className="h-[320px] flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-yellow-50 border-richblack-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-richblack-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-richblack-200">Enrollment Rate</p>
                  <div className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    +{Math.floor(Math.random() * 10) + 1}%
                  </div>
                </div>
                <div className="h-2 bg-richblack-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-green-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(totalStudentEnrolled * 5, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>

              <div className="bg-richblack-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-richblack-200">Course Rating</p>
                  <div className="flex items-center text-yellow-50 text-xs gap-1">
                    <FiStar /> 4.8/5
                  </div>
                </div>
                <div className="h-2 bg-richblack-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300"
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-richblack-200 mb-3">Top Performing Course</h4>
                {dashboardData && dashboardData.length > 0 ? (
                  <motion.div
                    className="bg-richblack-700/30 border border-richblack-600 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={dashboardData[0]?.course?.thumbnail || "https://via.placeholder.com/300x150?text=Course+Thumbnail"}
                      alt="Top course"
                      loading="lazy"
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-3">
                      <h5 className="font-medium text-sm line-clamp-1">
                        {dashboardData[0]?.course?.courseName || "Course Name"}
                      </h5>
                      <div className="flex justify-between text-xs text-richblack-300 mt-1">
                        <span>{dashboardData[0]?.totalStudentEnrolled || 0} students</span>
                        <span>${dashboardData[0]?.totalAmountgenerated || 0}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-4 text-richblack-400 text-sm">
                    No courses available
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Recent Courses */}
      <motion.div
        className="bg-richblack-800 rounded-xl border border-richblack-700 shadow-lg p-5 md:p-6"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="flex flex-col gap-2 md:gap-1 lg:gap-1">
            <p className="font-semibold text-lg flex items-center gap-2">
              <FiGrid className="text-yellow-50" /> Your Courses
            </p>
            <p className="text-sm text-richblack-300">Manage and track your course performance</p>
          </div>

          <NavLink
            to="/dashboard/my-courses"
            className="text-sm text-yellow-100 font-semibold flex items-center gap-2 hover:text-yellow-50 mt-2 sm:mt-0"
          >
            <span>View All</span>
            <FaLongArrowAltRight />
          </NavLink>
        </div>

        {isLoading ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-yellow-50 border-richblack-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dashboardData && dashboardData.length > 0 ? (
              dashboardData.slice(0, 3).map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-richblack-700 rounded-xl overflow-hidden border border-richblack-600 hover:shadow-lg transition-all"
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      loading="lazy"
                      alt={course?.course?.courseName || "Course thumbnail"}
                      src={course?.course?.thumbnail || "https://via.placeholder.com/300x150?text=Course+Thumbnail"}
                      className="aspect-video w-full object-cover"
                    />

                    <div className="absolute top-2 right-2 bg-richblack-900/70 text-xs text-yellow-50 px-2 py-1 rounded-full">
                      ₹ {course?.course?.price || 0}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-richblack-5 line-clamp-1">
                      {course?.course?.courseName || "Untitled Course"}
                    </h4>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-richblack-300">
                        <FiUsers className="text-yellow-100" />
                        <span>{course?.totalStudentEnrolled || 0} Students</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-richblack-300">
                        <FaRupeeSign className="text-green-300" />
                        <span>{course?.totalAmountgenerated || 0}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="w-16 h-16 bg-richblack-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiGrid className="text-2xl text-richblack-400" />
                </div>
                <h4 className="text-lg font-medium text-richblack-100 mb-2">No courses yet</h4>
                <p className="text-richblack-400 max-w-md mx-auto mb-4">
                  Start creating courses to grow your student community and revenue.
                </p>
                <NavLink
                  to="/dashboard/add-course"
                  className="inline-block px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg font-medium hover:shadow-lg hover:shadow-yellow-50/10 transition-all"
                >
                  Create a Course
                </NavLink>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}