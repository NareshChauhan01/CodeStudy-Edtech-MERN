import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

export function ResendEmail() {
  return (
    <div className="w-10/12 m-auto max-h-screen text-pure-greys-50">
      <div className="max-w-103.75 mx-auto flex flex-col gap-5 tracking-wide">
        <h2 className="text-3xl font-bold">Check Email</h2>
        <p className="text-[1.1rem] text-richblack-200">We have sent the reset email to your email account</p>

        <button
          type="submit"
          className="py-2 bg-yellow-200 rounded-md text-black"
        >
          Resend Email
        </button>

        <Link to="/login">
          <div className="flex gap-2 items-center text-richblack-25 cursor-pointer">
            <HiArrowNarrowLeft />
            <span>Back to LogIn</span>
          </div>
        </Link>
      </div>
    </div>
  )
}