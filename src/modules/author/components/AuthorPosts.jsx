"use client"

import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { PlusCircle, Edit, Trash2, Loader, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { useBlogContext } from "../context/useBlogContext"
import { toast } from "react-toastify"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"

export default function AuthorPosts() {
  const navigate = useNavigate()
  const { authorBlogs, loading, fetchAuthorBlogs, deleteBlog } = useBlogContext()
  const [selectedPost, setSelectedPost] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    fetchAuthorBlogs()
  }, [fetchAuthorBlogs])

  const handleViewPost = (post) => {
    setSelectedPost(post)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPost(null)
  }

  const handleEditPost = (postId) => {
    toast.info("Redirecting to edit post...");
    navigate(`/edit-post/${postId}`)
  }

  const handleDeletePost = async (postId, postTitle) => {
    toast.warning(`Deleting post: "${postTitle}"`, {
      autoClose: false
    })
    
    setDeleteLoading(true)
    try {
      await deleteBlog(postId)
    } finally {
      setDeleteLoading(false)
    }
  }

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Posts</h1>
          <p className="text-muted-foreground">
            {authorBlogs.length} post{authorBlogs.length !== 1 ? "s" : ""} published
          </p>
        </div>
        <Link to="/create-post">
          <Button className="gradient-accent text-white gap-2">
            <PlusCircle size={20} /> New Post
          </Button>
        </Link>
      </div>

      {authorBlogs.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center glass">
          <p className="text-muted-foreground mb-4">You haven't published any posts yet</p>
          <Link to="/create-post">
            <Button className="gradient-accent text-white gap-2">
              <PlusCircle size={20} /> Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {authorBlogs.map((post) => (
            <div
              key={post._id}
              className="bg-card border border-border rounded-xl p-6 glass hover:border-primary/50 transition cursor-pointer"
              onClick={() => handleViewPost(post)}
            >
              <div className="flex gap-4 items-start">
                {post.image && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={`http://localhost:3000/uploads/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 bg-transparent hover:bg-primary/10"
                        onClick={() => handleEditPost(post._id)}
                      >
                        <Edit size={16} /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive hover:bg-destructive/10 bg-transparent"
                        onClick={() => handleDeletePost(post._id, post.title)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost ? (
            <>
              <DialogHeader className="border-b pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedPost.title}</DialogTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatDate(selectedPost.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-6">
                {/* Blog Image */}
                {selectedPost.image && (
                  <div className="mb-6 rounded-lg overflow-hidden bg-muted h-80">
                    <img
                      src={`http://localhost:3000/uploads/${selectedPost.image}`}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="prose prose-invert dark:prose-invert max-w-none mb-8">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {selectedPost.content}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button
                    className="gap-2 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      handleCloseModal()
                      handleEditPost(selectedPost._id)
                    }}
                  >
                    <Edit size={18} /> Edit Post
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive hover:bg-destructive/10 bg-transparent"
                    onClick={() => {
                      handleCloseModal()
                      handleDeletePost(selectedPost._id)
                    }}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                    Delete Post
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
