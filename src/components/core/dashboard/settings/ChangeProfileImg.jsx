import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FiCamera } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";

import { updateProfilePicture } from "../../../../services/operations/settingsAPI";
import toast from "react-hot-toast";

export function ChangeProfileImg() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const uploadHandle = async () => {
    if (!imageFile) return;

    if (user?.email === "student@mail.com" || user?.email === "instructor@mail.com") {
      toast.error("This is a demo account. You cannot modify the data.")
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("profilePicture", imageFile);

    await updateProfilePicture(data, token, dispatch, navigate)
    setLoading(false)
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full p-6 sm:p-8 bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-xl shadow-md border border-richblack-700">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative">
          <motion.div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-50 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <img
              src={previewSource || user?.image}
              alt="profile"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleClick}
            >
              <FiCamera className="text-white text-xl" />
            </div>
          </motion.div>

          {previewSource && !loading && (
            <motion.div
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-50 rounded-full flex items-center justify-center border border-richblack-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <span className="text-xs font-bold text-richblack-900">✓</span>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col gap-4 items-center sm:items-start">
          <h3 className="text-lg sm:text-xl font-bold text-richblack-5">Change Profile Picture</h3>

          <div className="flex gap-3">
            <motion.button
              onClick={handleClick}
              className="px-4 py-2 bg-richblack-700 hover:bg-richblack-600 text-richblack-50 rounded-md border border-richblack-600 transition-all shadow-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/heic, image/gif, image/jpeg"
              />
              Select
            </motion.button>

            <motion.button
              onClick={uploadHandle}
              disabled={!imageFile || loading}
              className={`px-4 py-2 rounded-md flex items-center gap-2 shadow-sm transition-all ${!imageFile || loading
                  ? "bg-yellow-100/50 text-richblack-50 cursor-not-allowed"
                  : "bg-yellow-50 hover:bg-yellow-100 text-richblack-100"
                }`}
              whileHover={imageFile && !loading ? { y: -2 } : {}}
              whileTap={imageFile && !loading ? { y: 0 } : {}}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-richblack-900 border-t-transparent animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span>Upload</span>
                  <IoMdCloudUpload className="text-lg" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}