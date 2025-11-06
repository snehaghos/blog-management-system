import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '../modules/Dashboard'


const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AuthRouter
