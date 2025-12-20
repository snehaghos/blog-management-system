import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../../../components/ui/dialog";
import { Heart, Eye, MessageSquare, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import axiosClient from "../../../lib/axios";

export default function BlogDetailModal({ isOpen, onClose, blogId }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && blogId) {
      fetchBlogDetail();
    }
  }, [isOpen, blogId]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/api/blogs/${blogId}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : blog ? (
          <>
            <DialogHeader className="border-b pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl mb-2">{blog.title}</DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {blog.author?.name || "Unknown Author"}
                    </span>
                    {blog.createdAt && (
                      <span>
                        · {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="py-6">
              {/* Blog Image */}
              {blog.image && (
                <div className="mb-6 rounded-lg overflow-hidden bg-muted h-80">
                  <img
                    src={`http://localhost:3000/uploads/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Blog Content */}
              <div className="prose prose-invert dark:prose-invert max-w-none mb-8">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {blog.content}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye size={18} className="text-accent" />
                  <span>{blog.views || 0} Views</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart size={18} className="text-red-500" />
                  <span>{blog.likes || 0} Likes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare size={18} className="text-blue-500" />
                  <span>{blog.comments || 0} Comments</span>
                </div>
              </div>

              {/* Author Info */}
              {blog.author && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold mb-3">About the Author</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">{blog.author.name}</p>
                      {blog.author.email && (
                        <p className="text-sm text-muted-foreground">{blog.author.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Blog not found</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
