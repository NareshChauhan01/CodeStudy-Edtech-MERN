import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { FaPlus } from "react-icons/fa";
import { FiDivideCircle } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { NestedView } from "./NestedView";
import { PopUpModal } from "../../../PopUpModal";
import { AddLectureModal } from "./AddLectureModal";
import { setStep, setCourse, setEditCourse } from "../../../../../redux/slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseAPI";

export function CourseBuilderForm() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [sectionId, setSectionId] = useState(null)
  const [addLecture, setAddLecture] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})
  const [editSectionName, setEditSectionName] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const toggleSectionExpand = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const submitHandler = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id
        },
        token
      )
    }
    else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")

      // Auto-expand newly created sections
      if (!editSectionName && result.courseContent?.length > 0) {
        const newSectionId = result.courseContent[result.courseContent.length - 1]._id
        setExpandedSections(prev => ({
          ...prev,
          [newSectionId]: true
        }))
      }
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goBackHandler = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goNextHandler = () => {
    dispatch(setStep(3))
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 rounded-xl overflow-hidden shadow-xl border border-richblack-600/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-richblack-700 px-5 sm:px-7 py-4 border-b border-richblack-600 flex items-center gap-3">
        <FiDivideCircle className="text-yellow-50 text-xl sm:text-2xl" />
        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-100 to-yellow-200 text-transparent bg-clip-text">
          Course Builder
        </h2>
      </div>

      <div className="px-5 sm:px-7 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Tip Box */}
        <motion.div
          className="bg-richblack-700/40 rounded-lg p-4 border-l-4 border-yellow-100"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-yellow-100 mb-2">
            <HiOutlineLightBulb className="text-lg" />
            <h3 className="font-medium">Tip</h3>
          </div>
          <p className="text-sm text-richblack-50">
            Start by creating sections for your course. Then add lectures to each section by expanding it.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full flex flex-col gap-3 bg-richblack-800 p-5 rounded-xl border border-richblack-700/50"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="course-section" className="text-richblack-5 text-sm sm:text-base font-medium">
              {editSectionName ? "Edit Section Name" : "Create New Section"}
              <sup className="text-pink-300">*</sup>
            </label>
            <input
              required
              placeholder={editSectionName ? "Edit section name" : "Enter a name for your section (e.g. 'Introduction')"}
              id="course-section"
              {...register("sectionName", { required: true })}
              className="mt-2 w-full py-3 rounded-md px-4 bg-richblack-700 outline-none focus:ring-1 focus:ring-yellow-100 border-b border-richblack-500 text-richblack-50 text-sm sm:text-base transition-all"
            />

            {errors.sectionName && (
              <span className="text-xs text-pink-300 mt-1 block">Section name is required!</span>
            )}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 mt-2"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              className="w-fit px-4 sm:px-5 py-2.5 bg-yellow-50 text-richblack-900 rounded-md flex gap-2 items-center group hover:bg-yellow-100 transition-all shadow-md hover:shadow-yellow-100/10"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Processing..." : editSectionName ? "Save Changes" : "Create Section"}
              <IoMdAddCircleOutline className="text-lg sm:text-xl group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {editSectionName && (
              <motion.button
                type="button"
                onClick={cancelEdit}
                className="w-fit px-4 sm:px-5 py-2.5 border border-richblack-300 text-richblack-300 rounded-md hover:bg-richblack-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel Edit
              </motion.button>
            )}
          </motion.div>
        </motion.form>

        <AnimatePresence>
          {course.courseContent?.length > 0 && (
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-richblack-50">Your Course Sections</h3>
                <span className="text-xs px-2 py-1 bg-richblack-700 rounded-full text-yellow-100">
                  {course.courseContent.length} {course.courseContent.length === 1 ? "Section" : "Sections"}
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                {course?.courseContent?.map((section, index) => (
                  <motion.div
                    key={section._id}
                    className="flex flex-col gap-2 border border-richblack-600/30 rounded-lg overflow-hidden shadow-md bg-richblack-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <NestedView
                      idx={section._id}
                      value={section.sectionName}
                      isExpanded={expandedSections[section._id]}
                      handleToggle={toggleSectionExpand}
                      setConfirmationModal={setConfirmationModal}
                      handleChangeEditSectionName={handleChangeEditSectionName}
                      type="section"
                    />

                    <AnimatePresence>
                      {expandedSections[section._id] && (
                        <motion.div
                          className="overflow-hidden bg-richblack-900/20"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {section?.subSection?.length > 0 ? (
                            <div className="py-2 px-1">
                              {section.subSection.map((lecture, idx) => (
                                <NestedView
                                  key={lecture._id}
                                  idx={lecture._id}
                                  sectionId={section._id}
                                  value={lecture.title}
                                  setConfirmationModal={setConfirmationModal}
                                  type="lecture"
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="py-4 px-6 text-center text-sm text-richblack-300">
                              No lectures added yet
                            </div>
                          )}

                          <motion.button
                            onClick={() => {
                              setAddLecture(true)
                              setSectionId(section._id)
                            }}
                            className="mx-auto mb-3 bg-richblack-700 text-yellow-50 flex gap-2 items-center text-sm py-2 px-4 rounded-full hover:bg-richblack-600 transition-all shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaPlus className="text-xs" />
                            <span>Add Lecture</span>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="w-full flex flex-wrap justify-end gap-4 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <motion.button
            onClick={goBackHandler}
            className="w-fit px-5 py-2.5 bg-richblack-700 border border-richblack-500 rounded-md text-richblack-50 flex gap-2 items-center hover:bg-richblack-600 transition-all shadow-md"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <GrFormPrevious className="text-xl" />
            Back
          </motion.button>

          <motion.button
            onClick={goNextHandler}
            className="w-fit px-5 py-2.5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-md text-richblack-900 font-medium flex gap-2 items-center transition-all shadow-md hover:shadow-yellow-100/20"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <GrFormNext className="text-xl" />
          </motion.button>
        </motion.div>
      </div>

      {confirmationModal && <PopUpModal modalData={confirmationModal} />}

      {addLecture && (
        <AddLectureModal
          token={token}
          sectionId={sectionId}
          setAddLecture={setAddLecture}
        />
      )}
    </motion.div>
  )
}