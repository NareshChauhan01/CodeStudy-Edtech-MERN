import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BiUser } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { setSignupData } from "../../../redux/slices/authSlice";
import { sendotp } from "../../../services/operations/authAPI";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const users = ["Student", "Instructor"];

  const [accountType, setAccountType] = useState(users[0]);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    if (formData.password === formData.confirmPassword) {
      const signupData = {
        ...formData,
        accountType,
      };

      // setting signup data to state that will be used after otp verification
      dispatch(setSignupData(signupData));

      // send otp to user for verification
      dispatch(sendotp(formData.email, navigate))
        .finally(() => {
          setIsLoading(false);
        });

      // reset formData for future use
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setAccountType(users[0]);
    } else {
      toast.error("Passwords do not match");
      setIsLoading(false);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
      className="w-full flex flex-col gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Account Type Toggle */}
      <motion.div
        variants={itemVariants}
        className="relative border border-richblack-600 bg-richblack-800 rounded-full p-1 w-full max-w-[320px] mx-auto my-2"
      >
        <div className="relative z-0 flex w-full">
          <span
            className={`absolute inset-0 z-0 ${accountType === users[0] ? "translate-x-0" : "translate-x-full"
              } rounded-full bg-richblack-900 transition-all duration-300 ease-in-out`}
            style={{ width: "50%" }}
          ></span>

          {users.map((user, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => setAccountType(user)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-center transition-colors duration-300 ${accountType === user
                  ? "text-yellow-50 font-medium"
                  : "text-richblack-300"
                }`}
              whileHover={{ scale: accountType !== user ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {user === "Student" ? (
                <FaUserGraduate className={accountType === user ? "text-yellow-100" : ""} />
              ) : (
                <FaUserAlt className={accountType === user ? "text-yellow-100" : ""} />
              )}
              <span>{user}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Name Fields - Responsive Layout */}
      <div className="flex flex-col sm:flex-row gap-5">
        <motion.div className="flex flex-col gap-2 flex-1" variants={itemVariants}>
          <label htmlFor="fName" className="text-richblack-5 font-medium text-sm">
            First Name <sup className="text-pink-300">*</sup>
          </label>
          <div className="relative">
            <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              required
              placeholder="Enter First Name"
              id="fName"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              className="w-full py-3 rounded-lg pl-10 pr-4 bg-richblack-800 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
            />
          </div>
        </motion.div>

        <motion.div className="flex flex-col gap-2 flex-1" variants={itemVariants}>
          <label htmlFor="lName" className="text-richblack-5 font-medium text-sm">
            Last Name <sup className="text-pink-300">*</sup>
          </label>
          <div className="relative">
            <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              required
              placeholder="Enter Last Name"
              id="lName"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              className="w-full py-3 rounded-lg pl-10 pr-4 bg-richblack-800 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
            />
          </div>
        </motion.div>
      </div>

      {/* Email Field */}
      <motion.div className="flex flex-col gap-2" variants={itemVariants}>
        <label htmlFor="mail" className="text-richblack-5 font-medium text-sm">
          Email Address <sup className="text-pink-300">*</sup>
        </label>
        <div className="relative">
          <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
          <input
            required
            placeholder="Enter Email Address"
            id="mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full py-3 rounded-lg pl-10 pr-4 bg-richblack-800 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Password Fields - Responsive Layout */}
      <div className="flex flex-col sm:flex-row gap-5">
        <motion.div className="relative flex flex-col gap-2 flex-1" variants={itemVariants}>
          <label htmlFor="pass" className="text-richblack-5 font-medium text-sm">
            Create Password <sup className="text-pink-300">*</sup>
          </label>

          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              required
              type={showPass1 ? "text" : "password"}
              placeholder="Enter Password"
              id="pass"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full py-3 rounded-lg pl-10 pr-12 bg-richblack-800 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
            />
            <motion.button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-richblack-300 hover:text-richblack-100"
              onClick={() => setShowPass1(!showPass1)}
              aria-label={showPass1 ? "Hide password" : "Show password"}
            >
              {showPass1 ? (
                <IoEyeOutline className="text-lg" />
              ) : (
                <IoEyeOffOutline className="text-lg" />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="relative flex flex-col gap-2 flex-1" variants={itemVariants}>
          <label htmlFor="cPass" className="text-richblack-5 font-medium text-sm">
            Confirm Password <sup className="text-pink-300">*</sup>
          </label>

          <div className="relative">
            <RiLockPasswordLine className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400" />
            <input
              required
              type={showPass2 ? "text" : "password"}
              placeholder="Confirm Password"
              id="cPass"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="w-full py-3 rounded-lg pl-10 pr-12 bg-richblack-800 outline-none border border-richblack-600 text-richblack-50 focus:border-yellow-50 transition-all duration-200"
            />
            <motion.button
              type="button"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-richblack-300 hover:text-richblack-100"
              onClick={() => setShowPass2(!showPass2)}
              aria-label={showPass2 ? "Hide password" : "Show password"}
            >
              {showPass2 ? (
                <IoEyeOutline className="text-lg" />
              ) : (
                <IoEyeOffOutline className="text-lg" />
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

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
            <span>Creating Account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </motion.button>
    </motion.form>
  );
};

export default SignupForm;