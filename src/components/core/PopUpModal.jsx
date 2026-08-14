import React from "react";

export function PopUpModal({ modalData }) {

  return (
    <div className="fixed inset-0 grid place-items-center z-50 overflow-auto backdrop-blur-md bg-white/10">
      <div className="max-w-95 flex flex-col justify-start gap-4 p-5 bg-richblack-800 border-[0.01rem] border-richblack-500 rounded-xl tracking-normal">
        <p className="text-2xl font-bold">{modalData?.text1}</p>
        <span className=" text-pure-greys-100">{modalData?.text2}</span>

        <div className="w-fit flex gap-5 font-bold">
          <button
            // type="submit"
            className="w-fit px-4 py-2 bg-yellow-200 rounded-md text-black"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1text}
          </button>

          <button
            // type="submit"
            className="w-fit px-4 py-2 bg-richblack-300 rounded-md text-black"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2text}
          </button>
        </div>
      </div>
    </div>
  )
}