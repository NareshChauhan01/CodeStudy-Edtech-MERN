import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiSettings, FiTrash2 } from "react-icons/fi";

import { ChangePassword } from "./ChangePassword";
import { ChangeProfileImg } from "./ChangeProfileImg";
import { ProfileInformation } from "./ProfileInformation";
import { logout } from "../../../../services/operations/authAPI";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";

export function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteAccountHandler = async () => {
    if (user?.email === "student@mail.com" || user?.email === "instructor@mail.com") {
      toast.error("This is a demo account. You cannot modify the data.")
      return;
    }

    try {
      await deleteAccount(token, dispatch, navigate)
      await logout(dispatch, navigate)
    }
    catch (error) {
      console.error(error)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 pb-10 pt-10 md:pt-20 lg:pt-20 flex flex-col gap-6 sm:gap-8 md:gap-10 text-richblack-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center gap-4 pb-2 border-b border-richblack-700"
        variants={itemVariants}
      >
        <FiSettings className="text-3xl text-yellow-50" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
          Edit Profile
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* Profile Picture Section */}
        <motion.div variants={itemVariants}>
          <ChangeProfileImg />
        </motion.div>

        {/* Profile Information */}
        <motion.div variants={itemVariants}>
          <ProfileInformation />
        </motion.div>

        {/* Password Section */}
        <motion.div variants={itemVariants}>
          <ChangePassword />
        </motion.div>

        {/* Delete Account Section */}
        <motion.div
          variants={itemVariants}
          className="w-full rounded-xl overflow-hidden bg-gradient-to-r from-pink-900 to-pink-800 shadow-xl"
        >
          <div className="p-5 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8">
            <div className="w-fit h-fit p-3 sm:p-4 flex items-center justify-center aspect-square rounded-full bg-pink-700/70 shadow-inner shadow-pink-950">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiTrash2 className="text-2xl sm:text-3xl md:text-4xl text-pink-300" />
              </motion.div>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-xl sm:text-2xl font-bold">Delete Account</h3>

              <div className="flex flex-col gap-2 text-sm sm:text-base text-pink-100/90">
                <p>Would you like to delete account?</p>

                <p>
                  This account may contain Paid Courses. Deleting your account is
                  permanent and will remove all the content associated with it.
                </p>
              </div>

              {!showDeleteConfirm ? (
                <motion.button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-fit mt-2 italic text-pink-300 hover:text-pink-200 cursor-pointer flex items-center gap-2 transition-all"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  I want to delete my account
                </motion.button>
              ) : (
                <div className="mt-2 flex flex-wrap gap-3">
                  <motion.button
                    onClick={deleteAccountHandler}
                    className="px-4 py-2 bg-pink-700 hover:bg-pink-600 text-white rounded-md shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Delete
                  </motion.button>

                  <motion.button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-white rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}