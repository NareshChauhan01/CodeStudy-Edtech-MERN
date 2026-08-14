import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { IoClose } from "react-icons/io5";
import { HiOutlineTag } from "react-icons/hi";

export function TagField({
  name,
  label,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const [TagList, setTagList] = useState([])
  const { course, editCourse } = useSelector((state) => state.course)

  useEffect(() => {
    if (editCourse) {
      setTagList(course?.tag)
    }

    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, TagList)
  }, [TagList])

  const handlerAddtag = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault()

      // Get the input value and remove any leading/trailing spaces
      const tagValue = event.target.value.trim()

      // Check if the input value exists and is not already in the TagList array
      if (tagValue && !TagList.includes(tagValue)) {
        // Add the tag to the array and clear the input
        const updatedTagList = [...TagList, tagValue]
        setTagList(updatedTagList)
        event.target.value = ""
      }
    }
  }

  // Function to handle deletion of a tag
  const handlerRemoveTag = (index) => {
    const updatedTagList = [...TagList]
    updatedTagList.splice(index, 1)
    setTagList(updatedTagList)
  }

  const tagVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-richblack-50 font-medium flex items-center gap-2">
        <HiOutlineTag className="text-yellow-100" />
        {label}
        <sup className="text-pink-400">*</sup>
      </label>

      <div className="bg-richblack-800 p-3 rounded-lg border-l-4 border-yellow-100">
        <p className="text-xs text-richblack-300">
          Press Enter or comma after each tag to add it to the list
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-3">
        <AnimatePresence>
          {TagList.map((tag, idx) => (
            <motion.div
              key={`${tag}-${idx}`}
              variants={tagVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
              className="py-1.5 px-3 flex gap-2 items-center rounded-full bg-linear-to-r from-yellow-200 to-yellow-100 text-richblack-900 text-sm shadow-sm"
            >
              <span className="font-medium">{tag}</span>
              <button
                type="button"
                onClick={() => handlerRemoveTag(idx)}
                className="text-richblack-900 hover:text-pink-600 transition-colors p-1 rounded-full hover:bg-white/30"
              >
                <IoClose />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <input
        id={name}
        placeholder={placeholder}
        onKeyDown={handlerAddtag}
        className="py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50"
      />

      {errors[name] && (
        <span className="text-xs text-pink-300 mt-1">{label} is required</span>
      )}
    </div>
  )
}