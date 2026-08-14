import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icons Import
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlineAccessTime, MdCurrencyRupee } from "react-icons/md";

// React Super Responsive Table Import
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Table, Tbody, Th, Thead, Tr, Td } from "react-super-responsive-table";

import { PopUpModal } from "../../PopUpModal";
import { COURSE_STATUS } from "../../../../utils/constants";
import { formatedDate } from "../../../../utils/dateFormatter";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseAPI";

export default function CourseTable({ courses, setCourses }) {
  // console.log("Courses", courses)
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [hoveredCourse, setHoveredCourse] = useState(null)

  const handleCourseDelete = async (courseId) => {
    await deleteCourse({ courseId: courseId }, token)

    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }

    setConfirmationModal(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transition: { duration: 0.2 }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  }

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  const statusBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div>
      {/* Card View for Mobile Devices */}
      <motion.div
        className="md:hidden space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.length === 0 ? (
          <motion.div
            className="text-center py-16 px-4 bg-gradient-to-b from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700"
            variants={emptyStateVariants}
          >
            <p className="text-lg font-bold text-richblack-100">No Courses Found</p>
            <p className="text-sm text-richblack-400 mt-2">
              Create your first course by clicking the "Add Course" button.
            </p>
          </motion.div>
        ) : (
          courses.map((course, index) => (
            <motion.div
              key={course._id}
              className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl overflow-hidden border border-richblack-700 shadow-md"
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video overflow-hidden">
                <motion.img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
              </div>

              {/* Course Details */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <h3 className="font-bold text-lg text-richblack-5">{course.courseName}</h3>

                {/* Description */}
                <p className="text-sm text-richblack-300 line-clamp-2">{course.courseDescription}</p>

                {/* Created Date */}
                <p className="text-xs text-richblack-300">
                  Created: {formatedDate(course.createdAt)}
                </p>

                {/* Status Badge */}
                <motion.div
                  variants={statusBadgeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <div className="w-fit flex gap-2 items-center px-3 py-1.5 rounded-full bg-pink-900/30 text-xs font-bold text-pink-200 border border-pink-900/50">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <HiClock />
                      </motion.div>
                      <p>Drafted</p>
                    </div>
                  ) : (
                    <div className="w-fit flex gap-2 items-center px-3 py-1.5 rounded-full bg-yellow-900/30 text-xs font-bold text-yellow-200 border border-yellow-900/50">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IoMdCheckmarkCircle />
                      </motion.div>
                      <p>Published</p>
                    </div>
                  )}
                </motion.div>

                {/* Price and Duration */}
                <div className="flex flex-col justify-between items-center pt-3 border-t border-richblack-700 mt-2">
                  <div className="w-full flex items-center justify-between text-sm">
                    <span className="font-bold">Price</span>

                    <div className="flex items-center gap-1">
                      <MdCurrencyRupee className="text-lg text-yellow-100" />
                      <span>{course.price}/-</span>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between text-sm mt-2">
                    <span className="font-bold">Duration</span>

                    <div className="flex items-center gap-1">
                      <MdOutlineAccessTime className="text-lg text-yellow-100" />
                      <span>{course?.courseDuration || "5hr 35min"}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-richblack-700 mt-3">
                  <motion.button
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    className="flex items-center gap-2 py-2 px-4 bg-richblack-700 hover:bg-richblack-600 rounded-md text-sm transition-all duration-200"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiEdit2 className="text-yellow-50" />
                    <span>Edit</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2: "All the data related to this course will be deleted",
                      btn1text: "Delete",
                      btn2text: "Cancel",
                      btn1Handler: () => handleCourseDelete(course._id),
                      btn2Handler: () => setConfirmationModal(null)
                    })}
                    className="flex items-center gap-2 py-2 px-4 bg-pink-900/30 hover:bg-pink-900/50 rounded-md text-sm text-pink-200 transition-all duration-200"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <RiDeleteBin6Line />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Table View for Larger Screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="border border-richblack-700 rounded-xl overflow-hidden min-w-[600px] w-full bg-gradient-to-b from-richblack-800 to-richblack-900 shadow-lg">
          <Thead>
            <Tr className="w-full uppercase font-bold grid grid-cols-8 border-b border-b-richblack-700 px-2 py-4 bg-richblack-800">
              <Th className="col-span-5 text-left pl-5 text-yellow-50">Courses</Th>
              <Th className="text-center text-yellow-50">Duration</Th>
              <Th className="text-center text-yellow-50">Price</Th>
              <Th className="text-center text-yellow-50">Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            <AnimatePresence>
              {courses.length === 0 ? (
                <Tr>
                  <Td className="text-center py-20 text-lg font-bold" colSpan={4}>
                    <motion.div
                      className="flex flex-col items-center"
                      variants={emptyStateVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <p className="text-richblack-100">No Course Found</p>
                      <p className="text-sm text-richblack-400 mt-2">
                        Create your first course by clicking the "Add Course" button.
                      </p>
                    </motion.div>
                  </Td>
                </Tr>
              ) : (
                courses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    className="grid grid-cols-8 border-b border-richblack-700"
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCourse(course._id)}
                    onHoverEnd={() => setHoveredCourse(null)}
                  >
                    {/* Course Info */}
                    <Td className="col-span-5 py-4 pl-5 pr-2">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="aspect-video w-full max-w-[250px] h-full max-h-[250px] overflow-hidden rounded-md border border-richblack-700"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.img
                            loading="lazy"
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className=" object-cover"
                            animate={hoveredCourse === course._id ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </motion.div>

                        <div className="flex flex-col gap-2">
                          <motion.p
                            className="font-bold text-base"
                            animate={hoveredCourse === course._id ?
                              { color: "rgba(255, 214, 10, 1)" } :
                              { color: "rgba(245, 245, 245, 1)" }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {course.courseName}
                          </motion.p>

                          <p className="line-clamp-2 text-sm text-richblack-300">{course.courseDescription}</p>
                          <p className="text-sm">Created: {formatedDate(course.createdAt)}</p>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {course.status === COURSE_STATUS.DRAFT ? (
                              <div className="w-fit flex gap-2 items-center px-2 py-1 rounded-full bg-pink-900/30 text-sm font-bold text-pink-200 border border-pink-900/50">
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                >
                                  <HiClock />
                                </motion.div>
                                <p>Drafted</p>
                              </div>
                            ) : (
                              <div className="w-fit flex gap-2 items-center px-2 py-1 rounded-full bg-yellow-900/30 text-sm font-bold text-yellow-200 border border-yellow-900/50">
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <IoMdCheckmarkCircle />
                                </motion.div>
                                <p>Published</p>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </Td>

                    <Td className="grid place-content-center">
                      <motion.div
                        className="flex items-center gap-1 text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MdOutlineAccessTime className="text-yellow-100" />
                        <span>{course.courseDuration || "5hr 38min"}</span>
                      </motion.div>
                    </Td>

                    <Td className="grid place-content-center">
                      <motion.div
                        className="flex items-center text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MdCurrencyRupee className="text-base text-yellow-100" />
                        <span>{course.price}/-</span>
                      </motion.div>
                    </Td>

                    <Td className="flex items-center gap-5 place-content-center">
                      <motion.button
                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                        className=" text-richblack-300 hover:text-caribbeangreen-500 transition-all duration-200"
                        aria-label="Edit course"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        whileTap={{ scale: 1 }}
                      >
                        <FiEdit2 />
                      </motion.button>

                      <motion.button
                        onClick={() => setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All the data related to this course will be deleted",
                          btn1text: "Delete",
                          btn2text: "Cancel",
                          btn1Handler: () => handleCourseDelete(course._id),
                          btn2Handler: () => setConfirmationModal(null)
                        })}
                        className=" text-richblack-300 hover:text-pink-500 transition-all duration-200"
                        aria-label="Delete course"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        whileTap={{ scale: 1 }}
                      >
                        <RiDeleteBin6Line />
                      </motion.button>
                    </Td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </Tbody>
        </Table>
      </div>

      {confirmationModal && <PopUpModal modalData={confirmationModal} />}
    </div>
  )
}