"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, Loader, Upload } from "lucide-react"
import axiosClient from "../../../lib/axios"
import { toast } from "react-toastify"

export default function ReaderProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [profile, setProfile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [image, setImage] = useState(null)

  // Form fields
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const [currentOccupation, setCurrentOccupation] = useState("")
  const [bio, setBio] = useState("")
  const [address, setAddress] = useState("")
  const [preferences, setPreferences] = useState([])

  const userId = JSON.parse(localStorage.getItem("user"))?._id

  useEffect(() => {
    if (userId) {
      fetchProfile()
    }
  }, [userId])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get(`/api/profile/reader/${userId}`)
      setProfile(response.data)
      setGender(response.data.gender || "")
      setDob(response.data.dob ? response.data.dob.split("T")[0] : "")
      setCurrentOccupation(response.data.currentOccupation || "")
      setBio(response.data.bio || "")
      setAddress(response.data.address || "")
      setPreferences(response.data.preferences || [])
      if (response.data.profileImage) {
        setImagePreview(`http://localhost:3000/uploads/${response.data.profileImage}`)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview("")
  }

  const handlePreferenceChange = (pref) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitting(true)

    try {
      const formData = new FormData()
      if (gender) formData.append("gender", gender)
      if (dob) formData.append("dob", dob)
      if (currentOccupation) formData.append("currentOccupation", currentOccupation)
      if (bio) formData.append("bio", bio)
      if (address) formData.append("address", address)
      if (preferences.length > 0) formData.append("preferences", JSON.stringify(preferences))
      if (image) formData.append("profileImage", image)

      const response = await axiosClient.put(`/api/profile/reader/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success("Profile updated successfully!")
      const updatedData = response.data.readerProfile
      setProfile(updatedData)
      
      // Update form fields with new values
      setGender(updatedData.gender || "")
      setDob(updatedData.dob ? updatedData.dob.split("T")[0] : "")
      setCurrentOccupation(updatedData.currentOccupation || "")
      setBio(updatedData.bio || "")
      setAddress(updatedData.address || "")
      setPreferences(updatedData.preferences || [])
      if (updatedData.profileImage) {
        setImagePreview(`http://localhost:3000/uploads/${updatedData.profileImage}`)
      }
      
      setImage(null)
    } catch (error) {
      console.error("Error updating profile:", error)
      const errorMsg = error.response?.data?.message || "Failed to update profile"
      toast.error(errorMsg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/user-home")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold">Reader Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your reader profile information</p>
        </div>

        {/* Profile Display Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Profile Card */}
          <div className="md:col-span-3 lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 text-center sticky top-20">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-32 h-32 mx-auto object-cover rounded-lg mb-4 border border-border"
                />
              ) : (
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {(profile?.userId?.name || "R").charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-bold">{profile?.userId?.name}</h2>
              <p className="text-sm text-muted-foreground">{profile?.userId?.email}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Status</p>
                <p className="inline-block px-3 py-1 bg-green-500/20 text-green-600 text-sm rounded-full font-medium">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Current Details */}
          <div className="md:col-span-3 lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full"></span>
                  Account Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Name</p>
                    <p className="text-sm font-semibold">{profile?.userId?.name}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-semibold">{profile?.userId?.email}</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Role</p>
                    <p className="text-sm font-semibold capitalize">{profile?.userId?.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Reader Details
                </h2>
                <div className="space-y-3">
                  {gender && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Gender</p>
                      <p className="text-sm font-semibold capitalize">{gender}</p>
                    </div>
                  )}
                  {dob && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                      <p className="text-sm font-semibold">{dob}</p>
                    </div>
                  )}
                  {currentOccupation && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Occupation</p>
                      <p className="text-sm font-semibold">{currentOccupation}</p>
                    </div>
                  )}
                  {address && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Address</p>
                      <p className="text-sm font-semibold">{address}</p>
                    </div>
                  )}
                  {bio && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Bio</p>
                      <p className="text-sm">{bio}</p>
                    </div>
                  )}
                  {preferences.length > 0 && (
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">Reading Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {preferences.map((pref) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-7 bg-primary rounded-full"></span>
              Edit Profile
            </h2>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium mb-3">Profile Picture</label>

            {imagePreview && (
              <div className="mb-4 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-lg hover:bg-destructive/90"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-input"
              />
              <label htmlFor="image-input" className="cursor-pointer block">
                <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          </div>

          {/* Reader Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reader Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Current Occupation</label>
              <input
                type="text"
                value={currentOccupation}
                onChange={(e) => setCurrentOccupation(e.target.value)}
                placeholder="e.g., Student, Software Engineer, Writer"
                className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Reading Preferences</label>
              <div className="space-y-2">
                {["Technology", "Science", "Fiction", "News", "Sports", "Entertainment"].map(
                  (pref) => (
                    <label key={pref} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={preferences.includes(pref)}
                        onChange={() => handlePreferenceChange(pref)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">{pref}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-border">
            <Button
              type="submit"
              disabled={submitting}
              className="gradient-accent text-white gap-2"
            >
              {submitting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/user-home")}
              disabled={submitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
