"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, Loader } from "lucide-react"
import axiosClient from "../../../lib/axios"
import { toast } from "react-toastify"

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get(`/api/blogs/${id}`)
      setPost(response.data)
      setTitle(response.data.title)
      setContent(response.data.content)
      if (response.data.image) {
        setImagePreview(`http://localhost:3000/uploads/${response.data.image}`)
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      toast.error("Failed to load post")
      navigate("/author-posts")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        return;
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, GIF, and WebP formats are allowed");
        return;
      }

      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      toast.success("Image updated successfully");
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Please enter a post title");
      return;
    }

    if (title.trim().length < 5) {
      toast.error("Post title must be at least 5 characters");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write some content");
      return;
    }

    if (content.trim().length < 20) {
      toast.error("Content must be at least 20 characters");
      return;
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      if (image) {
        formData.append("image", image)
      }

      console.log("Updating post with ID:", id)
      console.log("Form data fields:", { title, content, hasImage: !!image })

      const response = await axiosClient.put(`/api/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Update response:", response.data)
      toast.success("Post updated successfully!")
      navigate("/author-posts")
    } catch (error) {
      console.error("Error updating post:", error)
      console.error("Error response:", error.response?.data)
      console.error("Error status:", error.response?.status)
      const errorMsg = error.response?.data?.message || error.message || "Failed to update post"
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
            onClick={() => navigate("/author-posts")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Posts
          </button>
          <h1 className="text-4xl font-bold">Edit Post</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-3">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length} characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-3">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={12}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {content.length} characters
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-3">Featured Image</label>

            {imagePreview && (
              <div className="mb-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-lg hover:bg-destructive/90 disabled:opacity-50"
                  disabled={submitting}
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
                disabled={submitting}
              />
              <label htmlFor="image-input" className={`cursor-pointer block ${submitting ? "opacity-50 pointer-events-none" : ""}`}>
                <p className="text-muted-foreground mb-2">
                  {image ? "Change image" : "Click to upload image or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WebP up to 10MB</p>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8">
            <Button
              type="submit"
              disabled={submitting}
              className="gradient-accent text-white gap-2"
            >
              {submitting ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/author-posts")}
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
