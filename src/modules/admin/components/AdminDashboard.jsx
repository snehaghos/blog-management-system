"use client"

import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Users, FileText, Eye, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,384", icon: Users, color: "text-blue-400" },
    { label: "Total Posts", value: "1,284", icon: FileText, color: "text-purple-400" },
    { label: "Total Views", value: "245K", icon: Eye, color: "text-pink-400" },
    { label: "Flagged Content", value: "12", icon: AlertCircle, color: "text-red-400" },
  ]

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Author", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", joined: "2024-01-14" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User", joined: "2024-01-13" },
  ]

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-12">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-6 glass">
                <stat.icon className={stat.color} size={24} />
                <p className="text-muted-foreground text-sm mt-4 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Users */}
          <div className="bg-card border border-border rounded-xl overflow-hidden glass">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">Recent Users</h2>
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
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-background/50 transition">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "Author" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
