const Course = require("../models/Course")
const Category = require("../models/Category")
const User = require("../models/User")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")


//createCourse handler function
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag: _tag,
      instructions: _instructions,
      status
    } = req.body

    //get thumbnail image from request body
    const thumbnail = req.files.thumbnailImage

    //convert tag & instructions from stringified array to array
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)

    // console.log("tag -> ", tag)
    // console.log("instructions -> ", instructions)

    //validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag.length || !instructions.length || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    //Check and validation for status
    if (!status || status === undefined) {
      status = "Draft"
    }

    //check for instructor
    const userId = req.user.id
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor"
    })

    // console.log("Instructor Details -> ", instructorDetails)

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details are not found"
      })
    }

    //check given category is valid or not
    const categoryDetails = await Category.findById(category)

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details are not found"
      })
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

    //create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions
    })

    // console.log("newCourse Id -> ", newCourse._id)
    // console.log("user Id -> ", userId)
    // console.log("category Id -> ", category)

    //add the new course to the user schema of instructor
    const userCourseAddResponse = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          courses: newCourse._id
        }
      },
      { new: true }
    )

    // console.log("User Schema -> ", userCourseAddResponse)

    //add the new course to the category schema
    const categoryCourseAddResponse = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id
        }
      },
      { new: true }
    )

    // console.log("Category Schema -> ", categoryCourseAddResponse)

    //retrun response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse
    })

  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "getting error while creating course!"
    })
  }
}

//getAllCourses handler function
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
        category: true,
        status: true,
        createdAt: true
      }
    )
      .populate("instructor")
      .exec()

    //return response
    return res.status(200).json({
      success: true,
      message: "Data for all courses fetched successfully",
      data: allCourses
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "getting error while fetching course data"
    })
  }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body

    //find course details
    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        courseName: true,
        courseDuration: true,
        courseDescription: true,
        price: true,
        tag: true,
        category: true,
        thumbnail: true,
        whatYouWillLearn: true,
        instructor: true,
        instructions: true,
        courseContent: true,
        createdAt: true,
        studentEnrolled: true
      }
    )
      .populate(
        {
          path: "instructor",
          populate: {
            path: "additionalDetails",
          }
        }
      )
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      })
      .exec()

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`
      })
    }

    // console.log("CourseDetails -> ", courseDetails)

    //return res
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails
    })
  }
  catch (error) {
    return res.status(500).json({
      error: error,
      success: false,
      message: "Failed to get course details!"
    })
  }
}

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      // console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        // course[key] = updates[key]
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  // console.log("Bakend")
  try {
    const { courseId } = req.body
    const userId = req.user.id

    // console.log("Id-> ", courseId, userId)

    const courseDetails = await Course.findOne({
      _id: courseId,
    }).populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
      .populate("category")
      // .populate("CourseProgress")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      }).exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // console.log("courseDetails-> ", courseDetails)

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userID: userId,
    })

    // console.log("courseProgressCount : ", courseProgressCount)



    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch full course details at backend"
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
      .exec()

    // console.log("instructorCourses", instructorCourses)

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course?.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }


    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}