import React from "react";
import { RenderSteps } from "./RederSteps";
import { CourseTips } from "./CourseTips";

export default function AddCourse() {
  return (
    <div className="w-11/12 max-w-250 mx-auto  py-20 flex flex-col-reverse lg:flex-row gap-10 font-mono tracking-wide text-richblack-50">
      <div className="flex flex-col gap-6 lg:gap-10 justify-between w-full lg:w-[70%]">
        <h2 className="font-bold text-3xl text-yellow-100">Add Course</h2>
        <RenderSteps />
      </div>

      {/* Course Tips - Hidden on very small screens, sticky on larger screens */}
      <div className="w-full lg:w-[30%] lg:sticky lg:top-10 lg:self-start">
        <CourseTips />
      </div>
    </div>
  )
}