import { useState, useEffect } from "react"
import { Loader, Heart, MessageCircle, Share2 } from "lucide-react"
import axiosClient from "../../../lib/axios"
import { toast } from "react-toastify"

export default function UserBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axiosClient.get("/api/blogs")
      setBlogs(response.data || [])
    } catch (error) {
      console.error("Error fetching blogs:", error)
      toast.error("Failed to load blogs")
    } finally {
      setLoading(false)
    }
  }

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.author?.name && blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-96">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Community Blog Posts</h1>
          <p className="text-muted-foreground mb-6">
            Discover amazing articles from our community of authors
          </p>

          {/* Search */}
          <input
            type="text"
            placeholder="Search blogs by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {blogs.length === 0 ? "No blogs yet" : "No blogs match your search"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 group"
                >
                  {/* Image */}
                  {blog.image && (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img
                        src={`http://localhost:3000/uploads/${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Author */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {blog.author?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          {blog.author?.name || "Unknown Author"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Title & Content Preview */}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-foreground">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {blog.content}
                    </p>

                    {/* Interactions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex gap-4 text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary transition">
                          <Heart size={16} />
                          <span className="text-xs">0</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition">
                          <MessageCircle size={16} />
                          <span className="text-xs">0</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition">
                          <Share2 size={16} />
                        </button>
                      </div>
                      <button className="text-primary hover:text-primary/80 font-medium text-sm transition">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {filteredBlogs.length > 0 && (
            <p className="text-center text-muted-foreground mt-8">
              Showing {filteredBlogs.length} of {blogs.length} blog{blogs.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
