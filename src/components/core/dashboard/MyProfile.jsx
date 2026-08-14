import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RiEditBoxLine } from "react-icons/ri";
import { FiUser, FiInfo, FiMail, FiPhone } from "react-icons/fi";

export function MyProfile() {
  const { user } = useSelector((state) => state.profile);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const infoItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="w-full max-w-250 mx-auto pt-10 pb-10 md:pt-20 lg:pt-20 px-4 flex flex-col gap-8 text-richblack-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center gap-3"
        variants={itemVariants}
      >
        <FiUser className="text-3xl text-yellow-50" />
        <h1 className="text-3xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
          My Profile
        </h1>
      </motion.div>

      <div className="flex flex-col gap-8">
        {/* Profile Card */}
        <motion.div
          className="w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 shadow-lg"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {user?.image ? (
                <motion.div
                  className="w-28 h-28 rounded-full overflow-hidden border-2 border-yellow-50/30 shadow-xl"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={user?.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                    className="w-28 h-28 rounded-full bg-linear-to-br from-richblack-700 to-richblack-800 flex items-center justify-center border-2 border-yellow-50/30 shadow-xl"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <span className="text-4xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
                    {user?.firstName?.charAt(0)}
                  </span>
                </motion.div>
              )}

              <motion.div
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-caribbeangreen-300 border-2 border-richblack-800 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
              >
                <motion.div
                  className="h-3 w-3 rounded-full bg-caribbeangreen-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
            </motion.div>

            <div className="flex flex-col items-center md:items-start">
              <motion.h2
                className="font-bold text-2xl md:text-3xl bg-linear-to-r from-white to-richblack-200 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {user?.firstName} {user?.lastName}
              </motion.h2>
              <motion.p
                className="text-richblack-300 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FiMail className="text-yellow-50" />
                {user?.email}
              </motion.p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/dashboard/settings"
              className="group flex gap-2 items-center bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-md"
            >
              <RiEditBoxLine className="text-lg group-hover:rotate-12 transition-transform" />
              <span>Edit Profile</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Personal Details Card */}
        <motion.div
          className="w-full p-6 md:p-8 flex flex-col gap-8 bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 shadow-lg"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-richblack-700 pb-4">
            <motion.div
              className="flex items-center gap-3"
              variants={infoItemVariants}
            >
              <FiInfo className="text-2xl text-yellow-50" />
              <h3 className="font-bold text-2xl">Personal Details</h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard/settings"
                className="group flex gap-2 items-center bg-richblack-700 hover:bg-richblack-600 text-richblack-50 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium border border-richblack-600"
              >
                <RiEditBoxLine className="text-lg group-hover:rotate-12 transition-transform" />
                <span>Edit</span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16">
            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                First Name
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700">
                {user?.firstName || "Not Added"}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                Last Name
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700">
                {user?.lastName || "Not Added"}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                Date of Birth
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700">
                {user?.additionalDetails?.dateOfBirth || "Not Added"}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                Gender
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700">
                {user?.additionalDetails?.gender || "Not Added"}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                Email
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700 flex items-center gap-2">
                <FiMail className="text-richblack-300" />
                {user?.email}
              </p>
            </motion.div>

            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <p className="text-sm text-yellow-50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-50"></span>
                Phone Number
              </p>
              <p className="font-medium lg:text-lg text-sm pl-4 border-l-2 border-richblack-700 flex items-center gap-2">
                <FiPhone className="text-richblack-300" />
                {user?.additionalDetails?.contactNumber || "Not Added"}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="w-full p-6 md:p-8 flex flex-col gap-8 bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl border border-richblack-700 shadow-lg"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-richblack-700 pb-4">
            <motion.div
              className="flex items-center gap-3"
              variants={infoItemVariants}
            >
              <FiInfo className="text-2xl text-yellow-50" />
              <h3 className="font-bold text-2xl">About</h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard/settings"
                className="group flex gap-2 items-center bg-richblack-700 hover:bg-richblack-600 text-richblack-50 px-5 py-2.5 rounded-lg transition-all duration-300 font-medium border border-richblack-600"
              >
                <RiEditBoxLine className="text-lg group-hover:rotate-12 transition-transform" />
                <span>Edit</span>
              </Link>
            </motion.div>
          </div>

          <div className="">
            <motion.div
              className="space-y-2 p-4 rounded-lg hover:bg-richblack-700/40 transition-colors"
              variants={infoItemVariants}
            >
              <div className="font-medium lg:text-lg text-sm font-mono flex gap-2">
                {/* <span className="text-3xl text-yellow-50/10 font-serif">"</span> */}
                <span>{user?.additionalDetails?.about || "Not Added"}</span>
                {/* <span className="items-end text-3xl text-yellow-50/10 font-serif">"</span> */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}