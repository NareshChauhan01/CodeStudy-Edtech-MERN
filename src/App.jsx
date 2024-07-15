import React from 'react'
import "./App.css"


// React Router
import { Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </div>
  )
}

export default App