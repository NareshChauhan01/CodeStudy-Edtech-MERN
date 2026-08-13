import toast from "react-hot-toast"
import apiConnector from "../apiConnector"
import { profileEndPoints, cartEndPoints } from "../apis"

const {
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DASHBOARD_DATA_API
} = profileEndPoints

const {
  ADD_COURSE_TO_CART_API,
  REMOVE_COURSE_FROM_CART_API,
  GET_CART_COURSES_API,
  RESET_CART_API
} = cartEndPoints

// get user enrolled courses
export const getEnrolledCourses = async (token) => {
  // const toastId = toast.loading("Loading")
  let result = []
  // console.log("data -> ", data)

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to get enrolled courses")
    }

    result = response?.data?.data
    // toast.success("Enrolled Courses 👍")
  }
  catch (error) {
    console.error(error)
    console.log("Get enrolled course API problem")
    // toast.error(error)
  }

  // toast.dismiss(toastId)
  return result
}

// Add course to cart
export const addCourseToCart = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector(
      "POST",
      ADD_COURSE_TO_CART_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to add course to cart at fronted")
    }

    toast.success("Course added to cart")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Add course to cart API problem!")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Remove course from cart
export const removeCourseFromCart = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector(
      "POST",
      REMOVE_COURSE_FROM_CART_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to remove course from cart at fronted")
    }

    toast.success("Course removed from cart")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Remove course from cart API problem!")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Add course to cart
export const getCartCourses = async (token) => {
  // const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector(
      "POST",
      GET_CART_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to fetch cart courses at fronted")
    }

    // toast.success("Course added to cart")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Cart course fetch API problem!")
    toast.error(error.message)
  }

  // toast.dismiss(toastId)
  return result
}

// Reset Cart
export const resetCartItems = async (data, token) => {
  let result = false

  try {
    const response = await apiConnector(
      "POST",
      RESET_CART_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to reset cart at fronted!")
    }

    result = true
  }
  catch (error) {
    console.log("Reset cart API problem")
    console.error(error)
  }

  return result
}

// Get Instructor Data
export const getInstructorDashboardData = async (token) => {
  let result = null

  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DASHBOARD_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to get instructor data!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Instructor dashboard data fetch API problem")
    toast.error(error.message)
  }

  return result
}