// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "http://localhost:4000/api/v1"
console.log("BaseUrl", BASE_URL)

// auth endpoints
export const endPoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login"
}

// profile endpoints
export const profileEndPoints = {
  GET_USER_DETAILS_API: BASE_URL + "profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "profile/getEnrolledCourses",
  GET_INSTRUCTOR_DASHBOARD_DATA_API: BASE_URL + "profile/instructorDashboard",
}

// reset password
export const resetPasswordEndpoints = {
  RESET_PASSWORD_TOKEN_API: BASE_URL + "reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "reset-password",
}

// settings API endpoints
export const settingsEndpoints = {
  CHANGE_PASSWORD_API: BASE_URL + "change-password",
  UPDATE_PROFILE_API: BASE_URL + "updateProfile",
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "updateProfilePicture",
  DELETE_ACCOUNT_API: BASE_URL + "deleteAccount"
}

// enquiry endpoints
export const enquiryEndPoints = {
  ENQUIRY_API: BASE_URL + "enquiry"
}

export const coursesEndpoints = {
  CREATE_COURSE_API: BASE_URL + "course/createCourse",
  EDIT_COURSE_API: BASE_URL + "course/editCourse",
  CREATE_SECTION_API: BASE_URL + "course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "course/updateSubSection",
  DELETE_COURSE_API: BASE_URL + "course/deleteCourse",
  DELETE_SECTION_API: BASE_URL + "course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "course/deleteSubSection",
  GET_ALL_COURSES_API: BASE_URL + "course/getAllCourses",
  GET_COURSE_DETAILS_API: BASE_URL + "course/getCourseDetails",
  INSTRUCTOR_COURSES_API: BASE_URL + "course/getInstructorCourses",
  GET_FULL_COURSE_DETAILS_API: BASE_URL + "course/getFullCourseDetails",
  UPDATE_COURSE_PROGRESS_API: BASE_URL + "updateCourseProgress"
}

export const cartEndPoints = {
  ADD_COURSE_TO_CART_API: BASE_URL + "dashboard/add-course-to-cart",
  REMOVE_COURSE_FROM_CART_API: BASE_URL + "dashboard/remove-course-from-cart",
  GET_CART_COURSES_API: BASE_URL + "dashboard/get-cart-courses",
  RESET_CART_API: BASE_URL + "dashboard/reset-cart"
}

export const categoriesEndpoints = {
  CATEGORIES_API: BASE_URL + "showAllCategories",
  CATALOGPAGEDATA_API: BASE_URL + "getCategoryPageDetails"
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "payment/sendPaymentSuccessEmail",
}

// REVIEW ENDPOINTS
export const reviewEndPoints = {
  CREATE_REVIEW_API: BASE_URL + "createRating",
  DELETE_REVIEW_API: BASE_URL + "deleteRating",
  GET_COURSE_REVIEW_API: BASE_URL + "getCourseReview",
  GET_COURSE_ALL_REVIEWS_API: BASE_URL + "getCourseAllReviews",
  GET_ALL_REVIEW_DATA_API: BASE_URL + "getReviews"
}