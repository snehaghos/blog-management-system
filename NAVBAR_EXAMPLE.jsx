// Example: Update Navbar to use Auth Context

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "@/modules/Auth/context/features/useAuthContext";
import { LogOut, User, Menu, X } from "lucide-react";

export function NavbarExample() {
  const { handleLogout, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Get user data from localStorage
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogoutClick = async () => {
    await handleLogout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-accent">
            MINDLOUGE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/posts" className="text-muted-foreground hover:text-foreground">
              Posts
            </Link>
            {isLoggedIn && user.role === "author" && (
              <Link to="/author/dashboard" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            )}
            {isLoggedIn && user.role === "admin" && (
              <Link to="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            )}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogoutClick}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-accent text-white rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t border-border pt-4">
            <Link to="/" className="block text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/posts" className="block text-muted-foreground hover:text-foreground">
              Posts
            </Link>
            {isLoggedIn && user.role === "author" && (
              <Link to="/author/dashboard" className="block text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            )}
            {isLoggedIn && user.role === "admin" && (
              <Link to="/admin/dashboard" className="block text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <div className="py-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">Logged in as: {user.name}</p>
                </div>
                <button
                  onClick={handleLogoutClick}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-border">
                <Link
                  to="/login"
                  className="flex-1 px-4 py-2 text-center text-primary hover:underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 px-4 py-2 text-center bg-gradient-accent text-white rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarExample;
