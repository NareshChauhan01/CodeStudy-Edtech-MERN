import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import { Button } from '../components/core/HomePage/Button';
import Banner from "../assests/videos/banner.mp4"


function Home() {
  return (
    <div className="bg-richblack-900">
      {/* Hero Section with Background Gradients */}

      <div className="relative min-h-screen bg-linear-to-br from-richblack-800 to-richblack-900">
        {/* Main Content */}
        <div className="relative w-10/12 mx-auto text-white">
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Hero Section */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link to={"/signup"}>
                <motion.button
                  className="flex justify-center items-center gap-2 mt-12 md:mt-20 mb-6 md:mb-10 bg-richblack-900 font-semibold text-richblack-200 rounded-full px-6 sm:px-10 py-3 border-b-[0.2px] border-richblack-500 shadow-lg hover:scale-95 hover:bg-richblack-900 hover:border hover:border-richblack-700 transition-all duration-200"
                  whileHover={{
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "rgba(32, 37, 45, 1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Become an Instructor</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
              </Link>


              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span>Empower Your Future with </span>
                <HighlightText value="Coding Skills" />
              </motion.p>

              <motion.p
                className="font-medium text-sm sm:text-base md:text-lg tracking-wide text-richblack-300 w-full md:max-w-[87%] text-center mt-4 md:mt-5 mb-8 md:mb-14 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button value="Learn More" clr={true} linkTo={"/signup"} />
                <Button value="Book a Demo" clr={false} linkTo={"/login"} />
              </motion.div>
            </motion.div>

            {/* Video Banner */}
            <motion.div
              className="shadow-blue-600 shadow-custom2 w-full rounded-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <video muted autoPlay loop className="w-full h-auto shadow-white shadow-custom1 border-none">
                <source src={Banner} />
              </video>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home