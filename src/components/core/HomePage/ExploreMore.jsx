import React, { useState } from "react";
import { HiUsers } from "react-icons/hi";
import { VscSymbolClass } from "react-icons/vsc";
import { motion } from "framer-motion";

import { HighlightText } from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skills Paths",
  "Career Paths"
]

const ExploreMore = () => {
  const [currentTab, setcurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [CurrentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0])

  const setMyCards = (value) => {
    setcurrentTab(value)
    const result = HomePageExplore.filter((course) => course.tag === value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0])
  }

  return (
    <div className="flex flex-col justify-center items-center py-5 md:py-10">
      {/* Heading */}
      <motion.div
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        // initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>Unlock the </span>
        <HighlightText value="Power of Code" />
      </motion.div>

      {/* Subheading */}
      <motion.p
        className="font-medium text-base sm:text-lg tracking-wide text-richblack-300 text-center mt-2 mb-6 md:mb-8"
        // initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Learn to Build Anything You Can Imagine
      </motion.p>

      {/* Tab Navigation */}
      <motion.div
        className=""
        // initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative bg-richblack-700 grid lg:grid-flow-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 rounded-xl
         lg:rounded-full border-b-[0.2px] border-richblack-500 font-medium text-richblack-200 p-1 my-5 mb-8 md:mb-10 shadow-lg overflow-x-auto">
          {
            tabsName.map((element, index) => {
              return (
                <motion.button
                  className={`
                                        ${currentTab === element
                      ? "rounded-xl lg:rounded-full bg-linear-to-r from-richblack-900 to-richblack-800 text-yellow-50 shadow-inner"
                      : "text-richblack-200"}
                                        cursor-pointer px-3 sm:px-5 py-2.5 transition-all duration-300 hover:text-yellow-50 whitespace-nowrap
                                    `}
                  key={index}
                  onClick={() => setMyCards(element)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {element}
                </motion.button>
              )
            })
          }
        </div>
      </motion.div>

      {/* Course Cards */}
      <motion.div
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8"
        // initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          staggerChildren: 0.1,
          delayChildren: 0.3
        }}
      >
        {
          courses.map((element, index) => {
            return (
              <motion.div
                className={`
                                    ${CurrentCard === element
                    ? "bg-linear-to-br from-richblack-800 to-richblack-700 shadow-lg shadow-richblack-800/50 scale-[1.03]"
                    : "bg-linear-to-br from-richblack-800 to-richblack-900"}
                                    cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-richblack-800/50 border border-richblack-700
                                `}
                key={index}
                onClick={() => setCurrentCard(element)}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)"
                }}
                // initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-60 gap-5 px-5 pt-7 pb-20 border-b border-richblack-600">
                  <h2 className="text-richblack-5 text-xl font-semibold">{element.heading}</h2>
                  <p className="text-richblack-300">{element.description}</p>
                </div>

                <div className="flex justify-between items-center px-5 py-4 text-richblack-300">
                  <div className="flex items-center gap-2">
                    <HiUsers className="text-yellow-50 text-lg" />
                    <span>{element.level}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <VscSymbolClass className="text-yellow-50 text-lg" />
                    <span>{element.lessionNumber}</span>
                  </div>
                </div>
              </motion.div>
            )
          })
        }
      </motion.div>
    </div>
  )
}

export default ExploreMore