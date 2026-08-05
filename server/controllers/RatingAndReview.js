const Course = require("../models/Course")
const RatingAndReview = require("../models/RatingAndReview")

//create Rating
exports.createRating = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id

    //fetchdata from req body
    const { rating, review, courseId } = req.body

    //check if user is enrolled or not
    const courseDetails = await Course.findOne(
      {
        _id: courseId,
        studentEnrolled: { $elemMatch: { $eq: userId } }
      }
    )

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course"
      })
    }

    //check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId
    })

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Corse is already reviewed by the user!"
      })
    }

    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId
    })

    //update course with this rating and review
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id
        }
      },
      { new: true }
    )

    //return response
    return res.status(200).json({
      success: true,
      data: ratingReview,
      message: "Rating & Review created successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to crfeate rating & review!",
      error: error.message
    })
  }
}

//delete review
exports.deleteReview = async (req, res) => {
  try {
    // const userId = req.user.id
    const { courseId, reviewId } = req.body

    if (!reviewId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "Provide reviewId and CourseId"
      })
    }

    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          ratingAndReviews: reviewId
        }
      }
    )

    await RatingAndReview.findByIdAndDelete(reviewId)

    return res.status(200).json({
      success: true,
      data: true,
      message: "Review Deleted"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete course!",
      error: error.message
    })
  }
}

//get average rating
exports.getAverageRating = async (req, res) => {
  try {
    //get courseId
    const courseId = req.body.courseId

    //calculate avg rating
    const result = await ratingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId)
        }
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating"
          }
        }
      }
    ])

    //return res
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Average rating fetched successfully",
        averagerating: result[0].averageRating
      })
    }

    //if no rating review exist
    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      averagerating: 0
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get average rating!",
      error: error.message
    })
  }
}

//get course review by user
exports.getCourseReview = async (req, res) => {
  try {

    const userId = req.user.id
    const { courseId } = req.body

    if (!userId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "Provide userId and CourseId"
      })
    }

    const reviewData = await RatingAndReview.findOne({
      user: userId,
      course: courseId
    })

    return res.status(200).json({
      success: true,
      data: reviewData || false,
      message: "Course review by user get fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course review by the user!",
      error: error.message
    })
  }
}

//get course all reviews
exports.getCourseAllReviews = async (req, res) => {
  try {
    const { courseId } = req.body

    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "Provide CourseId"
      })
    }

    const reviewData = await RatingAndReview.find({
      course: courseId
    }).populate({
      path: "user"
    })

    return res.status(200).json({
      success: true,
      data: reviewData || false,
      message: "Course all reviews get fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course all reviews!",
      error: error.message
    })
  }
}

//get all ratings and reviews
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName mail image"
      })
      .populate({
        path: "course",
        select: "courseName"
      })
      .exec()

    //return response
    return res.status(200).json({
      success: true,
      data: allReviews,
      message: "All rating and reviews fetched successfully"
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all rating & reviews",
      error: error.message
    })
  }
}