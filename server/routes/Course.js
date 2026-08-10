// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")

const {
  updateCourseProgress
} = require("../controllers/courseProgress");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection")

// Rating Controllers Import
const {
  createRating,
  deleteReview,
  getAverageRating,
  getCourseReview,
  getCourseAllReviews,
  getAllRatingReview,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//API Route

// Courses can Only be Created by Instructors
router.post("/course/createCourse", auth, isInstructor, createCourse)

//Add a Section to a Course
router.post("/course/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/course/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.delete("/course/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/course/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.delete("/course/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/course/addSubSection", auth, isInstructor, createSubSection)

// Get all Registered Courses
router.get("/course/getAllCourses", showAllCourses)

// Get Details for a Specific Courses
router.post("/course/getCourseDetails", getCourseDetails)

// get full course details
router.post("/course/getFullCourseDetails", auth, getFullCourseDetails)

// Edit Course routes
router.post("/course/editCourse", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
router.get("/course/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// Delete a Course
router.delete("/course/deleteCourse", deleteCourse)

// Update course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.delete("/deleteRating", auth, isStudent, deleteReview)
router.get("/getAverageRating", getAverageRating)
router.post("/getcourseReview", auth, getCourseReview)
router.post("/getCourseAllReviews", getCourseAllReviews)
router.get("/getReviews", getAllRatingReview)


module.exports = router