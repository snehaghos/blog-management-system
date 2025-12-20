import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import { toast } from "react-toastify";
import axiosClient from "../../../lib/axios";

const BlogContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch all blogs
  const fetchAllBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/blogs");
      setBlogs(response.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch author's blogs
  const fetchAuthorBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/api/blogs");
      
      // Get current user ID from localStorage
      const userString = localStorage.getItem("user");
      const currentUser = userString ? JSON.parse(userString) : null;
      const currentUserId = currentUser?._id || currentUser?.id;
      
      console.log("=== FETCH AUTHOR BLOGS ===");
      console.log("User String from localStorage:", userString);
      console.log("Current User Object:", currentUser);
      console.log("Current User ID:", currentUserId);
      console.log("Total blogs from backend:", response.data?.length || 0);
      
      // Filter blogs by current author
      const filtered = response.data?.filter((post) => {
        const postAuthorId = post.author?._id || post.author?.id;
        const match = postAuthorId === currentUserId;
        if (!match && currentUserId) {
          console.log(`Post: "${post.title}" - Author ID: ${postAuthorId}, Current User ID: ${currentUserId}, Match: ${match}`);
        }
        return match;
      }) || [];
      
      console.log("Filtered blogs count:", filtered.length);
      console.log("Filtered blogs:", filtered);
      
      setAuthorBlogs(filtered);
    } catch (error) {
      console.error("Error fetching author blogs:", error);
      toast.error("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize author blogs on mount
  useEffect(() => {
    fetchAuthorBlogs();
  }, [fetchAuthorBlogs]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Create blog post
  const createBlog = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      console.log("Creating blog with data:", { title, content, hasImage: !!image });

      const response = await axiosClient.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Blog created successfully:", response.data);

      toast.success("Post published successfully!");

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);

      // Add the newly created blog to the list immediately
      if (response.data) {
        setAuthorBlogs(prev => [response.data, ...prev]);
      }

      // Small delay before navigation
      await new Promise(resolve => setTimeout(resolve, 300));

      // Navigate to posts
      navigate("/author-posts");
    } catch (error) {
      console.error("Error creating blog:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to publish post";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Delete blog post
  const deleteBlog = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setLoading(true);
      await axiosClient.delete(`/api/blogs/${postId}`);
      toast.success("Post deleted successfully");
      setAuthorBlogs(authorBlogs.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // State
    blogs,
    authorBlogs,
    loading,
    title,
    setTitle,
    content,
    setContent,
    image,
    imagePreview,

    // Methods
    fetchAllBlogs,
    fetchAuthorBlogs,
    handleImageChange,
    removeImage,
    createBlog,
    deleteBlog
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export default BlogContextProvider;
