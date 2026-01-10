import React from 'react'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import ProtectedRoute from './components/protectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/Login' element={
          <Login />} />

        <Route path='/' element={
          <ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/player/:id' element={
          <ProtectedRoute><Player /></ProtectedRoute>} />
      </Routes>

    </div>
  )
}

export default App
