import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FiGlobe, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsFiles, BsPlayCircle, BsCheckCircle } from "react-icons/bs";

import { Footer } from "../components/common/Footer";
import { formatedDate } from "../utils/dateFormatter";
import { PopUpModal } from "../components/core/PopUpModal";
import { getCourseDetails } from "../services/operations/courseAPI";
import { CourseCard } from "../components/core/CourseDetails/CourseCard";
import { CourseReviewSection } from "../components/core/Catalog/CourseReviewSection";

export function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const [courseData, setCourseData] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [expandedSection, setExpandedSection] = useState("section1")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true)
      try {
        const result = await getCourseDetails({ courseId })
        if (result) {
          let lecture = 0

          // find total no lectures
          for (const sec of (result?.courseContent)) {
            lecture += sec?.subSection?.length
          }

          result.totalLecures = lecture
          setCourseData(result)
        }
      } catch (error) {
        toast.error("Failed to load course details")
      } finally {
        setLoading(false)
      }
    }
    fetchCourseDetails()
  }, [courseId])

  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null)
    } else {
      setExpandedSection(sectionId)
    }
  }

  const collapseAllSections = () => {
    setExpandedSection(null)
  }

  if (loading) {
    return (
      <div className="w-full h-[600px] grid place-content-center bg-richblack-900">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-richblack-700 border-t-yellow-50 animate-spin"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-yellow-50 animate-spin" style={{ animationDuration: '1s' }}></div>
        </div>
      </div>
    )
  }

  if (!courseData) {
    return (
      <div className="w-full h-[600px] grid place-content-center bg-richblack-900 text-richblack-5">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-2xl font-bold mb-2">Course Not Found</p>
          <p className="text-richblack-300 mb-6">We couldn't find the course you're looking for.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-100 transition-all"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-richblack-5 bg-richblack-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-richblack-800 to-richblack-900 pt-10 md:pt-20 lg:pt-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjEgMS4xIDIuMSAyLjNWNDMuN2MwIDEuMi0uOSAyLjMtMi4xIDIuM0gxOGMtMS4yIDAtMi4xLTEuMS0yLjEtMi4zVjIwLjNjMC0xLjIuOS0yLjMgMi4xLTIuM2gxOHoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-yellow-50 opacity-10 blur-[80px]"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>

        <div className="w-11/12 max-w-[1200px] mx-auto text-white">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Course Details */}
            <motion.div
              className="w-full lg:w-8/12 flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Title with animated underline */}
              <div className="relative">
                <p className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  {courseData?.courseName}
                </p>
                <motion.div
                  className="h-1 w-20 bg-yellow-50 mt-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "5rem" }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                ></motion.div>
              </div>

              <p className="text-richblack-300 text-lg">
                {courseData?.courseDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                <div className="bg-richblack-700 py-1 px-3 rounded-full flex items-center gap-1">
                  <span className="text-yellow-100 font-semibold">4.5</span>
                  <Rating value={4.5} precision={0.5} size="small" readOnly className="text-yellow-100" />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-richblack-300">(</span>
                  <p className="text-richblack-50">{courseData?.ratingAndReviews?.length || 1} reviews</p>
                  <span className="text-richblack-300">)</span>
                </div>

                <div className="bg-richblack-700 py-1 px-3 rounded-full flex items-center gap-2">
                  <BsPlayCircle className="text-yellow-50" />
                  <p className="text-richblack-50">
                    {courseData?.studentEnrolled?.length || 0} Students
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex gap-2 items-center text-lg">
                <span>Created by</span>
                <span className="font-semibold text-yellow-50">
                  {courseData?.instructor?.firstName + " " + courseData?.instructor?.lastName || "Instructor"}
                </span>
              </div>

              {/* Course metadata */}
              <div className="flex flex-wrap gap-4 text-sm md:text-base">
                <div className="bg-richblack-800 py-1 px-3 rounded-full flex items-center gap-2">
                  <IoInformationCircleOutline className="text-yellow-50" />
                  <p className="text-richblack-300">Created: {formatedDate(courseData?.createdAt)}</p>
                </div>

                <div className="bg-richblack-800 py-1 px-3 rounded-full flex items-center gap-2">
                  <FiGlobe className="text-yellow-50" />
                  <p className="text-richblack-300">English</p>
                </div>
              </div>
            </motion.div>

            {/* Course Card (Desktop) */}
            <div className="hidden lg:block lg:w-4/12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CourseCard
                  courseId={courseId}
                  courseData={courseData}
                  setConfirmationModal={setConfirmationModal}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Card (Mobile) */}
      <div className="lg:hidden w-11/12 max-w-[450px] mx-auto -mt-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CourseCard
            courseId={courseId}
            courseData={courseData}
            setConfirmationModal={setConfirmationModal}
          />
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="w-11/12 max-w-[1200px] mx-auto mt-8 mb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-8/12 space-y-12">
            {/* What you'll learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <HiOutlineLightBulb className="text-2xl text-richblack-900" />
                  </div>
                  <h2 className="text-2xl font-bold">What you'll learn</h2>
                </div>

                <div className="flex items-start gap-2">
                  <BsCheckCircle className="text-xl text-yellow-50" />
                  <span>{courseData?.whatYouWillLearn}</span>
                </div>
              </div>
            </motion.div>

            {/* Course Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <MdOndemandVideo className="text-2xl text-richblack-900" />
                  </div>
                  <h2 className="text-2xl font-bold">Course Content</h2>
                </div>

                <button
                  className="text-yellow-50 text-sm font-medium hover:underline transition-all"
                  onClick={collapseAllSections}
                >
                  Collapse all sections
                </button>
              </div>

              <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-xl overflow-hidden shadow-md">
                <div className="p-4 bg-richblack-700 flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-richblack-800 py-1 px-3 rounded-full">
                      <BsFiles className="text-yellow-50" />
                      <span>{`${courseData?.courseContent?.length} Sections`}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-richblack-800 py-1 px-3 rounded-full">
                      <MdOndemandVideo className="text-yellow-50" />
                      <span>{`${courseData?.totalLecures} Lectures`}</span>
                    </div>

                    <div className="flex items-center gap-1 bg-richblack-800 py-1 px-3 rounded-full">
                      <AiOutlineClockCircle className="text-yellow-50" />
                      <span>{courseData?.courseDuration || "58h Total Length"}</span>
                    </div>
                  </div>
                </div>

                {courseData?.courseContent?.length > 0 ?
                  (
                    courseData?.courseContent?.map((section, index) => (
                      <div key={section._id} className="border-b border-richblack-700">
                        <motion.div
                          className="p-4 flex justify-between items-center cursor-pointer hover:bg-richblack-700 transition-colors duration-200"
                          onClick={() => toggleSection(section._id)}
                          whileHover={{ backgroundColor: "rgba(71, 85, 105, 0.3)" }}
                        >
                          <div className="flex items-center gap-3">
                            {expandedSection === section._id ? (
                              <FiChevronUp className="text-yellow-50" />
                            ) : (
                              <FiChevronDown className="text-yellow-50" />
                            )}

                            <div className="flex gap-3 font-bold">
                              <span>{`Section ${index + 1}:`}</span>
                              <span>{section?.sectionName}</span>
                            </div>
                          </div>

                          <span className="text-sm text-richblack-300 bg-richblack-900 py-1 px-3 rounded-full">
                            {`${section?.subSection?.length} lectures • ${section.timeDuration || "35 min"}`}
                          </span>
                        </motion.div>

                        {section?.subSection?.length > 0 &&
                          (
                            section?.subSection?.map((lecture) => (
                              <div key={lecture._id}>
                                {expandedSection === section._id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-richblack-900 border-t border-richblack-700"
                                  >
                                    <div className="p-4 pl-10 hover:bg-richblack-800 transition-colors border-b border-richblack-700">
                                      <div className="flex items-center gap-3">
                                        <MdOndemandVideo className="text-yellow-50" />
                                        <p>{lecture?.title}</p>
                                      </div>
                                      <p className="text-xs text-richblack-300 mt-1 ml-7">{lecture?.timeDuration}</p>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            ))
                          )

                        }
                      </div>
                    ))
                  )
                  :
                  (
                    <></>
                  )
                }
              </div>
            </motion.div>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-richblack-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Author</h2>
              </div>

              <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      loading="lazy"
                      alt="Instructor"
                      src={courseData?.instructor?.image}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-semibold text-yellow-50">
                      {courseData?.instructor?.firstName || "Instructor"} {courseData?.instructor?.lastName || ""}
                    </h3>
                    <p className="text-richblack-300">Course Instructor</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Rating value={4.8} precision={0.1} size="small" readOnly className="text-yellow-100" />
                        <span className="text-yellow-100 text-sm font-medium">4.8</span>
                      </div>
                      <span className="text-richblack-300 text-sm">|</span>
                      <span className="text-richblack-300 text-sm">15+ Courses</span>
                      <span className="text-richblack-300 text-sm">|</span>
                      <span className="text-richblack-300 text-sm">5K+ Students</span>
                    </div>
                  </div>
                </div>

                <p className="text-richblack-100">
                  {
                    courseData?.instructor?.additionalDetails?.about ||
                    `Experienced instructor with expertise in web development and programming.
                                        Passionate about teaching and helping students achieve their goals.
                                        With over 10 years of industry experience, I bring practical knowledge
                                        and real-world examples to all my courses.`
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Review Section */}
        <CourseReviewSection courseId={courseId} />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {confirmationModal && <PopUpModal modalData={confirmationModal} />}
    </div>
  )
}