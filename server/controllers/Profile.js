const dotenv = require("dotenv")
dotenv.config()

const User = require("../models/User")
const Profile = require("../models/Profile")
const Course = require("../models/Course")
const CourseProgress = require("../models/CourseProgress")

const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const mailSender = require("../utils/mailSender")
const { accountDeletionTemplate } = require("../mail/templates/accountDeletionTemplate")


exports.updateProfile = async (req, res) => {
  try {
    //get data
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      gender = "",
      contactNumber = ""
    } = req.body

    //find profile
    const userDetails = await User.findById(req.user.id)
    // console.log("userDetails is : ", userDetails)
    const profileDetails = await Profile.findById(userDetails.additionalDetails)

    //validation
    if (!firstName || !lastName || !gender || !dateOfBirth || !contactNumber || !userDetails) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //user details updation
    userDetails.firstName = firstName
    userDetails.lastName = lastName
    await userDetails.save()

    //update profile
    profileDetails.dateOfBirth = dateOfBirth
    profileDetails.about = about
    profileDetails.gender = gender
    profileDetails.contactNumber = contactNumber
    await profileDetails.save()   // update data in db

    //updated user details
    const updatedUserDetails = await User.findById(req.user.id).populate(
      {
        path: "additionalDetails"
      }
    )

    //return res
    return res.status(200).json({
      success: true,
      message: "Profile details updated successfully 😊",
      data: updatedUserDetails
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile data!",
      error: error.message
    })
  }
}

//delete Account
//Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id

    //validation
    const userDetails = await User.findById(id)

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    if (userDetails.email === "instructor@mail.com" || userDetails.email === "student@mail.com") {
      return res.status(404).json({
        success: false,
        message: "This is a demo account"
      })
    }

    //delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails)

    // delete course progress
    for (const course_progress of userDetails?.courseProgress) {
      await CourseProgress.findByIdAndDelete(course_progress)
    }

    //Todo : unenroll user from all enrolled course
    for (const course of userDetails?.courses) {
      await Course.findByIdAndUpdate(
        course,
        {
          $pull: {
            studentEnrolled: id
          }
        }
      )
    }

    const userMail = userDetails?.email
    const userName = userDetails?.firstName + " " + userDetails?.lastName

    //delete user
    await User.findByIdAndDelete(id)

    await mailSender(userMail, "Account Deletion Email From StudyNotion", accountDeletionTemplate(userName))

    //return response
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully 😐"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message
    })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id

    //validation and get user details
    const userDetails = await User.findById(id).populate("additionalDetails").exec()

    //return res
    return res.status(200).json({
      success: true,
      message: "User Details fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details"
    })
  }
}

// function to update profile picture of user
exports.updateProfilePicture = async (req, res) => {
  try {
    const displayPicture = req.files.profilePicture

    const profilePic = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    if (!profilePic) {
      return res.status(401).json({
        success: false,
        meassge: "Failed to upload profile picture on cloudinary!"
      })
    }

    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      { image: profilePic.secure_url },
      { new: true }
    ).populate({
      path: "additionalDetails"
    })

    if (!updatedProfile) {
      return res.status(401).json({
        success: false,
        message: "Failed to update profile image link to database!"
      })
    }

    return res.status(200).json({
      success: true,
      data: updatedProfile,
      message: "Profile picture updated successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Getting error in updating profile picture"
    })
  }
}

// Get student enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    // console.log("userId : ", userId)

    let userDetails = await User.findOne({
      _id: userId,
    }).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    }).exec()

    userDetails = userDetails.toObject()
    var SubsectionLength = 0

    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0

      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        )

        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )

        SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userID: userId,
      })

      courseProgressCount = courseProgressCount?.completedVideos.length

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      }
      else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)

        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch enrolled course at backend!"
    })
  }
}

// Get Instructor dashboard Data
exports.getInstructorDashboardData = async (req, res) => {
  try {
    const instructorId = req.user.id

    if (!instructorId) {
      return res.status(400).json({
        success: false,
        message: "Provide Instructor Id"
      })
    }

    const instructorCourses = await Course.find({
      instructor: instructorId
    })

    const courseData = instructorCourses.map((course) => {
      const totalStudentEnrolled = course?.studentEnrolled?.length
      const totalAmountgenerated = course?.price * totalStudentEnrolled

      // New object to store all data
      const courseDataWithStats = {
        course,
        totalStudentEnrolled,
        totalAmountgenerated
      }

      return courseDataWithStats
    })

    return res.status(200).json({
      success: true,
      data: courseData
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.meassge,
      message: "Failed to fetch instructor dashboard data at backend!"
    })
  }
}