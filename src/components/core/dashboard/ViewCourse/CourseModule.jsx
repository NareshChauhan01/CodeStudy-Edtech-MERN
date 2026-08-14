import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { FaPlay } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import { BsArrowRightShort, BsCheckCircleFill } from "react-icons/bs";

import { ReviewCourse } from "./ReviewCourse";
import { updateCourseProgress } from "../../../../services/operations/courseAPI";
import { updateCompletedLectures } from "../../../../redux/slices/viewCourseSlice";



export function CourseModule() {
  const playerRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { token } = useSelector((state) => state.auth)
  const { courseId, sectionId, subSectionId } = useParams()

  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)
  const [previewSource, setPreviewSource] = useState("")

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData) {
        return
      }

      setLoading(true)

      if (!courseId && !sectionId && !subSectionId) {
        navigate('dashboard/enrolled-courses')
      }

      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId
      )

      const filteredVideoData = filteredData[0]?.subSection?.filter(
        (data) => data._id === subSectionId
      )[0]

      setVideoData(filteredVideoData)
      setPreviewSource(courseEntireData.thumbnail)
      setVideoEnded(false)
      setLoading(false)
    }

    setVideoSpecificDetails()
  }, [courseSectionData, courseEntireData, location.pathname])

  // check if the lecture is the first video of course
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true
    }
    else {
      return false
    }
  }

  // go to next video
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[nextSectionId]?.subSection[0]?._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  // check if the playing video is last video of the course
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data?._id === subSectionId
    )

    if (
      currentSectionIndex === (courseSectionData.length) - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true
    }
    else {
      return false
    }
  }

  // go to previous video
  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]?._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionIndex}`)
    }
    else {
      const prevSectionIndex = courseSectionData[currentSectionIndex - 1]._id
      const prevSubSectionlength = courseSectionData[prevSectionIndex]?.length
      const prevSubSectionIndex = courseSectionData[prevSectionIndex]?.subSection[prevSubSectionlength - 1]?._id
      navigate(`/view-course/${courseId}/section/${prevSectionIndex}/sub-section/${prevSubSectionIndex}`)
    }
  }

  // update lecture completion details
  const handleLectureCompletion = async () => {
    const result = await updateCourseProgress(
      {
        courseId,
        subSectionId
      },
      token
    )

    if (result) {
      dispatch(updateCompletedLectures(subSectionId))
    }
  }

  const isVideoCompleted = completedLectures?.includes(videoData?._id);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      className="max-w-[1000px] mx-auto px-4 pt-10 pb-10 md:pt-20 lg:pt-20 flex flex-col gap-8 text-richblack-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-4 border-t-yellow-50 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <p className="text-richblack-200 animate-pulse">Loading lecture content...</p>
          </div>
        </div>
      ) : !videoData ? (
        <div className="text-center py-16">
          <motion.p variants={itemVariants} className="text-xl">No Lecture Found!</motion.p>
        </div>
      ) : (
        <>
          {/* Header Section with Course Title and Progress */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex gap-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-yellow-50 mb-1 font-medium">
                    {courseEntireData?.courseName}
                  </p>
                  <h2 className="font-bold text-2xl md:text-3xl text-white tracking-tight">
                    {videoData?.title}
                  </h2>
                </motion.div>
              </div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-sm text-richblack-300 whitespace-nowrap">
                  {completedLectures?.length || 0} / {totalNoOfLectures || 0} completed
                </span>
                <div className="w-32 h-2 bg-richblack-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedLectures?.length / totalNoOfLectures) * 100 || 0}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Video Player Section */}
          <motion.div
            variants={itemVariants}
            className="relative w-full aspect-video bg-richblack-900 rounded-xl overflow-hidden shadow-2xl border border-richblack-700"
          >
            <ReactPlayer
              ref={playerRef}
              url={videoData?.videoUrl}
              width='100%'
              height='100%'
              controls={true}
              light={previewSource}
              onEnded={() => {
                setVideoEnded(true)
                handleLectureCompletion()
              }}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload',
                  },
                },
              }}
              playIcon={
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-yellow-50 text-richblack-900 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay className="text-2xl" />
                </motion.div>
              }
              className="absolute top-0 left-0"
            />
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="w-full flex flex-wrap gap-4 justify-between mt-2"
          >
            {!isFirstVideo() && (
              <motion.button
                onClick={goToPreviousVideo}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-richblack-800 hover:bg-richblack-700 rounded-lg text-white text-base font-medium border border-richblack-700 transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <GrFormPrevious className="text-xl" />
                <span>Previous Lecture</span>
              </motion.button>
            )}

            {!isLastVideo() && (
              <motion.button
                onClick={goToNextVideo}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-lg text-richblack-900 text-base font-medium transition-all duration-300 ml-auto"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(234, 179, 8, 0.25)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Next Lecture</span>
                <BsArrowRightShort className="text-xl" />
              </motion.button>
            )}
          </motion.div>

          {/* Completion Status and Mark as Complete Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-5 bg-gradient-to-r from-richblack-800 to-richblack-700 rounded-xl border border-richblack-600 shadow-md"
          >
            <div className="flex items-center gap-3">
              {isVideoCompleted ? (
                <BsCheckCircleFill className="text-xl text-caribbeangreen-300" />
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}
                >
                  <FiClock className="text-xl text-yellow-100" />
                </motion.div>
              )}
              <span className="text-richblack-100 text-sm md:text-base">
                {isVideoCompleted ? "Completed" : "Mark when you complete this lecture"}
              </span>
            </div>

            <motion.button
              onClick={handleLectureCompletion}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${isVideoCompleted
                ? "bg-richblack-700 text-richblack-300 hover:bg-richblack-600"
                : "bg-yellow-50 text-richblack-900 hover:bg-yellow-100"
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <input
                type="checkbox"
                id="mark-video"
                name="mark-video"
                checked={isVideoCompleted}
                readOnly
                className="h-4 w-4 accent-yellow-50 cursor-pointer"
              />
              <label htmlFor="mark-video" className="text-sm font-medium cursor-pointer">
                {isVideoCompleted ? "Marked as Complete" : "Mark as Complete"}
              </label>
            </motion.button>
          </motion.div>

          {/* Video Information Section */}
          <AnimatePresence>
            {videoData?.description && (
              <motion.div
                variants={itemVariants}
                className="mt-2 p-5 bg-gradient-to-r from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-white">About this lecture</h3>
                <p className="text-richblack-100">{videoData.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review Section */}
          <ReviewCourse />
        </>
      )}
    </motion.div>
  )
}