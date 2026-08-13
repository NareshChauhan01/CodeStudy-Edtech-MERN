import toast from "react-hot-toast"
import apiConnector from "../apiConnector"
import { categoriesEndpoints, coursesEndpoints } from "../apis"

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_COURSE_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_COURSE_DETAILS_API,
  GET_FULL_COURSE_DETAILS_API,
  UPDATE_COURSE_PROGRESS_API,
  INSTRUCTOR_COURSES_API
} = coursesEndpoints

const { CATEGORIES_API, CATALOGPAGEDATA_API } = categoriesEndpoints

// Create Course
export const createCourse = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not create course")
    }

    toast.success("Course Created")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Course Creation API Problem")
    console.error(error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Edit Course
export const editCourseDetails = async (data, token) => {
  let result
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not update course")
    }

    toast.success("Course Updated")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Course Update API Problem")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Delete Course
export const deleteCourse = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not delete course")
    }

    result = response?.data?.data
    toast.success("Course deleted successfully")
  }
  catch (error) {
    console.error(error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Fetch Course Details
export const getCourseDetails = async (data) => {
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_COURSE_DETAILS_API,
      data,
      // {
      //     Authorization : `Bearer ${token}`
      // }
    )

    if (!response?.data?.success) {
      throw new Error("Course couldn't fetched!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Get course details API Problem")
    console.error(error)
  }

  return result
}

// Fetch Full Course Details
export const getFullCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.error)
    }

    result = response?.data?.data
  }
  catch (error) {
    console.error(error.message)
    console.log("Get full course details API problem")
  }

  toast.dismiss(toastId)
  return result
}

// Fetch Instructor Courses
export const fetchInstructorCourses = async (token) => {
  let result = []
  // console.log("fetchInstructorCourses", token)

  try {
    const response = await apiConnector(
      "GET",
      INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not fetch instructor courses")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.error(error)
    console.log("Instructor course fetch API problem")
  }

  return result
}

// Fetch Course Categories
export const fetchCourseCategories = async () => {
  let result = []

  try {
    const response = await apiConnector(
      "GET",
      CATEGORIES_API,
    )

    if (!response?.data?.success) {
      throw new Error("Could not fetch course categories")
    }

    result = response?.data?.categories
  }
  catch (error) {
    console.error(error)
    console.log("Course Categories Fetch API Problem")
  }

  return result
}

// Create Section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not create section")
    }

    toast.success("Course Section Created")

    result = response?.data?.updatedCourse
    // console.log("Result in API -> ", result)
  }
  catch (error) {
    console.log("Section Creation API Problem", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Update Section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not update section")
    }

    toast.success("Course Section Updated")
    result = response?.data?.data
  }
  catch (error) {
    console.log("Section Update API Problem", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Delete Section
export const deleteSection = async (data, token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Section could not be deleted!")
    }

    result = response?.data?.data
    toast.success("Section Deleted Successfully")
  }
  catch (error) {
    console.log("Delete Section API Problem")
    toast.error(error?.message)
  }

  toast.dismiss(toastId)
  return result
}

// Create Sub Section
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new Error("Could not create sub section")
    }

    toast.success("Course Sub Section Created")
    result = response?.data?.updatedSection
    // console.log("result -> ", result)
  }
  catch (error) {
    console.log("Sub section creation API problem")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Update Sub Section
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Sub Section Updation Failed!")
    }

    toast.success("Sub section updated successfully")
    result = response?.data?.updatedCourse
  }
  catch (error) {
    console.log("Sub section updation API problem")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// Delete Sub Section
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Sub section could not be deleted!")
    }

    result = response?.data?.data
  }
  catch (error) {
    console.log("Sub section deletion API problem")
    toast.error(error?.message)
  }

  toast.dismiss(toastId)
  return result
}

// catalog page data
export const getCatalogpageData = async (data) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CATALOGPAGEDATA_API,
      data
    )

    if (!response?.data?.success) {
      throw new Error("Category page data could not be fetched!")
    }

    // toast.success("Category page data fetched successfully")
    result = response?.data
  }
  catch (error) {
    console.log("Category page details API problem")
    toast.error(error)
  }

  toast.dismiss(toastId)
  return result
}

// Update Course Progress
export const updateCourseProgress = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_COURSE_PROGRESS_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response?.data?.success) {
      throw new Error("Failed to update course progress")
    }

    result = true
    toast.success("Course Progress Updated")
  }
  catch (error) {
    console.log("Course progress update API problem!")
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}
