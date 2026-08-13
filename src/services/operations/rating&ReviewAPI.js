import { reviewEndPoints } from "../apis"
import apiConnector from "../apiConnector";

const {
  CREATE_REVIEW_API,
  DELETE_REVIEW_API,
  GET_COURSE_REVIEW_API,
  GET_COURSE_ALL_REVIEWS_API,
  GET_ALL_REVIEW_DATA_API
} = reviewEndPoints

// Create Review
export const createReview = async (data, token) => {
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      CREATE_REVIEW_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to create review at fronted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Create review API problem")
    console.error(error)
  }

  return result
}

// Delete Review
export const deleteReview = async (data, token) => {
  let result = null

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_REVIEW_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to delete review at fronted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Delete review API problem")
    console.error(error)
  }

  return result
}

// Get Course Review of user
export const getCourseReview = async (data, token) => {
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_REVIEW_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to fetch course review at fronted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Get Course Review API Problem")
    console.log(error)
  }

  return result
}

// Get Course Review of user
export const getCourseAllReviews = async (data) => {
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_ALL_REVIEWS_API,
      data
    )

    if (!response?.data?.success) {
      throw new Error("Failed to fetch course all reviews at fronted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Get Course All Reviews API Problem")
    console.log(error)
  }

  return result
}

// Get All Rating Reviews
export const getAllRatingReview = async () => {
  let result = null

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_REVIEW_DATA_API,
      null,
    )

    if (!response?.data?.success) {
      throw new Error("Failed to get review data at fronted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Get all review data API problem")
    console.error(error)
  }

  return result
}