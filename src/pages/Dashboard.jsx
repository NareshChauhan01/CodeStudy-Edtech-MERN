import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Sidebar } from "../components/core/dashboard/Sidebar";

export function Dashboard() {
  const navigate = useNavigate()

  const { token, loading: authLoading } = useSelector(state => state.auth)
  const { loading: profileLoading } = useSelector(state => state.profile)

  useEffect(() => {
    // only accessible if user is logged in
    if (!token) {
      navigate("/")
    }
  }, [token])

  if (profileLoading || authLoading) {
    return (
      <div className="mt-20">
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.65rem)]">
      <Sidebar />

      <div className="w-full min-h-[calc(100vh-3.65rem)]">
        <Outlet />
      </div>
    </div>
  )
}