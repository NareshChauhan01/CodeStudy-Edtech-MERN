const express = require("express")
const router = express.Router()

const { isStudent, auth } = require("../middlewares/auth")

const {
  addCourseToCart,
  removeCourseFromCart,
  getCartCourses,
  resetCart
} = require("../controllers/Cart")



router.post("/dashboard/add-course-to-cart", auth, isStudent, addCourseToCart)
router.post("/dashboard/remove-course-from-cart", auth, isStudent, removeCourseFromCart)
router.post("/dashboard/get-cart-courses", auth, isStudent, getCartCourses)
router.post("/dashboard/reset-cart", auth, isStudent, resetCart)


module.exports = router