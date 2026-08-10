const express = require("express")
const router = express.Router()

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateProfilePicture,
  getEnrolledCourses,
  getInstructorDashboardData,
} = require("../controllers/Profile")


// Importing Middlewares
const { auth, isInstructor, isStudent } = require("../middlewares/auth")
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// Delete User Account
router.delete("/deleteAccount", auth, deleteAccount)

// update profile details
router.put("/updateProfile", auth, updateProfile)

// update profile picture
router.put("/updateProfilePicture", auth, updateProfilePicture)

// get user details
router.get("/profile/getUserDetails", auth, getAllUserDetails)

// Get Enrolled Courses
router.get("/profile/getEnrolledCourses", auth, getEnrolledCourses)

// Get Instuctor Dashboard Data
router.get("/profile/instructorDashboard", auth, isInstructor, getInstructorDashboardData)


module.exports = router
