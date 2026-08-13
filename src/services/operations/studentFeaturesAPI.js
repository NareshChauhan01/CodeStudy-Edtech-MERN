import toast from "react-hot-toast"

import apiConnector from "../apiConnector"
import { studentEndpoints } from "../apis"
import { resetCartItems } from "./profileAPI";
import rzpLogo from "../../assests/logos/rzp_logo.png"
import { resetCart } from "../../redux/slices/cartSlice";
import { setPaymentLoading } from "../../redux/slices/courseSlice";


const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Buy course API
export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
  const toastId = toast.loading("Loading...")

  try {
    // load the script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error("Razorpay SDK failed to load")
      return
    }

    // initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`
      }
    )

    // console.log("orderResponse -> ", orderResponse)


    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message)
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse?.data?.data?.currency,
      amount: `${orderResponse?.data?.data?.amount}`,
      order_id: orderResponse?.data?.data?.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email
      },
      handler: function (response) {
        //send successful wala mail
        sendPaymentSuccessEmail(response, orderResponse?.data?.data?.amount, token);
        //verifyPayment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      }
    }

    // console.log("options -> ", options)

    //miss hogya tha 
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log(response.error);
    })

  }
  catch (error) {
    console.log("Buy course API problem")
    console.error(error)
    toast.error("Could not make payment")
  }

  toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    }, {
      Authorization: `Bearer ${token}`
    })
  }
  catch (error) {
    console.log("Payment Success Email API problem", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  const { courses } = bodyData
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("payment Successful, you are addded to the course");
    dispatch(resetCart())
    await resetCartItems({ courses }, token)
    navigate("/dashboard/enrolled-courses");
    // dispatch(resetCart());
  }
  catch (error) {
    console.log("Payment verification API problem", error);
    toast.error("Could not verify Payment");
  }

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}