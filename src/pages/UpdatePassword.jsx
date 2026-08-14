import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { HiArrowNarrowLeft } from "react-icons/hi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../services/operations/resetPasswordAPI";

export function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const [showPass1, setshowPass1] = useState(false)
  const [showPass2, setshowPass2] = useState(false)

  const [formData, setFormData] = useState({
    newPass: "",
    confirmPass: ""
  })

  const token = location.pathname.split("/").at(-1)

  function changeHandler(event) {
    setFormData(preData => (
      {
        ...preData,
        [event.target.name]: event.target.value
      }
    ))
  }

  function submitHandler(event) {
    event.preventDefault()

    dispatch(resetPassword(
      token,
      formData.newPass,
      formData.confirmPass,
      navigate
    ))
  }

  return (
    <div className="w-10/12 m-auto max-h-screen text-pure-greys-50">
      <form
        onSubmit={submitHandler}
        className="max-w-[415px] mx-auto flex flex-col gap-5 tracking-wide"
      >
        <div>
          <h2 className="text-3xl font-bold">Choose New Password</h2>
          <p className="text-[1.1rem] text-richblack-200">Almost done. Enter your new password and you're all set</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative flex flex-col gap-1">
            <label htmlFor="pass" className="text-richblack-5">Create New Password <sup className="text-pink-300">*</sup></label>
            <input
              required
              type={showPass1 ? "text" : "password"}
              placeholder="Enter Password"
              id="pass"
              name="newPass"
              value={formData.newPass}
              onChange={changeHandler}
              className="py-3 rounded-md px-5 bg-richblack-800 outline-none border-b-[0.1rem] border-richblack-600 text-richblack-50"
            ></input>

            <span
              className="absolute top-[58%] right-[1rem] cursor-pointer scale-110"
              onClick={() => setshowPass1(!showPass1)}
            >
              {
                showPass1 ? (<IoEyeOutline />) : (<IoEyeOffOutline />)
              }
            </span>
          </div>

          <div className="relative flex flex-col gap-1">
            <label htmlFor="cPass" className="text-richblack-5">Confirm Password <sup className="text-pink-300">*</sup></label>
            <input
              required
              type={showPass2 ? "text" : "password"}
              placeholder="Confirm Password"
              id="cPass"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={changeHandler}
              className="py-3 rounded-md px-5 bg-richblack-800 outline-none border-b-[0.1rem] border-richblack-600 text-richblack-50"
            ></input>

            <span
              className="absolute top-[58%] right-[1rem] cursor-pointer scale-110"
              onClick={() => setshowPass2(!showPass2)}
            >
              {
                showPass2 ? (<IoEyeOutline />) : (<IoEyeOffOutline />)
              }
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="py-2 bg-yellow-200 rounded-md text-black"
          >
            Reset Password
          </button>

          <Link to="/login">
            <div className="flex gap-2 items-center text-richblack-25 cursor-pointer">
              <HiArrowNarrowLeft />
              <span>Back to LogIn</span>
            </div>
          </Link>
        </div>
      </form>
    </div>
  )
}