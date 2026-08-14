import React from "react";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaShareSquare } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { HiOutlineShoppingCart, HiOutlinePlay } from "react-icons/hi";

import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addCourseToCart } from "../../../services/operations/profileAPI";
import { buyCourse } from "../../../services/operations/studentFeaturesAPI";
import { setCart, setTotalAmount, setTotalItems } from "../../../redux/slices/cartSlice";

export function CourseCard({ courseId, courseData, setConfirmationModal }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const handleBuyCourse = async () => {
    if (token) {
      await buyCourse(
        token,
        [courseId],
        user,
        navigate,
        dispatch
      )
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course",
      btn1text: "Log In",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null)
    })
  }

  const handleAddToCart = async () => {
    if (user) {
      if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        toast.error("You are an Instructor. You can't buy a course")
        return
      }

      const result = await addCourseToCart({ courseId }, token)

      if (result) {
        const totalItems = result.length
        const totalAmount = result.reduce((total, item) => total + item.price, 0);

        dispatch(setCart(result))
        dispatch(setTotalItems(totalItems))
        dispatch(setTotalAmount(totalAmount))
        return
      }
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1text: "Log In",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null)
    })
  }

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  return (
    <div className="z-10 mt-20 lg:mt-0 w-full sticky top-10">
      <motion.div
        className="bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl overflow-hidden z-10 shadow-xl border border-richblack-700 hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Course Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden group">
          <img
            loading="lazy"
            src={courseData?.thumbnail}
            alt={courseData?.courseName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

          {/* Play button overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              className="w-16 h-16 rounded-full bg-yellow-50 bg-opacity-90 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlinePlay className="text-richblack-900 text-3xl ml-1" />
            </motion.div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">{`₹ ${courseData?.price || 0}`}</p>
                {/* You can add original price here if you have it */}
                {/* <p className="text-sm text-richblack-300 line-through">₹ {courseData?.originalPrice || 0}</p> */}
              </div>

              <div className="bg-caribbeangreen-100 text-caribbeangreen-800 text-sm font-medium px-3 py-1 rounded-full">
                30% Off
              </div>
            </div>

            <div className="text-xs text-richblack-300 mt-1">
              <span className="text-yellow-100">Limited time offer</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={
                user && courseData?.studentEnrolled?.includes(user?._id) ?
                  () => navigate("/dashboard/enrolled-courses") :
                  () => handleBuyCourse()
              }
              className="cursor-pointer w-full py-3.5 bg-linear-to-r from-yellow-50 to-yellow-100 text-richblack-900 rounded-lg font-semibold hover:from-yellow-100 hover:to-yellow-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {user && courseData?.studentEnrolled?.includes(user?._id) ? (
                <>
                  <HiOutlinePlay className="text-lg" />
                  <span>Go To Course</span>
                </>
              ) : (
                <>
                  <span>Buy Now</span>
                </>
              )}
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-richblack-700 hover:bg-richblack-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-richblack-600"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <HiOutlineShoppingCart className="text-lg" />
              <span>Add To Cart</span>
            </motion.button>
          </div>

          {/* Money back guarantee */}
          <div className="flex items-center justify-center bg-richblack-700 bg-opacity-50 py-2 rounded-lg">
            <p className="text-center text-sm text-richblack-100 flex items-center gap-2">
              <BsCheckCircleFill className="text-caribbeangreen-300" />
              30 Days Money Back Guarantee
            </p>
          </div>

          {/* Course Includes */}
          <div className="border-t border-richblack-700 pt-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-yellow-50 rounded-full inline-block mr-1"></span>
              This Course Includes:
            </h3>
            <ul className="space-y-3">
              {[
                "12 hours on-demand video",
                "Full lifetime access",
                "Access on mobile and TV",
                "Certificate of completion"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-sm text-richblack-50"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.2 }}
                >
                  <BiSolidRightArrow className="text-caribbeangreen-200 text-xs" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Share button */}
          <motion.button
            onClick={handleShare}
            className="w-full flex items-center justify-center cursor-pointer gap-2 py-3 text-yellow-100 font-medium hover:bg-richblack-700 rounded-lg transition-all duration-300 border border-richblack-700 border-dashed"
            whileHover={{ backgroundColor: "rgba(71, 85, 105, 0.3)" }}
          >
            <FaShareSquare />
            <span>Share Course</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}