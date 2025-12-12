
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
      // Optionally verify token is still valid
      console.log("User session found");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/api/auth/login", { email, password });
      const data = response.data;

      // Store tokens
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refresh_token) {
        localStorage.setItem("refreshToken", data.refresh_token);
      }

      // Store user data
      // if (data.user) {
      //   localStorage.setItem("user", JSON.stringify(data.user));
      // }

      toast.success("Login successful!");
      navigate("/"); // Redirect to home or dashboard
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
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
      // Optionally show error
    }

    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Clear form
    setEmail("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");

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
  
