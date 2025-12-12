"use client"

import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Heart, Eye, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function UserHome() {
  const blogs = [
    { id: 1, title: "Getting Started with React Hooks", author: "Jane Doe", views: 1240, likes: 234, comments: 45 },
    { id: 2, title: "Advanced TypeScript Patterns", author: "John Smith", views: 892, likes: 156, comments: 28 },
    { id: 3, title: "Web Performance Optimization", author: "Sarah Johnson", views: 567, likes: 89, comments: 12 },
  ]

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-3">Discover Great Content</h1>
            <p className="text-xl text-muted-foreground">Explore stories from talented creators</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link key={blog.id} href={`/user/blog/${blog.id}`}>
                <div className="bg-card border border-border rounded-xl overflow-hidden glass hover:border-primary/50 transition h-full flex flex-col">
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">By {blog.author}</p>
                    <div className="flex gap-4 mt-auto text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {blog.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} /> {blog.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} /> {blog.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
      </div>
    </ProtectedRoute>
  )
}
