import toast from "react-hot-toast"

import apiConnector from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../redux/slices/profileSlice"
import { setLoading } from "../../redux/slices/authSlice"

const {
  CHANGE_PASSWORD_API,
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT_API,
  UPDATE_PROFILE_PICTURE_API
} = settingsEndpoints

export const changePassword = async (data, token, navigate) => {
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CHANGE_PASSWORD_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new console.error(response.data.message)
    }

    toast.success("Password changed successfully")
    navigate("/dashboard/profile")
  }
  catch (error) {
    console.error(error)
    toast.error("Failed to change password")
  }

  toast.dismiss(toastId)

}

export const updateProfile = async (data, token, dispatch, navigate) => {
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_PROFILE_API,
      data,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new console.error(response.data.message)
    }

    dispatch(setUser(response?.data?.data))
    toast.success("Profile details updated successfully")
    navigate("/dashboard/profile")
  }
  catch (error) {
    console.error(error)
    toast.error("Failed to update profile details")
  }

  toast.dismiss(toastId)
}

export const updateProfilePicture = async (data, token, dispatch, navigate) => {
  const toastId = toast.loading("Loading")
  try {
    const response = await apiConnector(
      "PUT",
      UPDATE_PROFILE_PICTURE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new console.error(response.data.message);
    }

    dispatch(setUser(response?.data?.data))
    toast.success("Profile picture uploaded successfully")
    navigate("/dashboard/profile")
  }
  catch (error) {
    console.error(error)
    toast.error("Failed to update profile picture")
  }

  dispatch(setLoading(false))
  toast.dismiss(toastId)

}

export const deleteAccount = async (token, dispatch) => {
  const toastId = toast.loading("Loading...")
  dispatch(setLoading(true))

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_ACCOUNT_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )

    if (!response.data.success) {
      throw new console.error(response.data.message)
    }

    toast.success("We will miss you 😐")
  }
  catch (error) {
    console.error(error)
    toast.error(error.message)
  }

  dispatch(setLoading(false))
  toast.dismiss(toastId)
}