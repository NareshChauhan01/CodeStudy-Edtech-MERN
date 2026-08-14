import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiMail, HiArrowNarrowLeft } from "react-icons/hi";
import { resetPasswordToken } from "../services/operations/resetPasswordAPI";

export function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    dispatch(resetPasswordToken(email, setEmailSent))
      .finally(() => setIsLoading(false));
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center py-12">
      <motion.div
        className="w-11/12 sm:w-[500px] p-8 rounded-xl border border-richblack-700 bg-richblack-800 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorations */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl z-0"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-xl z-0"></div>

        <div className="relative z-10">
          <motion.h2
            className="text-3xl font-bold text-richblack-5 mb-4"
            variants={itemVariants}
          >
            {!emailSent ? "Reset your password" : "Check your email"}
          </motion.h2>

          <motion.p
            className="text-richblack-200 mb-8"
            variants={itemVariants}
          >
            {!emailSent
              ? "Don't worry, we'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We've sent reset instructions to ${email}`}
          </motion.p>

          <motion.form
            onSubmit={submitHandler}
            className="flex flex-col gap-6"
            variants={itemVariants}
          >
            {!emailSent && (
              <div className="flex flex-col gap-2">
                <label htmlFor="mail" className="text-richblack-5 font-medium text-sm">
                  Email Address <sup className="text-pink-300">*</sup>
                </label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
                  <input
                    required
                    type="email"
                    placeholder="Enter your email address"
                    id="mail"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 rounded-lg pl-10 pr-4 bg-richblack-900 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 mt-2 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg text-richblack-900 font-semibold transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(255, 214, 10, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>{emailSent ? "Resending..." : "Submitting..."}</span>
                </div>
              ) : (
                emailSent ? "Resend Email" : "Reset Password"
              )}
            </motion.button>

            <motion.div variants={itemVariants}>
              <Link to="/login">
                <motion.div
                  className="flex items-center gap-2 text-richblack-100 hover:text-yellow-50 transition-all duration-200 mt-2"
                  whileHover={{ x: -5 }}
                >
                  <HiArrowNarrowLeft />
                  <span>Back to login</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}