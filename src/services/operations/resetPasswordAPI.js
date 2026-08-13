import toast from "react-hot-toast"

import apiConnector from "../apiConnector"
import { resetPasswordEndpoints } from "../apis"
import { setLoading } from "../../redux/slices/authSlice"

const { RESET_PASSWORD_TOKEN_API, RESET_PASSWORD_API } = resetPasswordEndpoints

// reset password token connection with backend
export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, {
        email
      })

      if (!response.data.success) {
        throw new console.error(response.data.message)
      }

      toast.success("Reset mail send successfully")
      setEmailSent(true)
    }
    catch (error) {
      console.error(error)
      console.log("Could not reset password token!")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// reset password connection with backend
export function resetPassword(
  token,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        token,
        password,
        confirmPassword
      })

      if (!response.data.success) {
        throw new console.error(response.data.message)
      }
      else {
        toast.success("Password reset done 👍")
        navigate("/login")
      }
    }
    catch (error) {
      console.log(error)
      console.log("Failed to reset password")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}