import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, NavLink, useLocation, useNavigate } from "react-router-dom";

import * as Icons from "react-icons/hi2";
import { VscGear, VscSignOut } from "react-icons/vsc";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector((state) => state.profile);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  if (profileLoading || authLoading) {
    return (
      <div className="mt-20 hidden lg:block">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-50 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 rounded-full bg-yellow-50 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    );
  }

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Link item animation variants
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // handle logout
  const handlerLogOut = async () => {
    await logout(dispatch, navigate)
  }

  return (
    <motion.div
      className="hidden lg:block w-65 min-h-screen bg-linear-to-b from-richblack-800 to-richblack-900 pt-5 border-r border-richblack-700 shadow-xl"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <aside className="mx-auto flex flex-col gap-2">
        {sidebarLinks.map((ele, index) => {
          if (ele.type && user?.accountType !== ele.type) return null;
          const Icon = Icons[ele.icon];
          const isActive = matchRoute(ele.path);

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <NavLink
                to={ele.path}
                className={`
                                    flex items-center relative py-3 px-6 rounded-r-lg
                                    ${isActive ?
                    "text-yellow-50 bg-linear-to-r from-yellow-700 to-yellow-700/40 border-l-4 border-yellow-50" :
                    "text-richblack-100 border-l-4 border-transparent hover:text-yellow-50 hover:bg-richblack-700"
                  }
                                    transition-all duration-300 group
                                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    whileHover={{ rotate: isActive ? 0 : 15 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xl ${isActive ? "text-yellow-50" : "text-richblack-300"}`}
                  >
                    <Icon />
                  </motion.div>
                  <span className="font-medium whitespace-nowrap">{ele.name}</span>
                </div>

                {isActive && (
                  <motion.div
                    className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-50 rounded-l-md"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}

        <motion.div
          className="h-px w-[85%] mx-auto my-5 bg-linear-to-r from-transparent via-richblack-600 to-transparent"
          variants={itemVariants}
        />

        <motion.div
          variants={itemVariants}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <NavLink
            to="/dashboard/settings"
            className={`
                            flex items-center relative py-3 px-6 rounded-r-lg
                            ${matchRoute("/dashboard/settings") ?
                "text-yellow-50 bg-linear-to-r from-yellow-700 to-yellow-700/40 border-l-4 border-yellow-50" :
                "text-richblack-100 border-l-4 border-transparent hover:text-yellow-50 hover:bg-richblack-700"
              }
                            transition-all duration-300 group
                        `}
          >
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                whileHover={{ rotate: matchRoute("/dashboard/settings") ? 0 : 15 }}
                transition={{ duration: 0.3 }}
                className={`text-xl ${matchRoute("/dashboard/settings") ? "text-yellow-50" : "text-richblack-300"}`}
              >
                <VscGear />
              </motion.div>
              <span className="font-medium whitespace-nowrap">Settings</span>
            </div>

            {matchRoute("/dashboard/settings") && (
              <motion.div
                className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-50 rounded-l-md"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </NavLink>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="mt-1"
        >
          <button
            onClick={handlerLogOut}
            className="w-full flex items-center gap-3 py-3 px-6 text-richblack-100 hover:text-pink-200 hover:bg-pink-800/20 transition-all duration-300 rounded-r-lg"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
              className="text-xl text-richblack-300 group-hover:text-pink-300"
            >
              <VscSignOut />
            </motion.div>
            <span className="font-medium whitespace-nowrap">Log Out</span>
          </button>
        </motion.div>
      </aside>
    </motion.div>
  );
}