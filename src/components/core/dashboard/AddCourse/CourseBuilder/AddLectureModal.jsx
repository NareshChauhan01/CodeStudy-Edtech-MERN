import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { IoClose } from "react-icons/io5";

import { Upload } from "../Upload";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { createSubSection } from "../../../../../services/operations/courseAPI";

export function AddLectureModal({ setAddLecture, sectionId, token }) {
  const dispatch = useDispatch()
  const { course } = useSelector((state) => state.course)

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submitHandler = async (data) => {
    const formData = new FormData()
    formData.append("sectionId", sectionId)
    formData.append("video", data.lectureVideo)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDescription)

    const result = await createSubSection(formData, token)

    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
      setAddLecture(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-auto bg-richblack-900/60 backdrop-blur-sm">
      <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[55%] 2xl:max-w-[40%] my-6 flex flex-col gap-3 sm:gap-5 bg-richblack-700 rounded-lg border-[0.01rem] border-richblack-500 shadow-xl">
        {/* Modal Header */}
        <div className="bg-richblack-600 p-3 sm:p-5 rounded-t-lg flex justify-between items-center">
          <span className="text-xl sm:text-2xl font-bold">Adding Lecture</span>

          <button
            onClick={() => setAddLecture(false)}
            className="p-1 rounded-full hover:bg-richblack-700 transition-all"
          >
            <IoClose className="text-lg sm:text-2xl" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4 sm:gap-5 p-3 sm:p-5 overflow-y-auto max-h-[70vh]"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            errors={errors}
            video={true}
            setValue={setValue}
          />

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="lecture-title" className="text-richblack-5 text-sm sm:text-base">
              Lecture Title<sup className="text-pink-300">*</sup>
            </label>
            <input
              placeholder="Enter Lecture Title"
              id="lecture-title"
              {...register("lectureTitle", { required: true })}
              className="py-2 sm:py-3 rounded-md px-3 sm:px-5 bg-richblack-800 outline-none border-b-[0.1rem] border-richblack-600 text-richblack-50 text-sm sm:text-base"
            />

            {errors.lectureTitle && (
              <span className="text-xs text-pink-300 mt-1">Lecture title is required</span>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="description" className="text-richblack-5 text-sm sm:text-base">
              Lecture Description<sup className="text-pink-300">*</sup>
            </label>
            <textarea
              placeholder="Enter Lecture Description"
              id="description"
              {...register("lectureDescription", { required: true })}
              className="min-h-[100px] sm:min-h-[150px] py-2 sm:py-3 rounded-md px-3 sm:px-5 bg-richblack-800 outline-none border-b-[0.1rem] border-richblack-600 text-richblack-50 text-sm sm:text-base"
            />

            {errors.lectureDescription && (
              <span className="text-xs text-pink-300 mt-1">Lecture description is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-fit px-4 sm:px-5 py-1.5 sm:py-2 bg-yellow-200 rounded-md text-black text-sm sm:text-lg font-bold place-self-end hover:bg-yellow-100 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}