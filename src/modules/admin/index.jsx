import { lazy } from "react";


const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const AdminProfile = lazy(() => import("./components/AdminProfile"));
const ManageUsers = lazy(() => import("./components/ManageUsers"));

export { AdminDashboard, AdminProfile, ManageUsers };