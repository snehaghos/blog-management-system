"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, Loader, Eye, Mail, Calendar, Shield } from "lucide-react"
import axiosClient from "../../../lib/axios"
import { toast } from "react-toastify"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"

export default function ManageUsers() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserProfile, setSelectedUserProfile] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filterRole, setFilterRole] = useState("all")

  useEffect(() => {
    fetchAllUsers()
  }, [])

  const fetchAllUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get("/api/admin/users")
      setUsers(response.data || [])
      toast.success(`Loaded ${response.data?.length || 0} users`)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleViewUser = async (user) => {
    try {
      setSelectedUser(user)
      const response = await axiosClient.get(`/api/admin/users/${user._id}`)
      setSelectedUserProfile(response.data.roleProfile)
      setModalOpen(true)
    } catch (error) {
      console.error("Error fetching user profile:", error)
      toast.error("Failed to load user profile")
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedUser(null)
    setSelectedUserProfile(null)
  }

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-600"
      case "author":
        return "bg-blue-500/20 text-blue-600"
      case "reader":
        return "bg-green-500/20 text-green-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredUsers = filterRole === "all" 
    ? users 
    : users.filter(user => user.role === filterRole)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage all platform users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4 glass">
          <p className="text-muted-foreground text-sm mb-1">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 glass">
          <p className="text-muted-foreground text-sm mb-1">Admins</p>
          <p className="text-2xl font-bold text-red-600">{users.filter(u => u.role === "admin").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 glass">
          <p className="text-muted-foreground text-sm mb-1">Authors</p>
          <p className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === "author").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 glass">
          <p className="text-muted-foreground text-sm mb-1">Readers</p>
          <p className="text-2xl font-bold text-green-600">{users.filter(u => u.role === "reader").length}</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 glass">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Filter by Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Users</option>
              <option value="admin">Admins</option>
              <option value="author">Authors</option>
              <option value="reader">Readers</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            onClick={fetchAllUsers}
            className="w-full sm:w-auto"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden glass">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Name</th>
                <th className="text-left px-6 py-4 font-semibold">Email</th>
                <th className="text-left px-6 py-4 font-semibold">Role</th>
                <th className="text-left px-6 py-4 font-semibold">Joined</th>
                <th className="text-left px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-border hover:bg-background/50 transition">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(user.role)}`}
                      >
                        <div className="flex items-center gap-1">
                          <Shield size={14} />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewUser(user)}
                        className="gap-2 bg-transparent"
                      >
                        <Eye size={16} />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* User Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Account Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                    <p className="font-semibold">{selectedUser.name}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold text-sm">{selectedUser.email}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Role</p>
                    <p className="font-semibold capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Joined</p>
                    <p className="font-semibold">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Role-Specific Profile Info */}
              {selectedUserProfile && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">
                    {selectedUser.role === "admin" ? "Admin" : selectedUser.role === "author" ? "Author" : "Reader"} Profile
                  </h3>
                  <div className="space-y-3">
                    {selectedUser.role === "admin" && selectedUserProfile && (
                      <>
                        {selectedUserProfile.address && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Address</p>
                            <p className="font-semibold">{selectedUserProfile.address}</p>
                          </div>
                        )}
                        {selectedUserProfile.mobile && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Mobile</p>
                            <p className="font-semibold">{selectedUserProfile.mobile}</p>
                          </div>
                        )}
                      </>
                    )}

                    {selectedUser.role === "author" && selectedUserProfile && (
                      <>
                        {selectedUserProfile.username && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Username</p>
                            <p className="font-semibold">{selectedUserProfile.username}</p>
                          </div>
                        )}
                        {selectedUserProfile.gender && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Gender</p>
                            <p className="font-semibold capitalize">{selectedUserProfile.gender}</p>
                          </div>
                        )}
                        {selectedUserProfile.currentOccupation && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Occupation</p>
                            <p className="font-semibold">{selectedUserProfile.currentOccupation}</p>
                          </div>
                        )}
                        {selectedUserProfile.bio && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Bio</p>
                            <p className="text-sm">{selectedUserProfile.bio}</p>
                          </div>
                        )}
                        {selectedUserProfile.address && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Address</p>
                            <p className="font-semibold">{selectedUserProfile.address}</p>
                          </div>
                        )}
                      </>
                    )}

                    {selectedUser.role === "reader" && selectedUserProfile && (
                      <>
                        {selectedUserProfile.gender && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Gender</p>
                            <p className="font-semibold capitalize">{selectedUserProfile.gender}</p>
                          </div>
                        )}
                        {selectedUserProfile.currentOccupation && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Occupation</p>
                            <p className="font-semibold">{selectedUserProfile.currentOccupation}</p>
                          </div>
                        )}
                        {selectedUserProfile.bio && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Bio</p>
                            <p className="text-sm">{selectedUserProfile.bio}</p>
                          </div>
                        )}
                        {selectedUserProfile.address && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-1">Address</p>
                            <p className="font-semibold">{selectedUserProfile.address}</p>
                          </div>
                        )}
                        {selectedUserProfile.preferences && selectedUserProfile.preferences.length > 0 && (
                          <div className="p-3 bg-background rounded-lg border border-border/50">
                            <p className="text-xs text-muted-foreground mb-2">Reading Preferences</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedUserProfile.preferences.map((pref) => (
                                <span
                                  key={pref}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {pref}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {!selectedUserProfile && (
                      <div className="p-3 bg-background rounded-lg border border-border/50 text-center">
                        <p className="text-muted-foreground">No profile details available</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
