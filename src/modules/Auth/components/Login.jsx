import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import useAuthContext from "../context/features/useAuthContext";
import { toast } from "react-toastify";

function Login() {

  const { email, setEmail, password, setPassword, handleLogin, isLoading } = useAuthContext();
  const [role, setRole] = useState("reader");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.warning("Please enter both email and password");
      return;
    }
    
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    await handleLogin(e, role);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-8 glass">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account</p>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sign in as</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              >
                <option value="reader">Reader / Public User</option>
                <option value="author">Author</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-accent text-white font-semibold py-2 rounded-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
