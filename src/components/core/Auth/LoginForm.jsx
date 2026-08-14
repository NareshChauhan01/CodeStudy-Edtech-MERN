import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yellow } from "@mui/material/colors";

import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await login(formData.email, formData.password, dispatch, navigate)
    setIsLoading(false)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      onSubmit={submitHandler}
      className="w-full flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Email Input */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        <label htmlFor="mail" className="text-richblack-5 font-medium text-sm">
          Email Address <sup className="text-pink-300">*</sup>
        </label>
        <div className="relative">
          <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
          <input
            required
            onChange={changeHandler}
            placeholder="Enter Email Address"
            id="mail"
            name="email"
            type="email"
            value={formData.email}
            className="w-full py-3 rounded-lg pl-10 pr-5 bg-richblack-800 outline-none border border-richblack-700 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Password Input */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        <label htmlFor="pass" className="text-richblack-5 font-medium text-sm">
          Password <sup className="text-pink-300">*</sup>
        </label>
        <div className="relative">
          <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
          <input
            required
            onChange={changeHandler}
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            id="pass"
            name="password"
            value={formData.password}
            className="w-full py-3 rounded-lg pl-10 pr-12 bg-richblack-800 outline-none border border-richblack-700 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
          />
          <motion.button
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-richblack-300 hover:text-richblack-100"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Hide password" : "Show password"}
            whileHover={{ text: yellow }}
          // whileTap={{ scale: 0.9 }}
          >
            {showPass ? (
              <IoEyeOutline className="text-lg" />
            ) : (
              <IoEyeOffOutline className="text-lg" />
            )}
          </motion.button>
        </div>
        <div className="flex justify-end">
          <motion.button
            type="button"
            className="text-blue-200 text-sm hover:text-yellow-50 transition-colors duration-200"
            onClick={() => navigate("/forgot-password")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Forgot Password?
          </motion.button>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full py-3 mt-4 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg text-richblack-900 font-semibold transition-all duration-300 shadow-sm shadow-yellow-200/10"
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(255, 214, 10, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </motion.button>
    </motion.form>
  );
};

export default LoginForm;