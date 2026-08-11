const mongoose = require("mongoose")
const crypto = require("crypto")
const { instance } = require("../config/razorpay")

const User = require("../models/User")
const Course = require("../models/Course")
const mailSender = require("../utils/mailSender")
const CourseProgress = require("../models/CourseProgress")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  try {
    //get courseId and userId
    const { courses } = req.body
    const userId = req.user.id

    // console.log("capturePayment")

    //validation

    //valid courseId
    if (courses.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Please provide valid course Id"
      })
    }

    //valid courseDetails
    // const courseDetails = await Course.findById(course_id)

    // if(!courseDetails){
    //     return res.status(401).json({
    //         success : false,
    //         message : "Course does not found!"
    //     })
    // }

    //user already pay for the same course?
    // const uid = new mongoose.Types.ObjectId(userId)

    let totalAmount = 0

    for (const course_id of courses) {
      let course

      course = await Course.findById(course_id)

      // return res if course is not found
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Sorry, could not find the course"
        })
      }

      // check if the user is already enrolled
      const uid = new mongoose.Types.ObjectId(userId)

      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled"
        })
      }

      // add the course amount
      totalAmount += course.price
    }

    // console.log("totalAmount: ", totalAmount)

    // if(courseDetails.studentEnrolled.includes(userId)){
    //     return res.status(400).json({
    //         success : false,
    //         message : "Student already enrolled in this course!"
    //     })
    // }

    // //order create
    // const {price} = Course.price
    // const currency = process.env.CURRENCY

    // const options = {
    //     price : price*100,
    //     currency,
    //     receipt : Math.random(Date.now().toString + "010"),
    //     notes : (
    //         course_id,
    //         userId
    //     )
    // }

    const options = {
      amount: totalAmount * 100,
      currency: process.env.CURRENCY,
      receipt: Math.random(Date.now()).toString(),
    }

    //initiate the payment using razorpay
    const paymentResponse = await instance.orders.create(options)
    // console.log(paymentResponse)

    //return response
    return res.status(200).json({
      success: true,
      data: paymentResponse,
      message: "Payment captured successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to capture payment!",
      error: error.message
    })
  }
}

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
  // const webhookSecret = process.env.WEBHOOK_SECRET
  // const signature = req.headers["x-razorpay-signature"]

  // console.log("verifySignature", req.body)

  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  // user id
  const userId = req.user.id

  // validation
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed!"
    })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  // //hashing the secrets
  // const shasum = crypto.createHmac("sha256", webhookSecret)
  // //converts into string
  // shasum.update(JSON.stringify(req.body))
  // //hexadecimals
  // const digest = shasum.digest("hex")

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)

    return res.status(200).json({
      success: true,
      message: "Payment Verified"
    })

    // const { course_id, userId } = req.body.payload.payment.entity.notes

    // try {
    //     //fulfill the actions

    //     //find the course and enroll the student in it
    //     const enrolledCourse = await Course.findOneAndUpdate(
    //         { _id: course_id },
    //         {
    //             $push: {
    //                 studentEnrolled: userId
    //             }
    //         },
    //         { new: true }
    //     )

    //     if (!enrolledCourse) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Course not found!"
    //         })
    //     }

    //     //find the student and add the course to their list enrolled course me
    //     const enrolledStudent = await User.findOneAndUpdate(
    //         { _id: userId },
    //         {
    //             $push: {
    //                 courses: course_id
    //             }
    //         },
    //         { new: true }
    //     )

    //     if (!enrolledStudent) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Course not found!"
    //         })
    //     }

    //     //mail send krdo confirmation wala
    //     const emailResponse = await mailSender(
    //         enrolledStudent.mail,
    //         "Congratulation ✨",
    //         "Congratulations, you are onboarded into new course 🙌"
    //     )

    //     console.log(emailResponse)

    //     //return res
    //     return res.status(200).json({
    //         success: true,
    //         message: "Signature verified and course added"
    //     })
    // }
    // catch (error) {
    //     return res.status(500).json({
    //         success: false,
    //         message: "Failed to enroll students into course after successfull payment"
    //     })
    // }
  }
  else {
    return res.status(400).json({
      success: false,
      message: "Invalid request"
    })
  }
}

// send payment success mail
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body
  const userId = req.user.id

  if (
    !orderId ||
    !paymentId ||
    !amount ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the details"
    })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
      message: "Could not send payment mail"
    })
  }

}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  // validation
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide course ID and user ID"
    })
  }

  // console.log("userId->", userId)

  for (const courseId of courses) {
    try {
      // find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: {
            studentEnrolled: userId
          }
        },
        { new: true }
      )

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found"
        })
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userID: userId,
        completedVideos: []
      })

      // find the student and add the course into their list
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id
          }
        },
        { new: true }
      )

      if (!enrolledStudent) {
        return res.status(500).json({
          success: false,
          message: "Student not found"
        })
      }

      await mailSender(
        enrolledStudent.email,
        `Successfully enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

    }
    catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to enroll the student in to the course"
      })
    }
  }
}