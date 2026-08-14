import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { FiInfo } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";

import { Upload } from "../Upload";
import { TagField } from "./TagField";
import { RequirementField } from "./RequirementField";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import { createCourse, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseAPI";

export function CourseInformationForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [courseCategory, setCourseCategory] = useState([])
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => (state.course))

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()

      if (categories.length > 0) {
        setCourseCategory(categories)
      }

      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course?.courseName)
      setValue("courseDescription", course?.courseDescription)
      setValue("courseBenefits", course?.whatYouWillLearn)
      setValue("coursePrice", course?.price)
      setValue("courseCategory", course?.category)
      setValue("courseTag", course?.tag)
      setValue("courseRequirements", course?.instructions)
      setValue("CourseThumbnail", course?.thumbnailImage)
    }

    getCategories()
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseTag.toString() !== course.tag.toString() ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.CourseThumbnail !== course.thumbnailImage
    ) {
      return true
    }
    else {
      return false
    }
  }

  const submitHandler = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("courseId", course._id)

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }

        if (currentValues.courseTag.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTag))
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }

        if (currentValues.CourseThumbnail !== course.thumbnailImage) {
          formData.append("thumbnailImage", data.CourseThumbnail)
        }

        setLoading(true)
        const result = await editCourseDetails(formData, token)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      }
      else {
        toast.error("Update at least one section")
      }

      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseDescription)
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("price", data.coursePrice)
    formData.append("category", data.courseCategory)
    formData.append("tag", JSON.stringify(data.courseTag))
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.CourseThumbnail)
    formData.append("status", COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await createCourse(formData, token)

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(submitHandler)}
      className="w-full bg-linear-to-br from-richblack-800 via-richblack-900 to-richblack-800 px-4 sm:px-6 md:px-8 py-8 sm:py-10 rounded-xl shadow-xl border border-richblack-600/30 flex flex-col gap-6 sm:gap-8"
    >
      {/* Header */}
      <motion.div
        variants={childVariants}
        className="flex items-center gap-3 border-b border-richblack-600 pb-6"
      >
        <HiOutlineDocumentText className="text-yellow-50 text-2xl sm:text-3xl" />
        <h2 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-yellow-100 to-yellow-200 text-transparent bg-clip-text">
          Course Information
        </h2>
      </motion.div>

      {/* Course Title */}
      <motion.div variants={childVariants} className="w-full flex flex-col gap-2">
        <label htmlFor="course-title" className="text-richblack-50 font-medium flex items-center gap-1">
          Course Title
          <sup className="text-pink-400">*</sup>
        </label>
        <input
          placeholder="Enter Course Title"
          id="course-title"
          {...register("courseTitle", { required: true })}
          className="py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-300">Course title is required</span>
        )}
      </motion.div>

      {/* Course Description */}
      <motion.div variants={childVariants} className="flex flex-col gap-2">
        <label htmlFor="description" className="text-richblack-50 font-medium flex items-center gap-1">
          Course Short Description
          <sup className="text-pink-400">*</sup>
        </label>
        <textarea
          placeholder="Enter Description"
          id="description"
          {...register("courseDescription", { required: true })}
          className="min-h-30 py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50 resize-y"
        />
        {errors.courseDescription && (
          <span className="text-xs text-pink-300">Course description is required</span>
        )}
      </motion.div>

      {/* Course Price */}
      <motion.div variants={childVariants} className="relative w-full flex flex-col gap-2">
        <label htmlFor="course-price" className="text-richblack-50 font-medium flex items-center gap-1">
          Course Price
          <sup className="text-pink-400">*</sup>
        </label>
        <div className="relative">
          <input
            placeholder="Enter Course Price"
            id="course-price"
            type="number"
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className="w-full py-3 rounded-lg pl-14 pr-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50"
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <RiMoneyRupeeCircleFill className="text-xl text-yellow-100" />
          </div>
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-300">Course price is required</span>
        )}
      </motion.div>

      {/* Course Category */}
      <motion.div variants={childVariants} className="flex flex-col gap-2">
        <label htmlFor="category" className="text-richblack-50 font-medium flex items-center gap-1">
          Course Category
          <sup className="text-pink-400">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="w-full py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50 appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFD60A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
        >
          <option value="" disabled>Choose a category</option>
          {!loading &&
            courseCategory.map((element, index) => (
              <option key={index} value={element?._id}>{element?.name}</option>
            ))
          }
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-300">Course category is required</span>
        )}
      </motion.div>

      {/* Course Tags */}
      <motion.div variants={childVariants}>
        <TagField
          name="courseTag"
          label="Tags"
          placeholder="Enter tags and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </motion.div>

      {/* Course Thumbnail */}
      <motion.div variants={childVariants}>
        <Upload
          name="CourseThumbnail"
          label="Course Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          editData={editCourse ? course?.thumbnail : null}
        />
      </motion.div>

      {/* Course Benefits */}
      <motion.div variants={childVariants} className="flex flex-col gap-2">
        <label htmlFor="course-benefits" className="text-richblack-50 font-medium flex items-center gap-1">
          Benefits of the course
          <sup className="text-pink-400">*</sup>
        </label>
        <div className="bg-richblack-800 p-3 rounded-lg border-l-4 border-yellow-100 mb-3">
          <div className="flex items-center gap-2 text-yellow-100">
            <FiInfo className="text-lg" />
            <p className="text-sm font-medium">Tip</p>
          </div>
          <p className="text-xs text-richblack-300 mt-1">
            List the key takeaways for students. What will they learn from this course?
          </p>
        </div>
        <textarea
          type="text"
          placeholder="Enter benefits of the course"
          id="course-benefits"
          name="courseBenefits"
          {...register("courseBenefits", { required: true })}
          className="min-h-30 py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50 resize-y"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-300">Course benefits are required</span>
        )}
      </motion.div>

      {/* Course Requirements */}
      <motion.div variants={childVariants}>
        <RequirementField
          name="courseRequirements"
          label="Requirements/Instructions"
          placeholder="Enter requirements/instructions"
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </motion.div>

      {/* Form Actions */}
      <motion.div
        variants={childVariants}
        className="w-full flex flex-wrap justify-end gap-4 mt-4 border-t border-richblack-600 pt-6"
      >
        {editCourse && (
          <motion.button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="px-6 py-3 bg-richblack-600 hover:bg-richblack-700 rounded-lg text-richblack-50 text-sm font-medium transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Without Changes
          </motion.button>
        )}

        <motion.button
          type="submit"
          className="px-6 py-3 bg-linear-to-r from-yellow-200 to-yellow-50 rounded-lg text-richblack-900 text-sm font-medium shadow-md hover:shadow-yellow-100/20 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-richblack-900 border-t-transparent animate-spin"></div>
              <span>{editCourse ? "Saving..." : "Creating..."}</span>
            </>
          ) : (
            <>
              <span>{editCourse ? "Save Changes" : "Next"}</span>
              <GrFormNext className="text-lg group-hover:translate-x-1 transition-all duration-300" />
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}