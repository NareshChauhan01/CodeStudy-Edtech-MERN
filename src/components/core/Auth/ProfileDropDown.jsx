import React, { useRef, useState } from "react";
import * as Icons from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const { user } = useSelector(state => state.profile);
  const [showProfileMenu, setShowProfilemenu] = useState(false);

  // Menu items
  const menu = [
    {
      value: "Dashboard",
      icon: "IoSpeedometer",
      path: "/dashboard/profile"
    },
    {
      value: "Settings",
      icon: "IoSettings",
      path: "dashboard/settings"
    },
    {
      icon: "IoLogOut",
      value: "Log Out"
    }
  ];

  const logOutHandler = () => {
    logout(dispatch, navigate)
  }

  // Handle click outside
  useOnClickOutside(ref, () => setShowProfilemenu(false));

  // Return null if no user
  if (!user) return null;

  return (
    <div className="relative">
      {/* Profile Button */}
      <motion.button
        onClick={() => setShowProfilemenu(!showProfileMenu)}
        className="flex items-center gap-2 py-1.5 px-2 rounded-full transition-all duration-200 hover:bg-richblack-700"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="relative">
          {/* Profile image with ring effect */}
          <motion.div
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-transparent ring-2 ring-yellow-50/30"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={`profile-${user?.firstName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-richblack-700 flex items-center justify-center text-yellow-50 font-semibold text-sm">
                {user?.firstName?.[0]?.toUpperCase()}
              </div>
            )}

            {/* Online indicator */}
            <motion.div
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-caribbeangreen-300 border-2 border-richblack-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{ rotate: showProfileMenu ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icons.IoChevronDown className="text-yellow-50 text-lg" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showProfileMenu && (
          <motion.div
            ref={ref}
            className="absolute right-0 top-[120%] z-50 min-w-55 rounded-xl overflow-hidden border border-richblack-700 backdrop-blur-lg bg-richblack-800/10 shadow-lg"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* User info section */}
            <div className="flex items-center gap-3 p-4 border-b border-richblack-700">
              <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                {user?.image ? (
                  <img
                    loading="lazy"
                    src={user.image}
                    alt={`profile-${user?.firstName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-yellow-50 font-semibold">
                    {user?.firstName?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="overflow-hidden">
                <h4 className="text-yellow-50 font-medium text-sm truncate">
                  {user?.firstName} {user?.lastName}
                </h4>
                <p className="text-richblack-200 text-xs truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2">
              {menu.map((item, index) => {
                const Icon = Icons[item.icon];

                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    onClick={
                      item.value === "Log Out" ? logOutHandler : () => setShowProfilemenu(false)
                    }
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200
                                            ${item.value === "Log Out"
                        ? "text-pink-200 hover:bg-pink-800 hover:text-pink-100"
                        : isActive
                          ? "bg-richblack-600 text-yellow-50 font-medium"
                          : "text-richblack-100 hover:bg-richblack-700 hover:text-yellow-50"
                      }`
                    }
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`${item.value === "Log Out" ? "text-pink-300" : ""}`}
                    >
                      <Icon className="text-lg" />
                    </motion.div>
                    <span>{item.value}</span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropDown;