"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Loader } from "lucide-react"
import { useBlogContext } from "../context/useBlogContext"
import { toast } from "react-toastify"

export default function CreatePost() {
  const navigate = useNavigate()
  const {
    title,
    setTitle,
    content,
    setContent,
    image,
    imagePreview,
    loading,
    handleImageChange,
    removeImage,
    createBlog
  } = useBlogContext()

  const handleImageChangeWithValidation = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, GIF, and WebP formats are allowed");
        return;
      }

      handleImageChange(e);
      toast.success("Image uploaded successfully");
    }
  }

  const handleSubmit = (e) => {
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

    createBlog(e);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <label className="block text-sm font-medium mb-2">Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {title.length} characters
          </p>
        </div>

        {/* Image Upload */}
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <label className="block text-sm font-medium mb-2">Featured Image</label>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              onChange={handleImageChangeWithValidation}
              accept="image/*"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-xl p-6 glass">
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            rows={12}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            required
            disabled={loading}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {content.length} characters
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={loading} 
            className="gradient-accent text-white gap-2 flex items-center"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Post"
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/author-posts")}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

