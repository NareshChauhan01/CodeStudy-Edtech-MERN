import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiShoppingBag, FiTag, FiCreditCard } from "react-icons/fi";

import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { setCart, setTotalAmount, setTotalItems } from "../redux/slices/cartSlice";
import { getCartCourses, removeCourseFromCart } from "../services/operations/profileAPI";

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { cart, totalAmount, totalItems } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(true)
  const [removingCourseId, setRemovingCourseId] = useState(null)

  useEffect(() => {
    const fetchCartCourses = async () => {
      setLoading(true)
      try {
        const result = await getCartCourses(token)

        if (result) {
          const totalItems = result.length
          const totalAmount = result.reduce((total, item) => total + item.price, 0);

          dispatch(setCart(result))
          dispatch(setTotalItems(totalItems))
          dispatch(setTotalAmount(totalAmount))
        }
        // console.log("Cart Course -> ", result)
      } catch (error) {
        console.error("Error fetching cart:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCartCourses()
  }, [dispatch, token])

  const handleRemoveCourseFromCart = async (courseId) => {
    setRemovingCourseId(courseId)
    try {
      const result = await removeCourseFromCart({ courseId }, token)

      if (result) {
        const totalItems = result.length
        const totalAmount = result.reduce((total, item) => total + item.price, 0);

        dispatch(setCart(result))
        dispatch(setTotalItems(totalItems))
        dispatch(setTotalAmount(totalAmount))
      }
    } catch (error) {
      console.error("Error removing course:", error)
    } finally {
      setRemovingCourseId(null)
    }
  }

  const handleCheckOutNow = async () => {
    try {
      await buyCourse(
        token,
        cart,
        user,
        navigate,
        dispatch
      )
    } catch (error) {
      console.error("Error during checkout:", error)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center bg-richblack-900">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-richblack-700 border-t-yellow-50 animate-spin"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-yellow-50 animate-spin" style={{ animationDuration: '1s' }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] max-w-250 mx-auto rounded-lg bg-linear-to-b from-richblack-900 to-richblack-800 mb-5 pt-10 pb-10 md:pt-20 lg:pt-20 px-4">
      <motion.div
        className="max-w-250 mx-auto flex flex-col gap-8 text-richblack-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center gap-3"
          variants={itemVariants}
        >
          <div className="p-3 bg-linear-to-br from-richblack-700 to-richblack-900 rounded-full shadow-lg border border-richblack-600">
            <FiShoppingBag className="text-3xl text-yellow-50" />
          </div>
          <h1 className="font-bold text-3xl bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
            Shopping Cart
          </h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {cart && totalItems > 0 ? (
            <motion.div
              key="cart-items"
              className="flex flex-col lg:flex-row gap-8"
              variants={itemVariants}
            >
              {/* Cart items section */}
              <div className="flex-1">
                <motion.div
                  className="flex justify-between items-center pb-4 border-b border-richblack-600"
                  variants={itemVariants}
                >
                  <p className="text-richblack-300 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-yellow-50 text-richblack-900 rounded-full font-semibold text-sm">
                      {totalItems}
                    </span>
                    <span>{totalItems === 1 ? "Course" : "Courses"} in Cart</span>
                  </p>
                </motion.div>

                {/* Cart Items List */}
                <motion.div className="space-y-4 mt-6">
                  <AnimatePresence>
                    {cart.map((course) => (
                      <motion.div
                        key={course._id}
                        className="flex flex-col sm:flex-row gap-5 border border-richblack-700 bg-linear-to-br from-richblack-900 to-richblack-700 p-5 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                        variants={itemVariants}
                        exit="exit"
                        layoutId={course._id}
                        whileHover={{ y: -5, transition: { duration: 0.3 } }}
                      >
                        {/* Course Image */}
                        <div className="w-full sm:w-45 h-30 sm:h-30 rounded-lg overflow-hidden shrink-0 shadow-md border border-richblack-600">
                          <motion.img
                            src={course?.thumbnail}
                            alt={course.courseName}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>

                        {/* Course Details */}
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-lg font-medium text-richblack-5 hover:text-yellow-50 transition-colors">
                            {course?.courseName}
                          </h3>
                          <p className="text-sm text-richblack-300 mb-1 line-clamp-2 mt-1">
                            {course?.courseDescription}
                          </p>
                          <p className="text-xs text-richblack-300">
                            By {course?.instructor?.firstName || "Instructor"} {course?.instructor?.lastName || ""}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-richblack-600 mt-3">
                            <p className="text-lg font-bold bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
                              ₹ {course.price}
                            </p>

                            <motion.button
                              onClick={() => handleRemoveCourseFromCart(course._id)}
                              className="text-pink-200 hover:text-pink-100 transition-colors flex items-center gap-2 bg-pink-900/20 hover:bg-pink-900/30 px-3 py-1.5 rounded-md"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={removingCourseId === course._id}
                            >
                              {removingCourseId === course._id ? (
                                <div className="h-4 w-4 rounded-full border-2 border-pink-200 border-t-transparent animate-spin" />
                              ) : (
                                <RiDeleteBin6Line className="text-lg" />
                              )}
                              <span className="text-sm">Remove</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Pricing Summary Section */}
              <motion.div
                className="lg:w-95 sticky top-10 h-fit"
                variants={itemVariants}
              >
                <div className="bg-linear-to-br from-richblack-700 to-richblack-900 rounded-xl border border-richblack-600 p-6 shadow-lg">
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-richblack-5 pb-4 border-b border-richblack-600">
                    <FiCreditCard className="text-yellow-50" />
                    Order Summary
                  </h2>
                  <div className="my-6 space-y-4">
                    <div className="flex justify-between">
                      <p className="text-richblack-300">Total Price</p>
                      <p className="text-richblack-5">₹ {totalAmount}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-richblack-300">Discount</p>
                      <p className="text-richblack-5">- ₹ 0</p>
                    </div>
                    <div className="pb-4 border-b border-richblack-600">
                      <div className="flex flex-col lg:flex-row items-center gap-2 mb-2 relative">
                        <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-400 z-10 hidden lg:block" />
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          className="w-full bg-richblack-700 text-richblack-5 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-50 lg:pl-10"
                        />
                        <motion.button
                          className="w-full lg:w-fit bg-richblack-700 hover:bg-richblack-600 text-yellow-50 px-4 py-3 rounded-md text-sm transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Apply
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg mt-4">
                    <p className="text-richblack-100">Total</p>
                    <p className="text-2xl bg-linear-to-r from-yellow-50 to-yellow-100 text-transparent bg-clip-text">
                      ₹ {totalAmount}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleCheckOutNow}
                    className="w-full mt-6 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 py-3 rounded-md font-medium transition-all flex items-center justify-center gap-2 shadow-md"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BsLightningChargeFill className="text-lg" />
                    Checkout Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Empty cart state
            <motion.div
              key="empty-cart"
              className="flex flex-col items-center justify-center py-12 px-4"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                  <div className="relative z-10 bg-linear-to-br from-richblack-700 to-richblack-800 rounded-full p-8 shadow-xl border border-richblack-600">
                  <MdOutlineShoppingCart className="text-6xl text-yellow-50" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full bg-yellow-100/5"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.h2
                className="text-2xl font-semibold text-richblack-5 mt-8 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              >
                Your cart is empty
              </motion.h2>

              <motion.p
                className="text-richblack-300 mb-8 text-center max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              >
                Looks like you haven't added any courses to your cart yet.
                Explore our courses and find one that interests you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              >
                <Link
                  to="/catalog"
                    className="bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 py-3 px-6 rounded-md font-medium transition-all flex items-center gap-2"
                >
                  <span>Browse Courses</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Cart;