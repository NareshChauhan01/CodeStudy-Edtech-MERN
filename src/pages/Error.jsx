import React from "react";
import ErrorImg from "../assests/images/404_face.png"

export function Error() {
  return (
    <div className="max-h-screen w-11/12 sm:w-10/12 max-w-4xl m-auto grid grid-flow-row md:grid-flow-col lg:grid-flow-col place-content-center place-items-center gap-5 sm:gap-10">
      <img
        loading="lazy"
        src={ErrorImg}
        alt="Error-Image"
        className="w-45 sm:w-62.5 md:w-75 mb-6 sm:mb-0"
      />
      
      <div className="flex flex-col font-mono tracking-wide font-bold text-center md:text-start lg:text-start">
        <span className="text-lg sm:text-xl md:text-2xl text-pure-greys-50 mb-2">Page Not Found</span>
        <span className="text-sm sm:text-base text-pure-greys-400">Sorry, but we can't find the page you are looking for...</span>
      </div>
    </div>
  )
}