import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

// Icons
import { FiSend } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";

import countryCode from "../../data/countrycode"
import sendEnquiry from "../../services/operations/enquiryAPI"

export function ContactTemplate({ title, desc }) {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      })
      setIsSubmitting(false);
    }
  }, [reset, isSubmitSuccessful])

  function submitHandler(data) {
    // console.log("Form Data is -> ", data)
    setIsSubmitting(true);
    dispatch(sendEnquiry(data))
  }

  // Animation variants
  const formVariants = {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={formVariants}
      onSubmit={handleSubmit(submitHandler)}
      className="w-full max-w-200 px-6 sm:px-10 md:px-16 py-10 sm:py-14 md:py-20 flex flex-col gap-6 sm:gap-7 
                      bg-linear-to-br from-richblack-800 to-richblack-900 
                      border border-richblack-600 rounded-2xl shadow-lg
                      relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-yellow-50 opacity-[0.03] rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500 opacity-[0.03] rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl"></div>

      <motion.div
        className="flex flex-col gap-4 sm:gap-5 mb-4"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-richblack-200 max-w-[90%]">
          {desc}
        </p>
      </motion.div>

      {/* Name Fields (Responsive) */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        variants={itemVariants}
      >
        <div className="w-full flex flex-col gap-1.5">
          <label htmlFor="fName" className="text-richblack-5 text-sm sm:text-base flex items-center gap-2">
            <HiOutlineUser className="text-yellow-50" />
            First Name <sup className="text-pink-300">*</sup>
          </label>

          <input
            placeholder="Enter First Name"
            id="fName"
            name="firstName"
            {...register("firstName", { required: true })}
            className="py-3 rounded-lg px-4 bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base transition-all duration-200"
          />
          {errors.firstName && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-300 text-xs mt-1"
            >
              First name is required
            </motion.span>
          )}
        </div>

        <div className="w-full flex flex-col gap-1.5">
          <label htmlFor="lName" className="text-richblack-5 text-sm sm:text-base flex items-center gap-2">
            <HiOutlineUser className="text-yellow-50" /> Last Name
          </label>
          <input
            placeholder="Enter Last Name"
            id="lName"
            name="lastName"
            {...register("lastName")}
            className="py-3 rounded-lg px-4 bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Email Field */}
      <motion.div
        className="flex flex-col gap-1.5"
        variants={itemVariants}
      >
        <label htmlFor="mail" className="text-richblack-5 text-sm sm:text-base flex items-center gap-2">
          <HiOutlineMail className="text-yellow-50" />
          Email Address <sup className="text-pink-300">*</sup>
        </label>
        <input
          type="email"
          placeholder="Enter Email Address"
          id="mail"
          name="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}
          className="py-3 rounded-lg px-4 bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base transition-all duration-200"
        />
        {errors.email?.type === "required" && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-xs mt-1"
          >
            Email is required
          </motion.span>
        )}
        {errors.email?.type === "pattern" && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-xs mt-1"
          >
            Please enter a valid email
          </motion.span>
        )}
      </motion.div>

      {/* Phone Field */}
      <motion.div
        className="flex flex-col gap-1.5"
        variants={itemVariants}
      >
        <label htmlFor="phone" className="text-richblack-5 text-sm sm:text-base flex items-center gap-2">
          <HiOutlinePhone className="text-yellow-50" />
          Phone Number <sup className="text-pink-300">*</sup>
        </label>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <select className="w-full sm:w-30 px-4 py-3 rounded-lg bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base transition-all duration-200 appearance-none sm:appearance-auto">
            {
              countryCode.map((element, index) => (
                <option key={index} value={element.code}>
                  {element.code} {" - "} {element.country}
                </option>
              ))
            }
          </select>

          <input
            type="number"
            placeholder="1234567890"
            id="phone"
            name="phone"
            {...register("phone", {
              required: true,
              minLength: 10,
              maxLength: 10
            })}
            className="w-full py-3 rounded-lg px-4 bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base transition-all duration-200"
          />
        </div>
        {errors.phone?.type === "required" && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-xs mt-1"
          >
            Phone number is required
          </motion.span>
        )}
        {(errors.phone?.type === "minLength" || errors.phone?.type === "maxLength") && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-xs mt-1"
          >
            Phone number must be 10 digits
          </motion.span>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div
        className="flex flex-col gap-1.5"
        variants={itemVariants}
      >
        <label htmlFor="message" className="text-richblack-5 text-sm sm:text-base flex items-center gap-2">
          <MdOutlineMessage className="text-yellow-50" />
          Message <sup className="text-pink-300">*</sup>
        </label>
        <textarea
          type="text"
          placeholder="Enter your message here"
          id="message"
          name="message"
          rows="4"
          {...register("message", { required: true })}
          className="py-3 rounded-lg px-4 bg-richblack-800 outline-none focus:outline-none focus:ring-1 focus:ring-yellow-50 border-b-2 border-richblack-600 text-richblack-50 text-sm sm:text-base resize-none transition-all duration-200"
        />
        {errors.message && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-300 text-xs mt-1"
          >
            Please enter your message
          </motion.span>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 mt-2 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 rounded-lg text-richblack-900 font-semibold shadow-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="h-5 w-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <FiSend className="text-lg" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>
    </motion.form>
  )
}