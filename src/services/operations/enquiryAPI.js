import toast from "react-hot-toast"

import { enquiryEndPoints } from "../apis"
import apiConnector from "../apiConnector"
import { setLoading } from "../../redux/slices/enquirySlice"

const { ENQUIRY_API } = enquiryEndPoints

//function to connect fronted contact us service to backend
const sendEnquiry = (
  data
  // navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector(
        "POST",
        ENQUIRY_API,
        data
      )

      if (!response.data.success) {
        throw new console.error(response.data.message)
      }

      toast.success("Meassage send successfully")
    }
    catch (error) {
      console.error(error)
      toast.error("Could not send message")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export default sendEnquiry