import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdHistory, MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { sendotp, signUp } from "../../../services/operations/authAPI";

export function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    // accessible only if signup data is filled!
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    ).finally(() => setIsLoading(false));
  }

  const handleResendOtp = () => {
    setIsLoading(true);
    dispatch(sendotp(signupData.email, navigate))
      .finally(() => setIsLoading(false));
  };

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
        className="w-11/12 sm:w-125 p-8 rounded-xl border border-richblack-700 bg-richblack-800 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorations */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-xl z-0"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-linear-to-br from-yellow-500/10 to-transparent rounded-full blur-xl z-0"></div>

        <div className="relative z-10">
          <motion.div
            className="w-16 h-16 mx-auto mb-8 bg-linear-to-br from-yellow-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-richblack-600"
            variants={itemVariants}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }}
            >
              <MdEmail className="text-4xl text-yellow-50" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-richblack-5 mb-3 text-center"
            variants={itemVariants}
          >
            Verify Email
          </motion.h2>

          <motion.p
            className="text-richblack-200 mb-8 text-center"
            variants={itemVariants}
          >
            A verification code has been sent to <span className="text-yellow-50 font-medium">{signupData?.email}</span>
          </motion.p>

          <motion.form
            onSubmit={submitHandler}
            className="flex flex-col gap-6"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center gap-5">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <motion.input
                    {...props}
                    placeholder=""
                    className="bg-richblack-900 rounded-lg min-w-10 lg:min-w-12.5 aspect-square  text-lg text-center border border-richblack-600 text-richblack-25 focus:outline-none focus:ring-2 focus:ring-yellow-50 mx-1"
                    whileFocus={{ scale: 1.05 }}
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              />
              <p className="text-sm text-richblack-300">Enter the 6-digit code sent to your email</p>
            </div>

            <motion.button
              type="submit"
              className="w-full py-3 mt-2 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg text-richblack-900 font-semibold transition-all duration-300 shadow-sm"
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(255, 214, 10, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </motion.button>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <Link to="/signup">
                <motion.div
                  className="flex items-center gap-2 text-richblack-100 hover:text-yellow-50 transition-all duration-200"
                  whileHover={{ x: -5 }}
                >
                  <HiArrowNarrowLeft />
                  <span>Back to Signup</span>
                </motion.div>
              </Link>

              <motion.div
                onClick={handleResendOtp}
                className="flex items-center gap-2 text-blue-200 hover:text-yellow-50 cursor-pointer transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdHistory className="text-lg" />
                <span>{isLoading ? "Sending..." : "Resend OTP"}</span>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}