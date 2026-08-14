import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { FiBook } from "react-icons/fi";
import { MdOutlineAdd } from "react-icons/md";

import CourseTable from "./CourseTable";
import { fetchInstructorCourses } from "../../../../services/operations/courseAPI";

export function InstructorCourses() {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const result = await fetchInstructorCourses(token)
      // console.log(result)

      if (result) {
        setCourses(result)
      }

      setLoading(false)
    }

    fetchCourses()
  }, [token])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      className="h-full w-full max-w-250 mx-auto px-4 sm:px-6 pt-20 pb-10 flex flex-col gap-6 sm:gap-8 text-richblack-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <FiBook className="text-yellow-50 text-3xl" />
          <p className="font-bold text-3xl bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
            My Courses
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex gap-2 justify-center items-center bg-linear-to-r from-yellow-200 to-yellow-50 text-richblack-900 text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-3 rounded-md w-full sm:w-auto shadow-md hover:shadow-yellow-100/20 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-medium">Add Course</span>
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <MdOutlineAdd className="text-lg sm:text-xl" />
          </motion.div>
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            className="flex justify-center items-center py-20"
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-yellow-100/30"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-t-4 border-yellow-50"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full"
            key="content"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <CourseTable
              courses={courses}
              setCourses={setCourses}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}