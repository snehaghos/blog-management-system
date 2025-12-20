import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GuestLayout from "../layouts/GuestLayout/GuestLayout";
import { Home } from "../modules/Home";
import Teams from "../modules/Home/Teams";
import About from "../modules/Home/About";
import AllBlogs from "../modules/Home/AllBlogs";
import { Login, Register } from "../modules/Auth";
import AuthContextProvider from "../modules/Auth/context/AuthContextProvider";
import GanttChart from "../components/Gnatt/gnatt";

const queryClient = new QueryClient();

const GuestRouter = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/about" element={<About />} />
          <Route path="/gnatt" element={<GanttChart />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthContextProvider>
              <Login />
            </AuthContextProvider>
          }
        />
        <Route
          path="/register"
          element={
            <AuthContextProvider>
              <Register />
            </AuthContextProvider>
          }
        />
        {/* Catch-all: redirect to home if guest tries to access unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default GuestRouter;
