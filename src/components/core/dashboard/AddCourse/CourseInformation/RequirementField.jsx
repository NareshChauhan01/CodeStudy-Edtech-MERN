import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiOutlineClipboardList } from "react-icons/hi";

export function RequirementField({
  name,
  label,
  errors,
  register,
  placeholder,
  setValue
}) {
  const [requirement, setRequirement] = useState("")
  const [requirementList, setRequirementList] = useState([])
  const { editCourse, course } = useSelector((state) => state.course)

  useEffect(() => {
    if (editCourse) {
      setRequirementList(course?.instructions)
    }

    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, requirementList)
  }, [requirementList])

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList]
    updatedRequirementList.splice(index, 1)
    setRequirementList(updatedRequirementList)
  }

  const requirementVariants = {
    initial: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={name} className="text-richblack-50 font-medium flex items-center gap-2">
        <HiOutlineClipboardList className="text-yellow-100" />
        {label}
        <sup className="text-pink-400">*</sup>
      </label>

      <div className="bg-richblack-800 p-3 rounded-lg border-l-4 border-yellow-100 mb-3">
        <p className="text-xs text-richblack-300">
          Add requirements or instructions for the course. What should students know before starting?
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <input
          placeholder={placeholder}
          id={name}
          name={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="flex-1 py-3 rounded-lg px-5 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-100 transition-colors duration-300 text-richblack-50"
        />

        <motion.button
          type="button"
          onClick={handleAddRequirement}
          className="w-fit px-4 py-2 bg-gradient-to-r from-yellow-200 to-yellow-100 rounded-lg text-richblack-900 font-medium flex items-center gap-2 shadow-md hover:shadow-yellow-100/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!requirement.trim()}
        >
          <IoMdAddCircleOutline className="text-xl" />
          <span>Add</span>
        </motion.button>
      </div>

      {errors[name] && (
        <span className="text-xs text-pink-300 mt-1">At least one requirement is needed</span>
      )}

      <div className="mt-4">
        <AnimatePresence>
          {requirementList.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-richblack-600 rounded-lg overflow-hidden"
            >
              <div className="bg-richblack-800 py-2 px-4 border-b border-richblack-600">
                <h3 className="text-sm font-medium text-richblack-50">Requirements List</h3>
              </div>
              <div className="bg-richblack-700/50 p-2">
                {requirementList.map((item, idx) => (
                  <motion.div
                    key={`${item}-${idx}`}
                    variants={requirementVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center justify-between py-2 px-4 odd:bg-richblack-700/30 even:bg-richblack-700/10 rounded-md my-1"
                  >
                    <div className="flex items-start gap-2">
                      <span className="bg-yellow-100 text-richblack-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-richblack-50">{item}</span>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveRequirement(idx)}
                      className="text-pink-400 hover:text-pink-500 transition-colors p-1 rounded-full hover:bg-richblack-800"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <MdDeleteForever className="text-xl" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}