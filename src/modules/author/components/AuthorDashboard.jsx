"use client"

import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { BarChart3, PlusCircle, Eye, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AuthorDashboard() {
  const stats = [
    { label: "Total Posts", value: "24", icon: BarChart3, trend: "+12%" },
    { label: "Total Views", value: "8,234", icon: Eye, trend: "+23%" },
    { label: "Engagement", value: "3.2%", icon: MessageSquare, trend: "+5%" },
    { label: "Growth", value: "1.2K", icon: TrendingUp, trend: "+18%" },
  ]

  const recentPosts = [
    { id: 1, title: "Getting Started with React Hooks", date: "2024-01-15", views: 1240 },
    { id: 2, title: "Advanced TypeScript Patterns", date: "2024-01-12", views: 892 },
    { id: 3, title: "Web Performance Optimization", date: "2024-01-10", views: 567 },
  ]

  return (
    <ProtectedRoute requiredRole="author">
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your publishing overview.</p>
            </div>
            <Link href="/author/posts/create">
              <Button className="gradient-accent text-white gap-2">
                <PlusCircle size={20} /> New Post
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-6 glass">
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className="text-accent" size={24} />
                  <span className="text-sm text-green-400">{stat.trend}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Analytics Chart */}
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

          {/* Recent Posts */}
          <div className="bg-card border border-border rounded-xl p-8 glass">
            <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex justify-between items-center p-4 bg-background/50 rounded-lg border border-border hover:border-primary/30 transition"
                >
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-muted-foreground">{post.views} views</span>
                    <Link href={`/author/posts/edit/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
