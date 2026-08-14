import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { BsLightningChargeFill } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiLightBulb, HiOutlineLightBulb } from "react-icons/hi";

export function CourseTips() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredTip, setHoveredTip] = useState(null);

  const tips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important updates.",
    "Notes to all enrolled students at once."
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="w-full max-w-full lg:max-w-[400px] h-fit bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 rounded-xl shadow-xl border border-richblack-600/30 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-richblack-700/80 to-richblack-800 border-b border-richblack-600/50 px-5 py-4">
        {/* Mobile Expandable Header */}
        <div className="flex items-center justify-between lg:hidden">
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-1 rounded-full bg-yellow-200 opacity-30 blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <BsLightningChargeFill className="relative text-xl text-yellow-100" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-100 to-yellow-200 text-transparent bg-clip-text">
              Course Upload Tips
            </span>
          </motion.div>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-richblack-700 hover:bg-richblack-600 text-yellow-100 transition-all duration-300 border border-richblack-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
          </motion.button>
        </div>

        {/* Desktop Header */}
        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-1 rounded-full bg-yellow-200 opacity-30 blur-sm"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <BsLightningChargeFill className="relative text-2xl text-yellow-100" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-100 to-yellow-200 text-transparent bg-clip-text">
            Course Upload Tips
          </span>
        </motion.div>
      </div>

      {/* Tips Content */}
      <div className="px-5 py-4">
        <AnimatePresence>
          {(isExpanded || window.innerWidth >= 1024) && (
            <motion.ul
              className="space-y-3"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.3 }
              }}
            >
              {tips.map((tip, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start py-2 px-3 rounded-lg transition-all duration-300"
                  variants={itemVariants}
                  style={{
                    backgroundColor: hoveredTip === index ? 'rgba(71, 85, 105, 0.3)' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredTip(index)}
                  onMouseLeave={() => setHoveredTip(null)}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="mt-0.5 text-yellow-100"
                    initial={{ scale: 1 }}
                    animate={hoveredTip === index ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 10, 0],
                      transition: { duration: 0.5 }
                    } : {}}
                  >
                    {hoveredTip === index ?
                      <HiLightBulb className="text-lg" /> :
                      <HiOutlineLightBulb className="text-lg" />
                    }
                  </motion.div>
                  <span className="text-sm text-richblack-50">{tip}</span>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Mobile View Collapsed Teaser */}
        {!isExpanded && window.innerWidth < 1024 && (
          <motion.div
            className="text-center py-2 text-sm text-richblack-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tap to see {tips.length} helpful tips
            {/* <motion.div 
                            className="mx-auto mt-1 text-yellow-100"
                            animate={{ 
                                y: [0, 3, 0],
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                            }}
                        >
                            <FaAngleDown />
                        </motion.div> */}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}