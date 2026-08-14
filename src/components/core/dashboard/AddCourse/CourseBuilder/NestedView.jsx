import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { setCourse } from "../../../../../redux/slices/courseSlice";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseAPI";

export function NestedView({
  idx,
  sectionId,
  value,
  type,
  isExpanded,
  handleToggle,
  setConfirmationModal,
  handleChangeEditSectionName
}) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const handleDeleteSection = async () => {
    const result = await deleteSection(
      {
        courseId: course._id,
        sectionId: idx,
        token
      }
    )

    if (result) {
      dispatch(setCourse(result))
    }

    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async () => {
    const result = await deleteSubSection(
      {
        sectionId,
        subSectionId: idx,
        token
      }
    )

    if (result) {
      const updateCourseContent = course.courseContent.map(
        (section) => section._id === sectionId ? result : section
      )

      const updatedCourse = { ...course, courseContent: updateCourseContent }
      dispatch(setCourse(updatedCourse))
    }

    setConfirmationModal(null)
  }

  const sectionVariants = {
    hover: {
      backgroundColor: "rgba(71, 85, 105, 0.3)",
      transition: { duration: 0.2 }
    },
    initial: {
      backgroundColor: "rgba(71, 85, 105, 0)",
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`
                    ${type === "lecture" ? "w-[98%] sm:w-[95%] mx-auto" : "w-full"}
                    flex justify-between items-center py-3 px-3 sm:px-4
                    border-b border-richblack-400/30 rounded-lg
                    ${type === "section" ? "bg-richblack-700/40" : "bg-richblack-700/20"}
                `}
        variants={sectionVariants}
        initial="initial"
        whileHover="hover"
      >
        <div className="flex gap-2 sm:gap-3 items-center flex-1 truncate">
          {type === "section" && (
            <motion.button
              onClick={() => handleToggle && handleToggle(idx)}
              className="flex items-center justify-center p-1.5 bg-richblack-600 hover:bg-richblack-500 rounded-full transition-colors"
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isExpanded ?
                <IoMdArrowDropup className="text-xl text-yellow-50" /> :
                <IoMdArrowDropdown className="text-xl text-yellow-50" />
              }
            </motion.button>
          )}

          {type === "lecture" && (
            <div className="w-8 flex justify-center">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-yellow-100 mt-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          )}

          <span className={`text-sm sm:text-base font-medium truncate ${type === "section" ? "text-yellow-50" : "text-richblack-5"}`}>
            {type === "section" ? `${value} (Section)` : value}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {type === "section" ? (
            <>
              <motion.button
                onClick={() => handleChangeEditSectionName && handleChangeEditSectionName(idx, value)}
                className="p-1.5 bg-richblack-600 hover:bg-richblack-500 rounded-full transition-all text-yellow-50"
                aria-label="Edit"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <MdModeEdit className="text-sm sm:text-base" />
              </motion.button>

              <motion.button
                onClick={() => setConfirmationModal({
                  text1: "Delete this Section?",
                  text2: "All the lectures in this section will be deleted",
                  btn1text: "Delete",
                  btn2text: "Cancel",
                  btn1Handler: () => handleDeleteSection(),
                  btn2Handler: () => setConfirmationModal(null)
                })}
                className="p-1.5 bg-pink-700/30 hover:bg-pink-700/50 rounded-full transition-all text-pink-200"
                aria-label="Delete"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <RiDeleteBin6Line className="text-sm sm:text-base" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                className="p-1.5 bg-richblack-600 hover:bg-richblack-500 rounded-full transition-all text-yellow-50"
                aria-label="Edit"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <MdModeEdit className="text-sm sm:text-base" />
              </motion.button>

              <motion.button
                onClick={() => setConfirmationModal({
                  text1: "Delete this Lecture?",
                  text2: "This lecture will be deleted",
                  btn1text: "Delete",
                  btn2text: "Cancel",
                  btn1Handler: () => handleDeleteSubSection(),
                  btn2Handler: () => setConfirmationModal(null)
                })}
                className="p-1.5 bg-pink-700/30 hover:bg-pink-700/50 rounded-full transition-all text-pink-200"
                aria-label="Delete"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <RiDeleteBin6Line className="text-sm sm:text-base" />
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}