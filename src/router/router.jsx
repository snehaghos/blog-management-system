import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import GuestRouter from './GuestRouter'

const Router = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    setToken(storedToken)
  }, [])

  useEffect(() => {
    const handleAuthSuccess = (event) => {
      const storedToken = localStorage.getItem('accessToken')
      setToken(storedToken)

      const redirectPath = event.detail?.redirectPath || '/admin-dashboard'
      
      setTimeout(() => {
        navigate(redirectPath)
      }, 0)
    }

    window.addEventListener('authSuccess', handleAuthSuccess)
    return () => window.removeEventListener('authSuccess', handleAuthSuccess)
  }, [navigate])

  useEffect(() => {
    const handleLogout = () => {
      setToken(null)
    }

    window.addEventListener('logoutSuccess', handleLogout)
    return () => window.removeEventListener('logoutSuccess', handleLogout)
  }, [])

  return token ? <AuthRouter /> : <GuestRouter />
}

export default Router
