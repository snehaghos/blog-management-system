"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Users, FileText, Eye, AlertCircle, ArrowRight, Loader } from "lucide-react"
import { Button } from "../../../components/ui/button"
import axiosClient from "../../../lib/axios"
import { toast } from "react-toastify"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    admins: 0,
    authors: 0,
    readers: 0,
  })
  const [recentUsers, setRecentUsers] = useState([])
  const [isInitial, setIsInitial] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async (showToast = false) => {
    try {
      setLoading(true)
      const usersResponse = await axiosClient.get("/api/admin/users")
      const users = usersResponse.data || []

      setStats({
        totalUsers: users.length,
        totalPosts: users.reduce((sum) => sum + 1, 0) * 5, // Placeholder calculation
        admins: users.filter(u => u.role === "admin").length,
        authors: users.filter(u => u.role === "author").length,
        readers: users.filter(u => u.role === "reader").length,
      })

      const recentUsersList = users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(user => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        }))

      setRecentUsers(recentUsersList)
      if (showToast) {
        toast.success("Dashboard updated")
      }
      setIsInitial(false)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      if (!isInitial) {
        toast.error("Failed to load dashboard data")
      }
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400" },
    { label: "Total Posts", value: stats.totalPosts, icon: FileText, color: "text-purple-400" },
    { label: "Total Views", value: "245K", icon: Eye, color: "text-pink-400" },
    { label: "Flagged Content", value: "12", icon: AlertCircle, color: "text-red-400" },
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-96">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage platform users and content</p>
        </div>
        <Button 
          onClick={() => fetchDashboardData(true)}
          variant="outline"
          className="gap-2"
        >
          Refresh Data
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-6 glass">
            <stat.icon className={stat.color} size={24} />
            <p className="text-muted-foreground text-sm mt-4 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Admins</p>
              <p className="text-2xl font-bold text-red-600">{stats.admins}</p>
            </div>
            <Users className="text-red-400" size={32} />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Authors</p>
              <p className="text-2xl font-bold text-blue-600">{stats.authors}</p>
            </div>
            <Users className="text-blue-400" size={32} />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Readers</p>
              <p className="text-2xl font-bold text-green-600">{stats.readers}</p>
            </div>
            <Users className="text-green-400" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-card border border-border rounded-xl overflow-hidden glass">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Users</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/admin-manage-users")}
            className="gap-2"
          >
            View All
            <ArrowRight size={16} />
          </Button>
        </div>
        <table className="w-full">
          <thead className="bg-background/50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Name</th>
              <th className="text-left px-6 py-4 font-semibold">Email</th>
              <th className="text-left px-6 py-4 font-semibold">Role</th>
              <th className="text-left px-6 py-4 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">
                  No users found
                </td>
              </tr>
            ) : (
              recentUsers.map((user) => (
                <tr key={user._id} className="border-b border-border hover:bg-background/50 transition cursor-pointer">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.role === "author" 
                          ? "bg-blue-500/20 text-blue-600" 
                          : user.role === "admin"
                          ? "bg-red-500/20 text-red-600"
                          : "bg-green-500/20 text-green-600"
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
