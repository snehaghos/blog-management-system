
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../lib/axios";

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      
      console.log("User session found");
    }
  }, []);

  const handleLogin = async (e, role) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/api/auth/login", { email, password, role });
      const data = response.data;

      // Store tokens
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      // Role-based redirection
      const userRole = data.user?.role || data.role;
      localStorage.setItem("userRole", userRole);
      
      // Store user object (for filtering author blogs, etc.)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      toast.success("Login successful!");
      
      // Determine redirect path based on user role
      let redirectPath = "/user-home";
      if (userRole === "admin") {
        redirectPath = "/admin-dashboard";
      } else if (userRole === "author") {
        redirectPath = "/author-dashboard";
      }
      
      // Dispatch auth success event to trigger Router component update
      const event = new CustomEvent('authSuccess', { detail: { redirectPath } });
      window.dispatchEvent(event);
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e, role) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/api/auth/register", {
        name: fullName,
        email,
        password,
        role,
      });
      // Success
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await axiosClient.post("/api/auth/logout", { token: refreshToken });
      }
    } catch (error) {
     
    }

    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    // Clear form
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");

    // Dispatch logout event to notify Router
    window.dispatchEvent(new Event('logoutSuccess'));

    toast.success("Logged out successfully");
    navigate("/login");
  };

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    confirmPassword,
    setConfirmPassword,
    handleLogin,
    handleRegister,
    handleLogout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
  
