import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Moon, Sun, LogOut, Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  
  // Mock auth - replace with your actual auth context
  const isAuthenticated = false
  const user = null
  const logout = () => {}
  
  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl gradient-accent bg-clip-text text-transparent"
          >
            <div className="w-8 h-8 bg-linear-to-r from-primary to-accent rounded-lg"></div>
            BlogHub
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated && user && (
              <>
                {user.role === "author" && (
                  <>
                    <Link to="/author/dashboard" className="text-sm hover:text-accent transition">
                      Dashboard
                    </Link>
                    <Link to="/author/posts" className="text-sm hover:text-accent transition">
                      Posts
                    </Link>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <Link to="/admin/dashboard" className="text-sm hover:text-accent transition">
                      Admin
                    </Link>
                  </>
                )}
                {user.role === "user" && (
                  <>
                    <Link to="/user/home" className="text-sm hover:text-accent transition">
                      Explore
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
                <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="w-8 h-8 rounded-full" />
                <span className="hidden sm:inline text-sm">{user?.name}</span>
                <Button size="sm" variant="outline" onClick={logout} className="gap-2 bg-transparent">
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
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
            {user.role === "author" && (
              <>
                <Link to="/author/dashboard" className="block text-sm py-2 hover:text-accent">
                  Dashboard
                </Link>
                <Link to="/author/posts" className="block text-sm py-2 hover:text-accent">
                  Posts
                </Link>
              </>
            )}
            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="block text-sm py-2 hover:text-accent">
                Admin
              </Link>
            )}
            {user.role === "user" && (
              <Link to="/user/home" className="block text-sm py-2 hover:text-accent">
                Explore
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
