import React from "react";
import "../../../App.css"
import { TypeAnimation } from "react-type-animation";

import { Button } from "./Button";
import  HighlightText  from "./HighlightText";

export function CodeSection({ paraValue, headingValue1, headingValue2, highlightValue, layout, buttonValue1, buttonValue2, codeValue, linkTo, arrow, clr1, clr2, codeClr, codeBg }) {
  return (
    <div className={`my-10 md:my-20 flex flex-col ${layout === "true" ? "lg:flex-row" : "lg:flex-row-reverse"} justify-between gap-8 md:gap-12 lg:gap-16`}>
      {/* Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span>{headingValue1}{" "}</span>
          <HighlightText value={highlightValue} />
          <span>{" "}{headingValue2}</span>
        </h2>

        <p className="font-semibold text-base sm:text-lg tracking-wide text-richblack-200 mt-4 md:mt-5 mb-8 md:mb-14">
          {paraValue}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mb-5">
          <Button value={buttonValue1} clr={clr1} arrow={arrow} linkTo={linkTo} />
          <Button value={buttonValue2} clr={clr2} linkTo={linkTo} />
        </div>
      </div>

      {/* Code Section */}
      <div className={`w-full lg:w-[45%] h-fit flex gap-1 border border-richblack-700 rounded-md p-3 sm:p-4 gredient-clr overflow-x-auto`}>
        {/* Line Numbers */}
        <div className="min-w-[10%] shrink-0 flex flex-col leading-6 sm:leading-[1.7rem] font-inter font-bold text-richblack-400 text-center text-sm sm:text-base">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Code Content */}
        <div className={`w-[90%] grow flex flex-col font-bold font-mono text-sm sm:text-base ${codeClr}`}>
          <TypeAnimation
            sequence={[codeValue, 1000, " "]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              overflowX: "auto"
            }}
          />
        </div>
      </div>
    </div>
  )
}