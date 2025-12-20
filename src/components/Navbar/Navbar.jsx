import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Moon, Sun, LogOut, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import axiosClient from "../../lib/axios"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to "dark"
    return localStorage.getItem("theme") || "dark"
  })
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()
  
  // Get auth state from localStorage
  const token = localStorage.getItem("accessToken")
  const userRole = localStorage.getItem("userRole")
  const userString = localStorage.getItem("user")
  const user = userString ? JSON.parse(userString) : null
  const isAuthenticated = !!token
  
  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    // Persist theme to localStorage
    localStorage.setItem("theme", theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const refreshToken = localStorage.getItem("refreshToken")

    try {
      if (refreshToken) {
        await axiosClient.post("/api/auth/logout", { token: refreshToken })
      }
      
      // Clear localStorage
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")

      // Show success toast
      toast.success("Logged out successfully!", {
        autoClose: 2000,
      })

      // Dispatch logout event to update Router
      window.dispatchEvent(new Event('logoutSuccess'))

      // Small delay before redirect
      setTimeout(() => {
        navigate("/login")
      }, 500)
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout failed, but clearing local session", {
        autoClose: 2000,
      })
      
      // Still clear localStorage and redirect even if API fails
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")
      
      window.dispatchEvent(new Event('logoutSuccess'))
      
      setTimeout(() => {
        navigate("/login")
      }, 500)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl gradient-accent bg-clip-text text-transparent"
          >
           <img src="/images/logo.png"  width="350" alt="MINDLOUGE Logo" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!isAuthenticated && (
              <>
                <Link to="/blogs" className="text-sm hover:text-accent transition">
                  Blogs
                </Link>
                <Link to="/about" className="text-sm hover:text-accent transition">
                  About
                </Link>
                <Link to="/team" className="text-sm hover:text-accent transition">
                  Team
                </Link>
              </>
            )}
            
            {isAuthenticated && user && (
              <>
                {userRole === "author" && (
                  <>
                    <Link to="/author-dashboard" className="text-sm hover:text-accent transition">
                      Dashboard
                    </Link>
                    <Link to="/author-posts" className="text-sm hover:text-accent transition">
                      Posts
                    </Link>
                    <Link to="/create-post" className="text-sm hover:text-accent transition">
                      Create Post
                    </Link>
                  </>
                )}
                {userRole === "admin" && (
                  <>
                    <Link to="/admin-dashboard" className="text-sm hover:text-accent transition">
                      Dashboard
                    </Link>
                  </>
                )}
                {userRole === "user" && (
                  <>
                    <Link to="/user-home" className="text-sm hover:text-accent transition">
                      Home
                    </Link>
                    <Link to="/user-blogs" className="text-sm hover:text-accent transition">
                      Blogs
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-card rounded-lg transition">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    if (userRole === 'admin') {
                      navigate('/admin-profile')
                    } else if (userRole === 'author') {
                      navigate('/author-profile')
                    } else if (userRole === 'reader') {
                      navigate('/reader-profile')
                    }
                  }}
                  className="w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500"
                >
                  {user?.profileImage ? (
                    <img 
                      src={user?.profileImage} 
                      alt={user?.name || "Profile"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {(user?.name || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>
                <span className="hidden sm:inline text-sm">{user?.name}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleLogout} 
                  className="gap-2 bg-transparent"
                  disabled={isLoggingOut}
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="gradient-accent text-white">
                  Sign In
                </Button>
              </Link>
            )}

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && isAuthenticated && user && (
          <div className="md:hidden pb-4 space-y-2">
            {userRole === "author" && (
              <>
                <Link to="/author-dashboard" className="block text-sm py-2 hover:text-accent">
                  Dashboard
                </Link>
                <Link to="/author-posts" className="block text-sm py-2 hover:text-accent">
                  Posts
                </Link>
                <Link to="/create-post" className="block text-sm py-2 hover:text-accent">
                  Create Post
                </Link>
              </>
            )}
            {userRole === "admin" && (
              <Link to="/admin-dashboard" className="block text-sm py-2 hover:text-accent">
                Dashboard
              </Link>
            )}
            {userRole === "user" && (
              <Link to="/user-home" className="block text-sm py-2 hover:text-accent">
                Home
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="block w-full text-left text-sm py-2 hover:text-accent text-red-400 disabled:opacity-50"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
