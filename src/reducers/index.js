import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/authSlice";
import courseSlice from "../redux/slices/courseSlice"
import profileReducer from "../redux/slices/profileSlice";
import cartReducer from "../redux/slices/cartSlice";
import enquiryReducer from "../redux/slices/enquirySlice"
import viewCourseSlice from "../redux/slices/viewCourseSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseSlice,
  cart: cartReducer,
  enquiry: enquiryReducer,
  viewCourse: viewCourseSlice
})

export default rootReducer