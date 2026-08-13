import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export function Button({ value, clr, linkTo, arrow, wdth }) {
  return (
    <Link to={linkTo || "#"}>
      <motion.button
        className={`
                    ${wdth} 
                    rounded-lg font-semibold px-6 py-3.5 
                    ${clr
            ? "bg-linear-to-r from-yellow-50 to-yellow-100 text-richblack-900 shadow-lg shadow-yellow-50/10"
            : "bg-richblack-800 border-b border-richblack-600 text-richblack-100 shadow-lg shadow-richblack-900/20"
          } 
                    ${arrow ? "flex items-center gap-2" : ""} 
                    transition-all duration-300
                `}
        whileHover={{
          scale: 1.05,
          boxShadow: clr
            ? "0 10px 20px rgba(255, 214, 10, 0.2)"
            : "0 10px 20px rgba(0, 0, 0, 0.2)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{value}</span>
        {arrow && (
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowRight />
          </motion.span>
        )}
      </motion.button>
    </Link>
  )
}