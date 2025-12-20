"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { BarChart3, PlusCircle, Eye, Loader } from "lucide-react"
import { useBlogContext } from "../context/useBlogContext"

export default function AuthorDashboard() {
  const { authorBlogs, loading } = useBlogContext()
  const [recentPosts, setRecentPosts] = useState([])
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user?.name) {
      setUserName(user.name)
    }
  }, [])

  useEffect(() => {
    if (authorBlogs && authorBlogs.length > 0) {
      const sortedPosts = [...authorBlogs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
      setRecentPosts(sortedPosts)
    }
  }, [authorBlogs])

  const stats = [
    { label: "Total Posts", value: authorBlogs?.length || 0, icon: BarChart3 },
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
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {userName}! Here's your publishing overview.
              </p>
            </div>
            <Link to="/create-post">
              <Button className="gradient-accent text-white gap-2">
                <PlusCircle size={20} /> New Post
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-6 glass">
                <stat.icon className="text-accent mb-4" size={24} />
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-8 glass mb-12">
            <h2 className="text-xl font-bold mb-6">Monthly Views</h2>
            <div className="h-64 bg-gradient-to-b from-primary/10 to-accent/5 rounded-lg flex items-end justify-around px-6 py-8">
              {[24, 18, 35, 28, 42, 38, 45, 50, 48, 55, 52, 58].map((value, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="bg-gradient-to-t from-primary to-accent rounded"
                    style={{ width: "2rem", height: `${(value / 60) * 200}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground">
                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 glass">
            <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
            {recentPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't published any posts yet</p>
                <Link to="/create-post">
                  <Button className="gradient-accent text-white gap-2">
                    <PlusCircle size={20} /> Create Your First Post
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div
                    key={post._id}
                    className="flex justify-between items-center p-4 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold line-clamp-1">{post.title}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Eye size={16} />
                        {post.views || 0}
                      </span>
                      <Link to="/author-posts">
                        <Button variant="outline" size="sm">
                          View Posts
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  )
}
