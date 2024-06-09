import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Common/Navbar'

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-poppins">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App