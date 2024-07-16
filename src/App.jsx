import React from 'react'
import "./App.css"


// React Router
import { Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Common/Navbar'
// Pages
import Home from './pages/Home'
import OpenRoute from './components/core/Auth/OpenRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import Error from './pages/Error'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path='signup'
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path='Login'
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path='verify-email'
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path='forgot-password'
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>}
        />
        <Route
          path='*'
          element={
            <Error />
          }
        />

      </Routes>
    </div>
  )
}

export default App