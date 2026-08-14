import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { FaBars } from "react-icons/fa";

import { getFullCourseDetails } from "../services/operations/courseAPI";
import { CourseModuleSideBar } from "../components/core/dashboard/ViewCourse/CourseModuleSideBar";

import {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures
} from "../redux/slices/viewCourseSlice";

export function ViewCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true)
      const result = await getFullCourseDetails({ courseId }, token)

      if (result) {
        dispatch(setCourseSectionData(result?.courseDetails?.courseContent))
        dispatch(setEntireCourseData(result?.courseDetails))
        dispatch(setCompletedLectures(result?.completedVideos))

        let lectures = 0
        result?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length
        })

        dispatch(setTotalNoOfLectures(lectures))
      }
      setLoading(false)
    }

    fetchCourseDetails()
  }, [])

  // Close sidebar on small screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <motion.div
      className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.65rem)] bg-richblack-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile toggle button */}
      <motion.button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-yellow-50 text-richblack-900 p-3 rounded-full shadow-lg"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaBars />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="md:relative fixed inset-y-0 left-0 z-50 md:z-0 md:h-auto"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <CourseModuleSideBar onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 768 && (
          <motion.div
            className="fixed inset-0 bg-richblack-900 bg-opacity-80 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="flex-1 min-h-[calc(100vh-3.65rem)] w-full overflow-x-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-t-yellow-50 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <p className="text-richblack-200 animate-pulse">Loading course content...</p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </motion.div>
    </motion.div>
  )
}