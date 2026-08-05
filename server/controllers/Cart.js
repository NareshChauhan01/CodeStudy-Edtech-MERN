const User = require("../models/User")

// Add course to cart
exports.addCourseToCart = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    if (!userId && !courseId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and CourseId are required to add course to cart!"
      })
    }

    const studentDetails = await User.findById(userId)



    // check if the student is already enrolled in to the course?
    if (studentDetails?.courses?.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Student is already enrolled in this course"
      })
    }



    // check if the course is already added to cart
    if (studentDetails?.cart?.includes(courseId)) {
      return res.status(400).json({
        success: false,
        data: studentDetails?.cart,
        message: "Course is already present in your cart!"
      })
    }

    // console.log("cart Validation : ", studentDetails?.cart?.includes(courseId))

    const addCartCourseResponse = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          cart: courseId
        }
      },
      { new: true }
    ).populate({
      path: "cart"
    })

    if (!addCartCourseResponse) {
      return res.status(400).json({
        success: false,
        message: "Failed to add course to cart at backend!"
      })
    }

    return res.status(200).json({
      success: true,
      data: addCartCourseResponse?.cart,
      message: "Course added to cart successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Remove course from cart
exports.removeCourseFromCart = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id

    if (!userId && !courseId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and CourseId are required to remove course from cart!"
      })
    }

    const studentDetails = await User.findById(userId, {
      accountType: "Student"
    })

    if (!studentDetails) {
      return res.status(400).json({
        success: false,
        message: "Only student can remove course from cart!"
      })
    }

    const removeCartCourseResponse = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          cart: courseId
        }
      },
      { new: true }
    ).populate({
      path: "cart"
    })

    if (!removeCartCourseResponse) {
      return res.status(400).json({
        success: false,
        message: "Failed to remove course from cart at backend!"
      })
    }

    return res.status(200).json({
      success: true,
      data: removeCartCourseResponse?.cart,
      message: "Course removed from cart successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get cart courses
exports.getCartCourses = async (req, res) => {
  try {
    const userId = req.user.id

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide userId to find cart courses"
      })
    }

    const cartCourses = await User.findById(
      userId
    ).populate({
      path: "cart"
    })

    // console.log("cartCourses : ", cartCourses)

    if (!cartCourses) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch cart courses at backend!"
      })
    }

    return res.status(200).json({
      success: true,
      data: cartCourses?.cart,
      message: "Cart courses fetched successfully at backend"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Reset cart
exports.resetCart = async (req, res) => {
  try {
    const { courses } = req.body
    const userId = req.user.id

    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "Please provide courses to reset cart"
      })
    }

    for (const course of courses) {
      const removeCartCourseResponse = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            cart: course._id
          }
        },
      )

      if (!removeCartCourseResponse) {
        return res.status(400).json({
          success: false,
          message: "Failed to remove course from cart at backend!"
        })
      }
    }

    return res.status(200).json({
      success: true,
      message: "Reset of cart has been done successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}