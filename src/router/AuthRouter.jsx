import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '../modules/Dashboard'
import { AdminDashboard } from '../modules/admin'
import { UserHome } from '../modules/user'
import { AuthorDashboard, AuthorPosts, CreatePost } from '../modules/author'


const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path='admin-dashboard' element={<AdminDashboard/>} />
      <Route path='user-home' element={<UserHome/>}   />
      <Route path='author-dashboard' element={<AuthorDashboard/>}   />
      <Route path='author-posts' element={<AuthorPosts/>}   />
      <Route path='create-post' element={<CreatePost/>}   />
    </Routes>
  )
}

export default AuthRouter
