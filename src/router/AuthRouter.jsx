import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from '../components/Navbar/Navbar'
import { Dashboard } from '../modules/Dashboard'
import { AdminDashboard, AdminProfile, ManageUsers } from '../modules/admin'
import { UserHome, ReaderProfile } from '../modules/user'
import UserBlogs from '../modules/user/components/UserBlogs'
import { AuthorDashboard, AuthorPosts, CreatePost, EditPost, AuthorProfile } from '../modules/author'
import BlogContextProvider from '../modules/author/context/BlogContextProvider'

const queryClient = new QueryClient()

// Role-based Route Guard
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole')
  
  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(userRole)) {
    // Redirect based on user role
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" replace />
    } else if (userRole === 'author') {
      return <Navigate to="/author-dashboard" replace />
    } else {
      return <Navigate to="/user-home" replace />
    }
  }

  return element
}

const AuthRouter = () => {
  const token = localStorage.getItem('accessToken')
  const userRole = localStorage.getItem('userRole')

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute
                element={<AdminProfile />}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path="/admin-manage-users"
            element={
              <ProtectedRoute
                element={<ManageUsers />}
                allowedRoles={['admin']}
              />
            }
          />

          {/* Author Routes */}
          <Route
            path="/author-dashboard"
            element={
              <ProtectedRoute
                element={<AuthorDashboard />}
                allowedRoles={['author']}
              />
            }
          />
          <Route
            path="/author-posts"
            element={
              <ProtectedRoute
                element={
                  <BlogContextProvider>
                    <AuthorPosts />
                  </BlogContextProvider>
                }
                allowedRoles={['author']}
              />
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute
                element={
                  <BlogContextProvider>
                    <CreatePost />
                  </BlogContextProvider>
                }
                allowedRoles={['author', 'admin']}
              />
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute
                element={
                  <BlogContextProvider>
                    <EditPost />
                  </BlogContextProvider>
                }
                allowedRoles={['author', 'admin']}
              />
            }
          />
          <Route
            path="/author-profile"
            element={
              <ProtectedRoute
                element={<AuthorProfile />}
                allowedRoles={['author']}
              />
            }
          />

          {/* User Routes */}
          <Route
            path="/user-home"
            element={
              <ProtectedRoute
                element={<UserHome />}
                allowedRoles={['reader']}
              />
            }
          />
          <Route
            path="/user-blogs"
            element={
              <ProtectedRoute
                element={<UserBlogs />}
                allowedRoles={['reader']}
              />
            }
          />
          <Route
            path="/reader-profile"
            element={
              <ProtectedRoute
                element={<ReaderProfile />}
                allowedRoles={['reader']}
              />
            }
          />

          {/* Fallback based on role */}
          <Route
            path="*"
            element={
              userRole === 'admin' ? (
                <Navigate to="/admin-dashboard" replace />
              ) : userRole === 'author' ? (
                <Navigate to="/author-dashboard" replace />
              ) : userRole === 'reader' ? (
                <Navigate to="/user-home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  )
}

export default AuthRouter
