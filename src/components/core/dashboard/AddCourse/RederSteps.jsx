import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { FaCheck } from "react-icons/fa";

import { PublishCourse } from "./PublishCourse/PublishCourse";
import { CourseBuilderForm } from "./CourseBuilder/CourseBuilderForm";
import { CourseInformationForm } from "./CourseInformation/CourseInformationForm";

export function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Modern Steps indicator */}
      <div className="relative mb-8 sm:mb-12 flex w-full justify-center">
        <div className="absolute top-3.75 sm:top-5 left-0 w-full h-1.5 bg-richblack-700 rounded-full">
          <motion.div
            className="h-full bg-linear-to-r from-yellow-600 to-yellow-300 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: step === 1 ? '0%' : step === 2 ? '50%' : '100%'
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center z-10">
              <motion.div
                className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${step === item.id
                    ? "border-yellow-50 bg-yellow-500 text-richblack-900"
                    : step > item.id
                      ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                      : "border-richblack-600 bg-richblack-700 text-richblack-300"
                  }`}
                initial={{ scale: 0.8 }}
                animate={{
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileHover={step >= item.id ? { scale: 1.1 } : {}}
              >
                {step > item.id ? (
                  <FaCheck className="text-sm sm:text-base" />
                ) : (
                  <span className="text-sm sm:text-base font-semibold">{item.id}</span>
                )}

                {/* Pulse animation for current step */}
                {step === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-yellow-400"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                      opacity: [0.5, 0.4, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.div>

              <motion.p
                className={`mt-2 sm:mt-3 text-xs sm:text-sm text-center font-medium px-1 ${step >= item.id ? "text-yellow-50" : "text-richblack-500"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * item.id }}
              >
                {item.title}
              </motion.p>
            </div>

            {item.id !== steps.length && (
              <div className="w-[20%] sm:w-[30%] lg:w-[35%]" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Render specific component based on current step with animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
          {step === 1 && <CourseInformationForm />}
          {step === 2 && <CourseBuilderForm />}
          {step === 3 && <PublishCourse />}
        </motion.div>
      </AnimatePresence>
    </>
  )
}