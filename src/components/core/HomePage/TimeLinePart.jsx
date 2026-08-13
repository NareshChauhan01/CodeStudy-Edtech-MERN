import React from "react";
import { motion } from "framer-motion";

export function TimeLinePart({ heading, para, imgSource }) {
  return (
    <motion.div
      className="flex gap-3 sm:gap-5 items-center group transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <motion.figure
        className="shrink-0 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.2)] p-3 sm:p-4 bg-linear-to-br from-white to-gray-100 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
        whileHover={{ scale: 1.1 }}
      >
        <img
          src={imgSource}
          alt={heading}
          loading="lazy"
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
      </motion.figure>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-sm sm:text-base md:text-lg text-richblack-800 transition-all duration-300 group-hover:text-richblack-900">
          {heading}
        </h3>
        <p className="text-xs sm:text-sm text-richblack-500">
          {para}
        </p>
      </div>
    </motion.div>
  )
}