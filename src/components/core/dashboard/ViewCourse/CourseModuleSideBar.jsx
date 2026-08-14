import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft, FaPlay, FaCheck } from "react-icons/fa";

export function CourseModuleSideBar({ onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { sectionId, subSectionId } = useParams()
  const [activeStatus, setActiveStatus] = useState("")
  const [videoActiveStatus, setVideoActiveStatus] = useState("")

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData) {
        return
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoActiveStatus(activeSubSectionId)
    }

    setActiveFlags()
  }, [courseSectionData, courseEntireData, location.pathname])

  // Calculate progress
  const calculateProgress = () => {
    if (!completedLectures?.length || !totalNoOfLectures) return 0
    return (completedLectures.length / totalNoOfLectures) * 100
  }

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const subSectionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.1 }
      }
    }
  }

  return (
    <div className="w-65 md:w-70 min-h-screen bg-linear-to-b from-richblack-800 to-richblack-900 text-richblack-5 flex flex-col shadow-xl relative overflow-y-auto h-full custom-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-linear-to-r from-richblack-700 to-richblack-800 backdrop-blur-sm border-b border-richblack-700 px-4 pt-10 pb-5">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/dashboard/enrolled-courses')}
            className="w-9 h-9 bg-linear-to-r from-yellow-500 to-yellow-600 rounded-full grid place-content-center shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(255, 214, 10, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="text-richblack-900" />
          </motion.button>

          <div className="flex-1 min-w-0">
            <motion.h3
              className="text-sm font-medium text-yellow-50 mb-1 truncate"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {courseEntireData?.courseName}
            </motion.h3>

            <div className="flex items-center gap-2">
              <div className="text-xs text-richblack-300">
                {completedLectures?.length || 0}/{totalNoOfLectures || 0}
              </div>
              <div className="w-full h-1.5 bg-richblack-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-50"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course sections */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="flex flex-col gap-3"
        >
          {courseSectionData?.map((sec, index) => (
            <motion.div
              key={sec._id}
              className={`rounded-xl overflow-hidden border ${activeStatus === sec._id
                ? "border-yellow-500/30 bg-linear-to-r from-yellow-500/10 to-transparent"
                : "border-richblack-600 bg-richblack-700/30"}`}
              variants={sectionVariants}
            >
              {/* Section header */}
              <div
                onClick={() => setActiveStatus(prev => prev === sec._id ? "" : sec._id)}
                className="flex justify-between items-center px-4 py-3 cursor-pointer group"
              >
                <h4 className="font-semibold text-sm text-white truncate pr-2">{sec?.sectionName}</h4>

                <motion.div
                  animate={{
                    rotate: activeStatus === sec._id ? 180 : 0,
                    color: activeStatus === sec._id ? "#eab308" : "#9ca3af"
                  }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <IoIosArrowDown className="text-lg group-hover:text-yellow-50 transition-colors" />
                </motion.div>
              </div>

              {/* Subsections */}
              <AnimatePresence>
                {activeStatus === sec._id && (
                  <motion.div
                    variants={subSectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="bg-richblack-800 border-t border-richblack-700/50">
                      {sec?.subSection?.map((lec) => {
                        const isActive = videoActiveStatus === lec._id;
                        const isCompleted = completedLectures?.includes(lec._id);

                        return (
                          <motion.div
                            key={lec._id}
                            onClick={() => {
                              setVideoActiveStatus(lec?._id)
                              navigate(`/view-course/${courseEntireData?._id}/section/${sec?._id}/sub-section/${lec?._id}`)
                              if (onClose && window.innerWidth < 768) onClose()
                            }}
                            className={`
                                                                flex items-center gap-3 px-4 py-3 border-l-2 cursor-pointer transition-all duration-300
                                                                ${isActive
                              ? "border-l-yellow-500 bg-linear-to-r from-yellow-500/20 to-transparent"
                                : "border-l-transparent hover:border-l-yellow-500/50 hover:bg-richblack-700/50"}
                                                            `}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="w-5 h-5 shrink-0 grid place-content-center">
                              {isCompleted ? (
                                <FaCheck className="text-xs text-caribbeangreen-300" />
                              ) : isActive ? (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                  <FaPlay className="text-xs text-yellow-50" />
                                </motion.div>
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-richblack-500"></div>
                              )}
                            </div>

                            <p className={`text-sm truncate ${isActive ? "text-yellow-50" : "text-richblack-50"}`}>
                              {lec?.title}
                            </p>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}