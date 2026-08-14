import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiUser, FiSave } from "react-icons/fi";

import { updateProfile } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";

export function ProfileInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const gender = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Others"
  ]

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty }
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: ""
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitHandler = async (data) => {
    if (user?.email === "student@mail.com" || user?.email === "instructor@mail.com") {
      toast.error("This is a demo account. You cannot modify the data.")
      return;
    }

    await updateProfile(data, token, dispatch, navigate)
  }

  const inputClasses = "py-3 rounded-lg px-4 bg-richblack-700 outline-none border border-richblack-600 focus:border-yellow-50 transition-all duration-200 text-richblack-50 text-sm";
  const labelClasses = "text-richblack-5 font-medium text-sm";
  const errorClasses = "text-xs text-pink-300 mt-1";

  return (
    <motion.form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full p-6 sm:p-8 bg-linear-to-br from-richblack-800 to-richblack-900 rounded-xl shadow-md border border-richblack-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-richblack-700">
        <FiUser className="text-yellow-50 text-xl" />
        <h3 className="text-lg sm:text-xl font-bold text-richblack-5">Profile Information</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {/* First Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="fName" className={labelClasses}>
            First Name<sup className="text-pink-300">*</sup>
          </label>
          <input
            placeholder={user?.firstName || "Enter first name"}
            id="fName"
            {...register("firstName", { required: "First name is required" })}
            className={`${inputClasses} ${errors.firstName ? "border-pink-300" : ""}`}
          />
          {errors.firstName && (
            <span className={errorClasses}>{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="lName" className={labelClasses}>
            Last Name
          </label>
          <input
            placeholder={user?.lastName || "Enter last name"}
            id="lName"
            {...register("lastName")}
            className={inputClasses}
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-1">
          <label htmlFor="dob" className={labelClasses}>
            Date of Birth<sup className="text-pink-300">*</sup>
          </label>
          <input
            type="date"
            id="dob"
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            className={`${inputClasses} ${errors.dateOfBirth ? "border-pink-300" : ""}`}
          />
          {errors.dateOfBirth && (
            <span className={errorClasses}>{errors.dateOfBirth.message}</span>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label htmlFor="gender" className={labelClasses}>
            Gender<sup className="text-pink-300">*</sup>
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className={`${inputClasses} appearance-none cursor-pointer ${errors.gender ? "border-pink-300" : ""}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFD60A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="" disabled selected>
              Select Gender
            </option>
            {gender.map((value, idx) => (
              <option key={idx} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.gender && <span className={errorClasses}>{errors.gender.message}</span>}
        </div>

        {/* Contact Number */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className={labelClasses}>
            Contact Number<sup className="text-pink-300">*</sup>
          </label>
          <input
            placeholder={user?.additionalDetails?.contactNumber || "Enter contact number"}
            id="phone"
            type="tel"
            {...register("contactNumber", { required: "Contact number is required" })}
            className={`${inputClasses} ${errors.contactNumber ? "border-pink-300" : ""}`}
          />
          {errors.contactNumber && (
            <span className={errorClasses}>{errors.contactNumber.message}</span>
          )}
        </div>

        {/* About */}
        <div className="flex flex-col gap-1">
          <label htmlFor="about" className={labelClasses}>
            About
          </label>
          <input
            placeholder={user?.additionalDetails?.about || "Tell us about yourself"}
            id="about"
            {...register("about")}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <motion.button
          type="button"
          onClick={() => navigate("/dashboard/profile")}
          className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-50 rounded-md border border-richblack-600 transition-all shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>

        <motion.button
          type="submit"
          disabled={!isDirty}
          className={`px-5 py-2 rounded-md flex items-center gap-2 shadow-sm ${!isDirty
              ? "bg-yellow-100/50 text-richblack-500 cursor-not-allowed"
              : "bg-yellow-50 hover:bg-yellow-100 text-richblack-900"
            }`}
          whileHover={isDirty ? { scale: 1.02 } : {}}
          whileTap={isDirty ? { scale: 0.98 } : {}}
        >
          <span>Save</span>
          <FiSave />
        </motion.button>
      </div>
    </motion.form>
  );
}