import toast from "react-hot-toast";

import { endPoints } from "../apis";
import apiConnector from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { resetCart, setTotalItems } from "../../redux/slices/cartSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API
} = endPoints

// function to connect fronted sendOTP service with backend
export function sendotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true
      })

      // console.log(`SENDOTP_API Response : ${response}`)
      // console.log(response.data.success)

      if (!response.data.success) {
        throw new console.error(response.data.message);
      }

      toast.success("OTP Send Successfully 😊")
      navigate("/verify-email")
    }
    catch (error) {
      console.error(error)
      toast.error("Could not send OTP")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// function to connect fronted signup service with backend
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp
      })

      console.log(`SIGNUP_API Response : ${response}`)
      toast.success("Account Created Successfully 🎉")
      navigate("/login")
    }
    catch (error) {
      console.error(error)
      toast.error("Failed to create account 😐")
      navigate("/signup")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// function to connect fronted login service with backend
export const login = async (email, password, dispatch, navigate) => {
  const toastId = toast.loading("Loading...")
  dispatch(setLoading(true))

  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password
    })

    if (!response?.data?.success) {
      throw new Error("Failed to log in at fronted")
    }

    dispatch(setToken(response?.data?.token))
    dispatch(setUser(response?.data?.user))
    dispatch(setTotalItems(response?.data?.user?.cart?.length))

    toast.success("Logged In Successfully")
    navigate("/dashboard/profile")
  }
  catch (error) {
    console.error(error)
    toast.error("Enter correct email and password")
  }

  dispatch(setLoading(false))
  toast.dismiss(toastId)
}

// function to logout
export const logout = async (dispatch, navigate) => {
  dispatch(resetCart())
  dispatch(setUser(null))
  dispatch(setToken(null))

  localStorage.removeItem("token")
  localStorage.removeItem("user")

  toast.success("Logged out successfully")
  navigate("/")
}