import React from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import frameImg from "../../../assests/images/frame.png";

const Template = ({ heading, description1, description2, image, formType }) => {
  return (
    <div className={`min-h-screen w-11/12 lg:w-10/12 max-w-maxContent mx-auto py-20 flex flex-col lg:flex-row lg:justify-between justify-center items-center lg:items-start lg:gap-20`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-[45%] max-w-125 order-2 lg:order-1"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {heading}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-lg text-richblack-300 mb-3">{description1}</p>
          <p className="text-lg font-medium text-blue-100 italic mb-8">{description2}</p>
        </motion.div>

        {/* Form container with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative"
        >
          {/* Form background decorations */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-xl z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-linear-to-br from-yellow-500/10 to-transparent rounded-full blur-xl z-0"></div>

          {/* Render the appropriate form based on formType */}
          <div className="relative backdrop-blur-sm rounded-xl shadow-md shadow-richblack-800/50 border border-richblack-700 p-6 z-10">
            {formType === "logIn" ? <LoginForm /> : <SignupForm />}
          </div>
        </motion.div>
      </motion.div>

      {/* Image Section with animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full lg:w-[45%] max-w-137.5 mt-10 lg:mt-0 order-1 lg:order-2 hidden lg:block"
      >
        <motion.img
          src={frameImg}
          alt="Frame"
          loading="lazy"
          className="w-full h-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        />
        <motion.img
          src={image}
          loading="lazy"
          alt="Authentication illustration"
          className="absolute top-4 right-4 w-[97%] h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-yellow-500/10 to-transparent rounded-full blur-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default Template;