import React, { useEffect, useState } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css"
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi"

export function Upload({
  name,
  label,
  register,
  setValue,
  video = false,
  viewData = null,
  editData = null
}) {
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    register(name)
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
      register(name, { required: true })
    }
  }

  const {
    getInputProps,
    getRootProps,
    isDragActive
  } = useDropzone({
    accept: video ?
      { "video/*": [".mp4", ".mkv"] }
      :
      { "image/*": [".jpg", ".jpeg", ".png"] },
    onDrop
  })

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-richblack-5">{label}<sup className="text-pink-300">*</sup></label>

      <div className="w-full p-3 sm:p-5 bg-richblack-800 border-[0.01rem] border-dashed border-richblack-400 rounded-md cursor-pointer">
        {previewSource ? (
          <div className="w-full flex flex-col gap-4 sm:gap-5">
            {video ? (
              <Player
                playsInline
                src={previewSource}
              />
            ) : (
              <img
                src={previewSource}
                alt="Preview"
                loading="lazy"
                className="aspect-video w-full rounded-md object-cover"
              />
            )}

            <button
              onClick={() => {
                setPreviewSource("")
                setSelectedFile(null)
                setValue(name, null)
              }}
              className="underline text-pure-greys-400 hover:text-pure-greys-200 w-fit self-center sm:self-start"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div {...getRootProps()} className="w-full p-3 sm:p-5 flex flex-col gap-3 sm:gap-5 justify-center items-center">
            <input {...getInputProps()} />

            <div className="w-fit rounded-full p-3 bg-black">
              <FiUploadCloud className="text-xl sm:text-2xl text-yellow-200" />
            </div>

            <div className="max-w-[200px] h-auto sm:h-[35px] text-xs text-center">
              {!isDragActive ? (
                <p>
                  Drag and drop an {video ? "video" : "image"}, or click to
                  <span className="text-yellow-200 font-bold text-sm"> Browse </span>
                  a file
                </p>
              ) : (
                <span className="text-yellow-200 font-bold text-sm">Drop Here</span>
              )}
            </div>

            <ul className="mt-2 sm:mt-5 text-xs list-disc flex flex-col sm:flex-row gap-2 sm:gap-10">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}