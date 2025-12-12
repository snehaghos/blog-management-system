"use client"

import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function AuthorPosts() {
  const posts = [
    { id: 1, title: "Getting Started with React Hooks", status: "Published", date: "2024-01-15", views: 1240 },
    { id: 2, title: "Advanced TypeScript Patterns", status: "Published", date: "2024-01-12", views: 892 },
    { id: 3, title: "Web Performance Optimization", status: "Draft", date: "2024-01-10", views: 0 },
    { id: 4, title: "CSS Grid Deep Dive", status: "Published", date: "2024-01-08", views: 567 },
  ]

  return (
    <ProtectedRoute requiredRole="author">
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Posts</h1>
              <p className="text-muted-foreground">Manage and create your blog posts</p>
            </div>
            <Link href="/author/posts/create">
              <Button className="gradient-accent text-white gap-2">
                <PlusCircle size={20} /> New Post
              </Button>
            </Link>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden glass">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="bg-background/50">
                  <th className="text-left px-6 py-4 font-semibold">Title</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-left px-6 py-4 font-semibold">Date</th>
                  <th className="text-left px-6 py-4 font-semibold">Views</th>
                  <th className="text-left px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-background/50 transition">
                    <td className="px-6 py-4 font-medium">{post.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.status === "Published"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{post.date}</td>
                    <td className="px-6 py-4">{post.views}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link href={`/author/posts/edit/${post.id}`}>
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <Edit size={16} /> Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive hover:bg-destructive/10 bg-transparent"
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </td>
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
