import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiCheck } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineGlobeAlt, HiLockClosed } from "react-icons/hi";

import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseAPI";
import { resetCourseState, setStep } from "../../../../../redux/slices/courseSlice";

export function PublishCourse() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    getValues
  } = useForm()

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    const formData = new FormData()
    formData.append("courseId", course._id)

    const courseStatus =
      getValues("Public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT

    formData.append("status", courseStatus)

    setLoading(true)
    const result = await editCourseDetails(formData, token)

    if (result) {
      goToCourses()
    }

    setLoading(false)
  }

  const submitHandler = () => {
    handleCoursePublish()
  }

  const goBackHandler = () => {
    dispatch(setStep(2))
  }

  const handleCheckboxChange = (e) => {
    setIsPublic(e.target.checked)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full bg-linear-to-br from-richblack-800 via-richblack-900 to-richblack-800 px-5 sm:px-8 py-8 sm:py-10 rounded-xl shadow-xl border border-richblack-600/30 flex flex-col gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 border-b border-richblack-600 pb-4"
      >
        <IoRocketOutline className="text-yellow-50 text-2xl sm:text-3xl" />
        <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-yellow-100 to-yellow-200 text-transparent bg-clip-text">
          Publish Your Course
        </h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-richblack-800/50 rounded-xl overflow-hidden"
      >
        <div className="bg-richblack-700/30 p-4 border-b border-richblack-600">
          <h3 className="text-lg font-medium text-richblack-5">Visibility Settings</h3>
        </div>

        <div className="p-5">
          <div className="w-full flex items-center justify-between gap-4 p-4 rounded-lg border border-richblack-600 bg-richblack-700/20">
            <div className="flex items-center gap-4">
              {isPublic ?
                <motion.div
                  className="p-3 bg-green-600/10 text-green-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <HiOutlineGlobeAlt className="text-lg sm:text-xl" />
                </motion.div> :
                <motion.div
                  className="p-3 bg-yellow-600/10 text-yellow-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <HiLockClosed className="text-lg sm:text-xl" />
                </motion.div>
              }

              <div>
                <h4 className="text-base font-medium text-richblack-5">
                  Make this course {isPublic ? "Public" : "Private"}
                </h4>
                <p className="text-xs text-richblack-300 mt-1">
                  {isPublic
                    ? "Your course will be visible in the course listings and can be enrolled by students."
                    : "Your course will be saved as a draft and won't be visible to students."}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="public"
                {...register("Public")}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-richblack-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-richblack-5 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-100"></div>
              <span className="ml-1 text-sm font-medium text-richblack-5 sr-only">
                {isPublic ? "Public" : "Private"}
              </span>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full flex flex-wrap justify-end gap-4 pt-4 border-t border-richblack-600"
      >
        <motion.button
          type="button"
          onClick={goBackHandler}
          className="px-5 py-2.5 bg-richblack-700 border border-richblack-500 rounded-lg text-richblack-50 font-medium flex items-center gap-2 transition-all shadow-md hover:bg-richblack-600"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <GrFormPrevious className="text-xl" />
          Back
        </motion.button>

        <motion.button
          type="submit"
          className="px-5 py-2.5 bg-linear-to-r from-yellow-50 to-yellow-100 rounded-lg text-richblack-900 font-medium flex items-center gap-2 shadow-md hover:shadow-yellow-100/20 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-richblack-900 border-t-transparent animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <FiCheck className="text-lg" />
              {isPublic ? "Publish Course" : "Save as Draft"}
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}