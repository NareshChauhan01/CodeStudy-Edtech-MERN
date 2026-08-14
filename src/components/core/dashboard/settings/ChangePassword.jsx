import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { FiLock, FiSave } from "react-icons/fi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { changePassword } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";

export function ChangePassword() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [showPass1, setshowPass1] = useState(false);
  const [showPass2, setshowPass2] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty }
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        password: "",
        newPassword: ""
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitHandler = async (data) => {
    if (user?.email === "student@mail.com" || user?.email === "instructor@mail.com") {
      toast.error("This is a demo account. You cannot modify the data.")
      return;
    }

    await changePassword(data, token, navigate);
  }

  const inputClasses = "py-3 rounded-lg pl-4 pr-10 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-50 transition-all duration-200 text-richblack-50 text-sm";
  const labelClasses = "text-richblack-5 font-medium text-sm";
  const errorClasses = "text-xs text-pink-300 mt-1";

  return (
    <motion.form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full p-6 sm:p-8 bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl shadow-md border border-richblack-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-richblack-700">
        <FiLock className="text-yellow-50 text-xl" />
        <h3 className="text-lg sm:text-xl font-bold text-richblack-5">Password</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* Current Password */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className={labelClasses}>
            Current Password<sup className="text-pink-300">*</sup>
          </label>
          <div className="relative">
            <input
              type={showPass1 ? "text" : "password"}
              placeholder="Enter current password"
              id="password"
              {...register("password", { required: "Current password is required" })}
              className={`${inputClasses} w-full ${errors.password ? "border-pink-300" : ""}`}
            />
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-yellow-50 transition-colors"
              onClick={() => setshowPass1(!showPass1)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showPass1 ? (
                  <motion.div
                    key="eye-open"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoEyeOutline size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye-closed"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoEyeOffOutline size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          {errors.password && (
            <span className={errorClasses}>{errors.password.message}</span>
          )}
        </div>

        {/* New Password */}
        <div className="relative flex flex-col gap-1">
          <label htmlFor="newPassword" className={labelClasses}>
            New Password<sup className="text-pink-300">*</sup>
          </label>
          <div className="relative">
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Enter new password"
              id="newPassword"
              {...register("newPassword", { required: "New password is required" })}
              className={`${inputClasses} w-full ${errors.newPassword ? "border-pink-300" : ""}`}
            />
            <motion.button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-300 hover:text-yellow-50 transition-colors"
              onClick={() => setshowPass2(!showPass2)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showPass2 ? (
                  <motion.div
                    key="eye-open"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoEyeOutline size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye-closed"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoEyeOffOutline size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          {errors.newPassword && (
            <span className={errorClasses}>{errors.newPassword.message}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <motion.button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-50 rounded-md border border-richblack-600 transition-all shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>

        <motion.button
          type="submit"
          disabled={!isDirty}
          className={`px-5 py-2 rounded-md flex items-center gap-2 shadow-sm ${!isDirty
            ? "bg-yellow-100/50 text-richblack-500 cursor-not-allowed"
            : "bg-yellow-50 hover:bg-yellow-100 text-richblack-900"
            }`}
          whileHover={isDirty ? { scale: 1.02 } : {}}
          whileTap={isDirty ? { scale: 0.98 } : {}}
        >
          <span>Update</span>
          <FiSave />
        </motion.button>
      </div>
    </motion.form>
  );
}