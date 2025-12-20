"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Heart, Eye, MessageSquare } from "lucide-react"
import axiosClient from "../../../lib/axios"
import BlogDetailModal from "./BlogDetailModal"


export default function UserHome() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  const fetchAllBlogs = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get("/api/blogs")
      setBlogs(response.data || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBlogClick = (blogId) => {
    setSelectedBlogId(blogId)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedBlogId(null)
  }

  return (

      <div className="min-h-screen bg-background">
    

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">Discover Great Content</h1>
            <p className="text-xl text-muted-foreground">Explore stories from talented creators</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading blogs...</p>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blogs available yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => handleBlogClick(blog._id)}
                  className="bg-card border border-border rounded-xl overflow-hidden glass hover:border-primary/50 transition h-full flex flex-col cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    {blog.image && (
                      <img
                        src={`http://localhost:3000/uploads/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">By {blog.author?.name || "Unknown"}</p>
                    <div className="flex gap-4 mt-auto text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {blog.views || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} /> {blog.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} /> {blog.comments || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured Authors */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Featured Authors</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {["Alice", "Bob", "Charlie", "Diana"].map((author) => (
                <div key={author} className="bg-card border border-border rounded-xl p-6 glass text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold mb-2">{author}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Tech writer & content creator</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Detail Modal */}
        <BlogDetailModal isOpen={modalOpen} onClose={handleCloseModal} blogId={selectedBlogId} />
      </div>
   
  )
}
